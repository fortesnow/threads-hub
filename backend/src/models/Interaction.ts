import mongoose, { Document, Schema } from 'mongoose';

export interface IInteraction extends Document {
  user: mongoose.Types.ObjectId;
  post?: mongoose.Types.ObjectId;
  threadsPostId?: string;
  type: 'reply' | 'mention' | 'like' | 'repost';
  content?: string;
  author: {
    id: string;
    username: string;
    profileUrl?: string;
  };
  response?: string;
  status: 'pending' | 'responded' | 'ignored';
  threadsId: string;
  createdAt: Date;
  updatedAt: Date;
  respondedAt?: Date;
}

const InteractionSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    threadsPostId: {
      type: String,
    },
    type: {
      type: String,
      enum: ['reply', 'mention', 'like', 'repost'],
      required: true,
    },
    content: {
      type: String,
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
      profileUrl: {
        type: String,
      },
    },
    response: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'responded', 'ignored'],
      default: 'pending',
    },
    threadsId: {
      type: String,
      required: true,
    },
    respondedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IInteraction>('Interaction', InteractionSchema); 