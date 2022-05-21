import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';

const db_url = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30,
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
    url: db_url
    // TODO add data seeding here
  },
  lists: createSchema({
    // TODO schema items
  }),
  ui: {
    // TODO change for roles
    isAccessAllowed: () => true
  }
  // TODO add session values here
});
