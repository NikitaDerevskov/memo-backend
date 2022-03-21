import express from 'express';

const handleRegistration = (req: express.Request, res: express.Response): void => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json('Incorrect form submission');
  }
};

export default handleRegistration;