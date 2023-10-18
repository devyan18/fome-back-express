import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  nickName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'project'
  }]
}, {
  timestamps: true
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});

export const UserModel = model('user', userSchema);
