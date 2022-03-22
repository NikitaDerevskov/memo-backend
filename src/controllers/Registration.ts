import bcrypt from 'bcryptjs';
import { Knex } from 'knex';
import express from 'express';

const handleRegistration = async (req: express.Request, res: express.Response, db: Knex<any, unknown[]>) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json('Incorrect form submission');
  }

  const userWithThisEmail = await db('users')
    .where('email', email)
    .catch(() => {
      res.send('Error in get user with this email');
      return [];
    });

  const userExist = userWithThisEmail[0];

  if (userExist) {
    return res.status(400).json('User with current email already exist');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  await db('users').insert({
    email, name, entries: 0, joined: new Date().toISOString(),
  });

  // // name, email, entries, joined) values ('a', 'a@a.com', 5, '2018-01-01');
  // const b = await db('users')
  //   .where('email', email);
  // res.send(b);

  // return res.send(hash);
  // const test2 = await db('users').where('email', email);
  // console.log('hey', test, test2);

  /*
  * TODO create hash +
  * TODO Check if this user exist (send message User with this email already exist.) +
  *  If no - create in database +
  * TODO insert hash to database
  * TODO change database (save hash of password in user)
  * */
};

export default handleRegistration;
