import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import 'dotenv/config';
import { createAuth } from '@keystone-next/auth';

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
      url: db_url
      // TODO add data seeding here
    },
    lists: createSchema({
      User
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
