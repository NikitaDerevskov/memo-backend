import express from 'express';
import { Knex } from 'knex';
import bcrypt from 'bcryptjs';
import { createClient } from 'redis';

type RedisClientType = ReturnType<typeof createClient>;

const signIn = async (
  req: express.Request,
  res: express.Response,
  db: Knex<any, unknown[]>,
  redisClient: RedisClientType,
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('Incorrect form submission');
  }

  const user = await db('users')
    .where('email', email);

  if (!user.length) {
    return res.status(400).json('Incorrect email or password');
  }

  const isPasswordCorrect: boolean = bcrypt.compareSync(password, user[0].password);
  if (!isPasswordCorrect) {
    return res.status(400).json('Incorrect email or password');
  }

  await redisClient.set(user[0].password, email);

  return res.send(user);
};

export default signIn;
