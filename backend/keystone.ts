import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import { createAuth } from '@keystone-next/auth';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';

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
    url: databaseURL
    // TODO: add data seeding here
  },

  lists: createSchema({
    // Schema Items go here
    User
  }),
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
