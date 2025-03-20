import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  threadsAccessToken?: string;
  threadsRefreshToken?: string;
  threadsTokenExpiry?: Date;
  threadsUserId?: string;
  threadsUsername?: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, '名前は必須です'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'メールアドレスは必須です'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        '有効なメールアドレスを入力してください',
      ],
    },
    password: {
      type: String,
      required: [true, 'パスワードは必須です'],
      minlength: [6, 'パスワードは最低6文字必要です'],
    },
    profilePicture: {
      type: String,
      default: '',
    },
    threadsAccessToken: {
      type: String,
    },
    threadsRefreshToken: {
      type: String,
    },
    threadsTokenExpiry: {
      type: Date,
    },
    threadsUserId: {
      type: String,
    },
    threadsUsername: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// パスワードを返さないようにする
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default mongoose.model<IUser>('User', UserSchema); 