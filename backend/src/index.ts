import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// ルートのインポート
import authRoutes from './routes/auth';
import postRoutes from './routes/posts';
import analyticsRoutes from './routes/analytics';
import interactionRoutes from './routes/interactions';

// 環境変数の読み込み
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ミドルウェアの設定
app.use(cors());
app.use(express.json());

// データベース接続
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/threadshub');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// APIルートの設定
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/interactions', interactionRoutes);

// サーバーの起動
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// データベース接続の実行
connectDB(); 