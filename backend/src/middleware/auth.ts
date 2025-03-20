import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Request型拡張の定義
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '認証トークンがありません' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_jwt_secret') as { userId: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'トークンが無効です' });
  }
};

// 管理者権限チェック（将来的な拡張のため）
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: '認証が必要です' });
  }

  try {
    // ここではユーザーモデルから管理者権限をチェックする処理を追加予定
    // 現在はスケルトン実装のみ
    next();
  } catch (error) {
    return res.status(403).json({ message: '権限がありません' });
  }
}; 