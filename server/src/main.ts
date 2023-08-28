import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';

import User from './models/users.model';

dotenv.config();

const app = express();
const origin = process.env.ORIGIN;
app.use(cors({ origin, credentials: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // form태그 내용 받으려면
app.use(cookieParser());
app.use(morgan('dev'));

// mongodb 연결
mongoose
  .connect(
    `mongodb+srv://jaehafe:${process.env.MONGODB_PASSWORD}@oauth.b8fiqds.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log('mongodb connected!'))
  .catch((err) => {
    console.error(err);
  });

app.get('/', (req, res) => {
  res.send('server is running!');
});

app.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  console.log('123');

  const user = new User(req.body);
  console.log('req.body>>>', req.body);

  try {
    await user.save();
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
  }
});

app.listen(`${process.env.PORT}`, async () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
