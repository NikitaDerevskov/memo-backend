import express from 'express';
import * as registration from "./controllers/Registration"

const app = express();
const port = 3000;


app.get('/', (req, res) => {
    console.log('test')
    res.send('Hell1o');
});

app.post('/api/register', (req, res) => {
    return registration.handleRegistartion(req, res);
})

app.post('/api/login', (req, res) => {
    console.log('/login');
    return ;
})

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
