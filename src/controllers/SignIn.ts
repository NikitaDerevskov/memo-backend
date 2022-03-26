import express from 'express';
import { Knex } from 'knex';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signIn = async (
  req: express.Request,
  res: express.Response,
  db: Knex<any, unknown[]>,
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
};

export default signIn;
