import bcrypt from 'bcryptjs';
import { Knex } from 'knex';
import express from 'express';
import jwt from 'jsonwebtoken';
import type { User } from '../types/User';
import { RedisClientType } from '../types/UtilsTypes';

// TODO think - is it good login after registration?
const handleRegistration = async (
  req: express.Request,
  res: express.Response,
  db: Knex<any, unknown[]>,
  redisClient: RedisClientType,
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

  const user: Array<User> = await db('users')
    .where('email', email)
    .catch(handleErrorInSearchUser);

  if (user) {
    const maxAge = 3 * 60 * 60;
    const secret = String(process.env.JWT_SECRET);
    const id = user[0]?.id;
    const token = jwt.sign(
      { id, username: user[0]?.name },
      secret,
      {
        expiresIn: maxAge, // 3hrs in sec
      },
    );

    await redisClient.set(token, id);
    return res.send(token);
  }
  return res.status(500).json('Error in insert data in db');
};

export default handleRegistration;
