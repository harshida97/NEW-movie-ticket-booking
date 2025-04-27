import app from '../app.js';
import serverless from 'serverless-http';
import { connect } from '../config/db.js';

await connect(); // ensure database is connected first

export const handler = serverless(app);
