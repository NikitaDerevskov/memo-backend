import express from 'express';
import bcrypt from 'bcryptjs';

const handleRegistration = async (req: express.Request, res: express.Response, db) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('Incorrect form submission');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log(db)
  return res.send(hash);

  /*
  * TODO create hash +
  * TODO Check if this user exist (send message User with this email already exist.)
  *  If no - create in database
  * TODO insert hash to database
  * */
};

export default handleRegistration;
