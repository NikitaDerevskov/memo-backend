import express from 'express';
import handleRegistration from './controllers/Registration';

const app = express();
const port = 3000;

app.get('/', (req: express.Request, res: express.Response) => {
  console.log('test');
  res.send('Hell1o');
});

app.post('/api/register', (req:express.Request, res: express.Response) => handleRegistration(req, res));

app.post('/api/login', (req: express.Request, res:express.Response) => {
  console.log('/login', req, res);
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
