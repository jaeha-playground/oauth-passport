import passport from 'passport';
import passportLocal from 'passport-local';
import { Error } from 'mongoose';

import User from '../models/users.model';

const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err: Error, user: any) => {
      if (err) return done(err);
      // 찾는 유저가 db에 없으면 끝내고
      if (!user) return done(null, false, { message: `Email ${email} not found` });

      // 찾는 유저가 db에 있으면 db의 비밀번호와 compare
      user.comparePassword(password, (err: Error, isMatch: boolean) => {
        if (err) return done(err);
        if (isMatch) return done(null, user);

        return done(null, false, { message: 'Invalid email or password' });
      });
    });
  })
);
