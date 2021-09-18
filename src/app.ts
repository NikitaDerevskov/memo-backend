import express from 'express';
import jwt from 'jsonwebtoken';

// import crypto from 'crypto'
// console.log(crypto.randomBytes(64).toString('hex'))

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/posts', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    jwt.verify(token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({message: 'Hello, all is fine', authData})
        }
    })
})

app.post('/login', (req, res) => {
    const user = {
        id: 1,
        name: "Nikita",
        email: "test@gmail.com"
    }
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({token})
    })
})

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
