import mongoose, { Error } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
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

userSchema.methods.comparePassword = function (
  plainPassword: string,
  cb: (err: Error | null, isMatch: boolean) => void
) {
  if (plainPassword === this.password) {
    cb(null, true);
  } else {
    cb(null, false);
  }
  // return cb(null, false);
  // bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
  //   if (err) return cb(err, false);
  //   cb(null, isMatch);
  // });
};

const User = mongoose.model('User', userSchema);

export default User;
