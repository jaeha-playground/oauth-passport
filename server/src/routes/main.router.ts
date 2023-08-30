import express, { NextFunction, Request, Response } from 'express';

import authMiddleware from '../middleware/auth';

const mainRouter = express.Router();

mainRouter.get('/', authMiddleware.checkAuthenticated, (req: Request, res: Response, next: NextFunction) => {
  res.send('server is running');
});

mainRouter.get('/login', authMiddleware.checkNotAuthenticated, (req: Request, res: Response, next: NextFunction) => {
  res.send('login');
});

mainRouter.get('/signup', authMiddleware.checkNotAuthenticated, (req: Request, res: Response, next: NextFunction) => {
  res.send('signup');
});

export default mainRouter;
