import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';

const databaseURL = process.env.DATABASE_URL;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // secconds
  secret: process.env.COOKIE_SECRET
};

export default config({
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
  }),
  ui: {
    // TODO change this for roles
    isAccessAllowed: () => true
  }

  // TODO add session values here
});
