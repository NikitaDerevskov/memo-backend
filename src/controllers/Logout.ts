import express from 'express';
import { redisClient } from '../redis';

const logout = async (
  req: express.Request,
  res: express.Response,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send('Unauthorized');
  }

  await redisClient.del(authorization);
  return res.send('Logout success');
};

export default logout;
