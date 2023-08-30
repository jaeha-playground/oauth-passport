import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';

import authMiddleware from '../middleware/auth';

import User from '../models/users.model';

import sendMail from '../mail/mail';

const usersRouter = express.Router();

// 로그인
usersRouter.post('/login', authMiddleware.checkNotAuthenticated, (req: Request, res: Response, next: NextFunction) => {
  // 콜백부분 -> passport.ts
  passport.authenticate('local', (err: any, user: any, info: IVerifyOptions) => {
    if (err) return next(err);

    if (!user) {
      console.log('no user found');
      return res.json({ message: info });
    }

    // 여기서 세션 생성
    // req.user = user
    req.logIn(user, (err) => {
      if (err) return next(err);
      console.log('123');

      res.redirect('http://localhost:3000');
    });
  })(req, res, next);
});

// 로그아웃
usersRouter.post('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logOut((err) => {
    if (err) return next(err);

    return res.status(200).json({ message: 'logout success' });
  });
});

// 회원가입
usersRouter.post(
  '/signup',
  authMiddleware.checkNotAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('123');

    const user = new User(req.body);
    console.log('req.body>>>', req.body);

    try {
      await user.save();
      // 가입 축하 이메일
      sendMail();
      res.redirect('http://localhost:3000/login');
    } catch (err) {
      console.error(err);
    }
  }
);

// 구글 로그인
usersRouter.get('/google', passport.authenticate('google'));
usersRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successReturnToOrRedirect: 'http://localhost:3000',
    failureRedirect: 'http://localhost:3000/login',
  })
);

export default usersRouter;
