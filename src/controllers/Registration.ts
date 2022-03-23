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
      res.status(500).json('Error in get user with this email');
      return [];
    });

  const userExist = userWithThisEmail[0];

  if (userExist) {
    return res.status(400).json('User with current email already exist');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  await db('users').insert({
    email, name, password: hash, joined: new Date().toISOString(),
  }).catch(() => res.status(500).json('Error in insert data in db'));

  const user = await db('users')
    .where('email', email);

  res.send(user);

  /*
  * TODO create hash +
  * TODO Check if this user exist (send message User with this email already exist.) +
  *  If no - create in database +
  * TODO insert hash to database +
  * TODO change database (save hash of password in user) +
  * TODO add to redis
  * */
};

export default handleRegistration;
