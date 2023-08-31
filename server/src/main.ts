import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import mongoose, { Error } from 'mongoose';
import cors from 'cors';
import passport from 'passport';

import cookieSession from 'cookie-session';
import config from 'config';

const serverConfig = config.get<any>('server');

import mainRouter from './routes/main.router';
import usersRouter from './routes/users.router';

dotenv.config();

const app = express();
const origin = process.env.ORIGIN;
app.use(cors({ origin, credentials: true, optionsSuccessStatus: 200 }));
app.use('/static', express.static(path.join(__dirname, 'public')));

// session cookie에 저장
app.use(
  cookieSession({
    name: 'OAuth',
    maxAge: 1209600000,
    keys: [`${process.env.COOKIE_ENCRYPTION_KEY}`],
  })
);

// req.session.regenerate is not a function using passport 0.6.0
app.use((request, response, next) => {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb: any) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb: any) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // form태그 내용 받으려면
app.use(cookieParser());
app.use(morgan('dev'));

// mongodb 연결
mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => console.log('mongodb connected!'))
  .catch((err: Error) => {
    console.error(err);
  });

// mainRouter
app.use('/', mainRouter);
// usersRouter
app.use('/auth', usersRouter);

app.listen(serverConfig.port, async () => {
  console.log(`Server is running on ${serverConfig.port}`);
});
