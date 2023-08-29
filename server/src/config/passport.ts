import passport from 'passport';
import passportLocal from 'passport-local';
import { Error } from 'mongoose';

import User from '../models/users.model';

const LocalStrategy = passportLocal.Strategy;

// req.login(user)
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// client -> session -> request
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    console.error(err);
  }
});

passport.use(
  'local',
  new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    try {
      const user = (await User.findOne({ email: email.toLowerCase() })) as any;

      if (!user) return done(null, false, { message: `Email ${email} not found` });

      // 찾는 유저가 db에 있으면 db의 비밀번호와 compare
      user.comparePassword(password, (err: Error, isMatch: boolean) => {
        if (err) return done(err);
        if (isMatch) return done(null, user);

        return done(null, false, { message: 'Invalid email or password' });
      });
    } catch (err) {
      console.error(err);
    }
  })
);
