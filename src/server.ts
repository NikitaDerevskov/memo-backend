import express from 'express';
import knex from 'knex';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import redisClient from './redis';
import handleRegistration from './controllers/Registration';
import signIn from './controllers/SignIn';
import requireAuth from './controllers/Auth';
import * as folders from './controllers/Folders';

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000', // TODO add more before release
}));

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI,
  searchPath: ['knex', 'public'],
});

app.post('/api/register', (req:express.Request, res: express.Response) => handleRegistration(req, res, db, redisClient));
app.post('/api/login', (req: express.Request, res:express.Response) => signIn(req, res, db, redisClient));
app.get('/test', requireAuth, (req, res) => {
  res.send('You are good');
});

/* Folders */

app.post(
  '/api/create-folder',
  requireAuth,
  (req: express.Request, res: express.Response) => folders.createFolder(req, res),
);

/* */

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
