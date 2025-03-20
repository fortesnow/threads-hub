import mongoose, { Document, Schema } from 'mongoose';

export interface IKeyword extends Document {
  user: mongoose.Types.ObjectId;
  term: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IKeywordMatch extends Document {
  keyword: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  threadsPostId: string;
  author: {
    id: string;
    username: string;
  };
  content: string;
  matchedAt: Date;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const KeywordSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    term: {
      type: String,
      required: [true, 'キーワードは必須です'],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const KeywordMatchSchema: Schema = new Schema(
  {
    keyword: {
      type: Schema.Types.ObjectId,
      ref: 'Keyword',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    threadsPostId: {
      type: String,
      required: true,
    },
    author: {
      id: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
    },
    content: {
      type: String,
      required: true,
    },
    matchedAt: {
      type: Date,
      default: Date.now,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Keyword = mongoose.model<IKeyword>('Keyword', KeywordSchema);
export const KeywordMatch = mongoose.model<IKeywordMatch>('KeywordMatch', KeywordMatchSchema); 