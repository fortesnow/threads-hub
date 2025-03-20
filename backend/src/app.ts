import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import postRoutes from './routes/posts';
import interactionRoutes from './routes/interactions';
import keywordRoutes from './routes/keywords';

// 環境変数の読み込み
dotenv.config();

// Express アプリの初期化
const app = express();
const PORT = process.env.PORT || 3001;

// ミドルウェアの設定
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB接続
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/threads-hub')
  .then(() => {
    console.log('MongoDB に接続しました');
  })
  .catch(err => {
    console.error('MongoDB 接続エラー:', err);
  });

// ルートの設定
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/keywords', keywordRoutes);

// 基本ルート
app.get('/', (req: Request, res: Response) => {
  res.send('ThreadsHub API サーバーが動作中です');
});

// エラーハンドリングミドルウェア
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'サーバーエラーが発生しました',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました`);
});

export default app; 