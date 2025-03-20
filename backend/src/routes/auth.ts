import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// ユーザー登録
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // 既存ユーザーの確認
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'このメールアドレスは既に登録されています' });
    }

    // パスワードのハッシュ化
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 新規ユーザーの作成
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // JWT トークンの生成
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || 'default_jwt_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'ユーザーが正常に登録されました',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('登録エラー:', error);
    res.status(500).json({ message: '登録処理中にエラーが発生しました' });
  }
});

// ログイン
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // ユーザー検索
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'メールアドレスまたはパスワードが正しくありません' });
    }

    // パスワード検証
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'メールアドレスまたはパスワードが正しくありません' });
    }

    // JWT トークンの生成
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'default_jwt_secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'ログインに成功しました',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('ログインエラー:', error);
    res.status(500).json({ message: 'ログイン処理中にエラーが発生しました' });
  }
});

// 現在のユーザー情報を取得
router.get('/me', authenticateToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }
    res.json(user);
  } catch (error) {
    console.error('ユーザー取得エラー:', error);
    res.status(500).json({ message: 'ユーザー情報の取得中にエラーが発生しました' });
  }
});

export default router; 