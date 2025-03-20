import mongoose, { Document, Schema } from 'mongoose';

export interface IMedia {
  type: 'image' | 'video' | 'carousel';
  url: string;
  thumbnailUrl?: string;
}

export interface IEngagement {
  likes: number;
  replies: number;
  reposts: number;
}

export interface IPost extends Document {
  user: mongoose.Types.ObjectId;
  threadsPostId?: string;
  content: string;
  media?: IMedia[];
  scheduledFor?: Date;
  publishedAt?: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  engagement: IEngagement;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema({
  type: {
    type: String,
    enum: ['image', 'video', 'carousel'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
  },
});

const EngagementSchema = new Schema({
  likes: {
    type: Number,
    default: 0,
  },
  replies: {
    type: Number,
    default: 0,
  },
  reposts: {
    type: Number,
    default: 0,
  },
});

const PostSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    threadsPostId: {
      type: String,
    },
    content: {
      type: String,
      required: [true, '投稿内容は必須です'],
      maxlength: [500, '投稿内容は500文字以内で入力してください'],
    },
    media: [MediaSchema],
    scheduledFor: {
      type: Date,
    },
    publishedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['draft', 'scheduled', 'published', 'failed'],
      default: 'draft',
    },
    engagement: {
      type: EngagementSchema,
      default: { likes: 0, replies: 0, reposts: 0 },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPost>('Post', PostSchema); 