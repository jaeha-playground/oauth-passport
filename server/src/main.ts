import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import mongoose, { Error } from 'mongoose';
import cors from 'cors';
import passport from 'passport';

import User from './models/users.model';
import { IVerifyOptions } from 'passport-local';

dotenv.config();

const app = express();
const origin = process.env.ORIGIN;
app.use(cors({ origin, credentials: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

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

// 회원가입
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

// 로그인
app.post('/login', (req: Request, res: Response, next: NextFunction) => {
  // 콜백부분 -> passport.ts
  passport.authenticate('local', (err: Error, user: any, info: IVerifyOptions) => {
    if (err) return next(err);

    if (!user) {
      console.log('no user found');
      return res.json({ message: info });
    }

    // 여기서 세션 생성
    // req.user = user
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect('/');
    });
  })(req, res, next);
});

app.listen(`${process.env.PORT}`, async () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
