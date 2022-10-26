import express from 'express';
import jwt from 'jsonwebtoken';

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

export default requireAuth;
