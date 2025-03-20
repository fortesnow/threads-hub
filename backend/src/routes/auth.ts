import express from 'express';
import { body } from 'express-validator';
// import authController from '../controllers/auth';
// import authMiddleware from '../middleware/auth';

const router = express.Router();

// 実際のコントローラー実装が完了するまでダミールート
router.post('/login', 
  [
    body('email').isEmail().withMessage('有効なメールアドレスを入力してください'),
    body('password').isLength({ min: 6 }).withMessage('パスワードは最低6文字必要です')
  ],
  (req, res) => {
    res.status(200).json({ 
      token: 'dummy_token', 
      user: { id: '1', name: 'テストユーザー', email: req.body.email }
    });
  }
);

router.post('/register', 
  [
    body('name').notEmpty().withMessage('名前は必須です'),
    body('email').isEmail().withMessage('有効なメールアドレスを入力してください'),
    body('password').isLength({ min: 6 }).withMessage('パスワードは最低6文字必要です')
  ],
  (req, res) => {
    res.status(201).json({ 
      message: 'ユーザー登録に成功しました',
      user: { id: '1', name: req.body.name, email: req.body.email }
    });
  }
);

router.get('/callback', (req, res) => {
  res.status(200).json({ message: 'OAuth callback' });
});

export default router; 