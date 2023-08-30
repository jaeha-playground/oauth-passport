import { NextFunction, Request, Response } from 'express';

/** 로그인 안되어 있으면 로그인페이지로 */
const checkAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) return next();

  res.redirect('/login');
};

/** 로그인 되어 있으면 홈 페이지로 */
const checkNotAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) return res.redirect('/');

  next();
};

const authMiddleware = {
  checkAuthenticated,
  checkNotAuthenticated,
};

export default authMiddleware;
