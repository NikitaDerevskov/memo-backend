import express from 'express';

const handleRegistration = (req: express.Request, res: express.Response): void => {
  res.send('Registration test');
};

export default handleRegistration;
