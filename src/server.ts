import express from 'express';
import knex from 'knex';
import morgan from 'morgan';
import helmet from 'helmet';
import redisClient from './redis';
import handleRegistration from './controllers/Registration';
import signIn from './controllers/SignIn';
import requireAuth from './controllers/Auth';
import logout from './controllers/Logout';

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('common'));
app.use(helmet());

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI,
  searchPath: ['knex', 'public'],
});

app.post('/api/register', (req:express.Request, res: express.Response) => handleRegistration(req, res, db, redisClient));
app.post('/api/login', (req: express.Request, res:express.Response) => signIn(req, res, db, redisClient));
app.get('/api/logout', (req: express.Request, res:express.Response) => logout(req, res));
app.get('/test', requireAuth, (req, res) => {
  res.send('You are good');
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
