import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import 'dotenv/config';
import { createAuth } from '@keystone-next/auth';
import { insertSeedData } from './seed-data';

const db_url = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30,
  secret: process.env.COOKIE_SECRET
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password']
    //TODO: add initial roles
  }
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true
      }
    },
    db: {
      adapter: 'mongoose',
      url: db_url,
      onConnect: async (keystone) => {
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      }
    },
    lists: createSchema({
      User,
      Product,
      ProductImage
    }),
    ui: {
      isAccessAllowed: ({ session }) => {
        // console.log('isAccessAllowed', session);

        return session?.data;
      }
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id name email'
    })
  })
);
