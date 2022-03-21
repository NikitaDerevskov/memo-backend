import express from 'express';
import handleRegistration from './controllers/Registration';
import knex from 'knex';

const app = express();
const port = 3000;

app.use(express.json());

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI,
  searchPath: ['knex', 'public'],
});

app.get('/', (req: express.Request, res: express.Response) => {
  console.log('test');
  res.send('Hell1o');
});

app.post('/api/register', (req:express.Request, res: express.Response) => handleRegistration(req, res, db));

app.post('/api/login', (req: express.Request, res:express.Response) => {
  console.log('/login', req, res);
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
