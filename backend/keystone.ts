import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { CartItem } from './schemas/CartItem';
import { Order } from './schemas/Order';
import { OrderItem } from './schemas/OrderItem';
import { ProductImage } from './schemas/ProductImage';
import { createAuth } from '@keystone-next/auth';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';
import { extendGraphqlSchema } from './mutations';

const databaseURL = process.env.DATABASE_URL;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // secconds
  secret: process.env.COOKIE_SECRET
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password']
    // TODO: add initial roles
  },
  passwordResetLink: {
    async sendToken({ identity, token }) {
      await sendPasswordResetEmail(token, identity);
    }
  }
});

const keystoneConfig = config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true
    }
  },

  db: {
    adapter: 'mongoose',
    url: databaseURL,
    async onConnect(keystone) {
      if (process.argv.includes('--seed-data')) {
        await insertSeedData(keystone);
      }
    }
  },

  lists: createSchema({
    // Schema Items go here
    User,
    Product,
    ProductImage,
    CartItem,
    OrderItem,
    Order
  }),
  extendGraphqlSchema: extendGraphqlSchema,
  ui: {
    // Only show for users that pass test
    isAccessAllowed: ({ session }) => {
      // console.log(session);
      return !!session?.data;
    }
  },

  session: withItemData(statelessSessions(sessionConfig), {
    // GraphQL Query
    User: `id name`
  })
});

export default withAuth(keystoneConfig);
