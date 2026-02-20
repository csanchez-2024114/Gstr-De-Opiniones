import { initServer } from './configs/app.js';
import { dbConnection } from './configs/db.configuration.js';

dbConnection();
initServer();