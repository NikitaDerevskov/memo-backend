import bcrypt from 'bcryptjs';
import { Knex } from 'knex';
import express from 'express';
import jwt from 'jsonwebtoken';
import type { User } from '../types/User';

const handleRegistration = async (
  req: express.Request,
  res: express.Response,
  db: Knex<any, unknown[]>,
): Promise<express.Response> => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json('Incorrect form submission');
  }

  const handleErrorInSearchUser = () => {
    res.status(500).json('Error in get user with this email');
    return [];
  };

  const userWithThisEmail: Array<User | undefined> = await db('users')
    .where('email', email)
    .catch(handleErrorInSearchUser);

  const userExist: User | undefined = userWithThisEmail[0];

  if (userExist) {
    return res.status(400).json('User with current email already exist');
  }

  const salt: string = await bcrypt.genSalt(10);
  const hash: string = await bcrypt.hash(password, salt);

  await db('users').insert({
    email, name, password: hash, joined: new Date().toISOString(),
  }).catch(() => res.status(500).json('Error in insert data in db'));

  const user: Array<User | undefined> = await db('users')
    .where('email', email)
    .catch(handleErrorInSearchUser);

  if (user) {
    const maxAge = 3 * 60 * 60;
    const secret = String(process.env.JWT_SECRET);
    const token = jwt.sign(
      { id: user[0]?.id, username: user[0]?.name },
      secret,
      {
        expiresIn: maxAge, // 3hrs in sec
      },
    );
    return res.send(token);
  }
  return res.send('Error in get user from db');
};

export default handleRegistration;
