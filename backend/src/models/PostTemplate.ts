import mongoose, { Document, Schema } from 'mongoose';

export interface IPostTemplate extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  content: string;
  hashtags: string[];
  mediaLayout?: 'single' | 'carousel' | 'none';
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PostTemplateSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'テンプレート名は必須です'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'テンプレート内容は必須です'],
    },
    hashtags: [{
      type: String,
      trim: true,
    }],
    mediaLayout: {
      type: String,
      enum: ['single', 'carousel', 'none'],
      default: 'none',
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPostTemplate>('PostTemplate', PostTemplateSchema); 