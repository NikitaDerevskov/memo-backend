import express from 'express';
import redisClient from '../redis';

const requireAuth = async (
  req: express.Request,
  res: express.Response,
  next: any,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send('Unauthorized');
  }

  const authToken = await redisClient.get(authorization);
  if (authToken) {
    return next();
  }
  return res.status(401).send('Unauthorized');
};

export default requireAuth;
