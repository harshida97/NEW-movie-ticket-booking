import app from '../app.js';
import serverless from 'serverless-http';
import { connect } from '../config/db.js';

let isDbConnected = false;

const handler = async (req, res) => {
  if (!isDbConnected) {
    await connect();
    isDbConnected = true;
  }
  return serverless(app)(req, res);
};

export { handler };
