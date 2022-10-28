import express from 'express';
import jwt from 'jsonwebtoken';
import { Knex } from 'knex';
import { RedisClientType } from '../types/UtilsTypes';
import {User} from "../types/User";

const requireAuth = async (
  req: express.Request,
  res: express.Response,
  next: any,
) => {
  const authorization = req?.headers?.authorization;

  if (!authorization) {
    return res.status(401).send('Unauthorized');
  }

  const secret = String(process.env.JWT_SECRET);

  try {
    const jwtFreshAndCorrect = jwt.verify(authorization, secret);
    if (jwtFreshAndCorrect) {
      return next();
    }
    return res.status(401).send('Unauthorized');
  } catch {
    return res.status(401).send('Unauthorized');
  }
};

export const getCurrentUser = async (
  req: express.Request,
  res: express.Response,
  db: Knex<any, unknown[]>,
  redisClient: RedisClientType,
) => {
  const authorization = req?.headers?.authorization;
  if (authorization) {
    const id = await redisClient.get(authorization);
    const user: Array<User> | any = await db('users')
      .where('id', id)
      .catch(() => res.status(500).json('Error in insert data in db'));

    if (user) {
      return res.send({ token: authorization, name: user[0]?.name });
    }
  }

  return res.status(500).json('No user with this token');
};

export default requireAuth;
