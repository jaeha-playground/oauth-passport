import mongoose, { Document, Error } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: {
    type: string;
    unique: boolean;
  };
  password: {
    type: string;
    minLength: number;
  };
  googleId: {
    type: string;
    unique: boolean;
    sparse: boolean;
  };

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<any>({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
});

// userSchema.methods.comparePassword = function (plainPassword: string, cb) {
//   bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

const saltRounds = 10;
userSchema.pre('save', function (next) {
  let user = this;
  console.log('user>>>', user);

  // 비밀번호 변경될 때만
  if (user.isModified('password')) {
    // salt된 비밀번호 생성
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hashedPassword) {
        if (err) return next(err);
        user.password = hashedPassword;
        next();
      });
    });
  }
});

userSchema.methods.comparePassword = function (
  plainPassword: string,
  cb: (err: Error | null, isMatch: boolean) => void
) {
  // bcrypt compare
  // plain -> client password
  // this.password -> db password

  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return cb(err, false);
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

export default User;
