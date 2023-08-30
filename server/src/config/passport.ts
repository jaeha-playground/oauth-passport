import passport from 'passport';
import passportLocal from 'passport-local';
import passportGoogle from 'passport-google-oauth20';

import { Error } from 'mongoose';

import User from '../models/users.model';

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

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

// local 전략
const localStrategyConfig = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
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
  }
);
passport.use('local', localStrategyConfig);

// google 전략
const googleClientID = `${process.env.googleClientID}`;
const googleClientSecret = `${process.env.googleClientSecret}`;
const googleCallbackURL = `${process.env.googleCallbackURL}`;
const googleStrategyConfig = new GoogleStrategy(
  {
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: googleCallbackURL,
    scope: ['email', 'profile'],
  },

  async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    console.log('profile>>>', profile);

    try {
      const user = await User.findOne({ googleId: profile.id });

      if (user) {
        return done(null, user);
      } else {
        const user = new User();
        user.email = profile.emails[0].value;
        user.googleId = profile.id;
        user.save().then((err) => done(err, user));

        // try {
        //   user.save();
        // } catch (error) {
        //   done(error, user);
        // }
      }
    } catch (error) {
      return done(error);
    }
  }
);

passport.use('google', googleStrategyConfig);
