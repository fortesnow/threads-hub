import express from 'express';
import { body } from 'express-validator';

const router = express.Router();

// 投稿リスト取得
router.get('/', (req, res) => {
  res.status(200).json({
    posts: [
      { id: '1', content: '投稿テスト1', createdAt: new Date(), engagement: { likes: 10, replies: 5, reposts: 2 } },
      { id: '2', content: '投稿テスト2', createdAt: new Date(), engagement: { likes: 5, replies: 2, reposts: 1 } }
    ]
  });
});

// 投稿作成
router.post('/',
  [
    body('content').notEmpty().withMessage('投稿内容は必須です'),
  ],
  (req, res) => {
    res.status(201).json({
      message: '投稿が作成されました',
      post: {
        id: Date.now().toString(),
        content: req.body.content,
        createdAt: new Date(),
        engagement: { likes: 0, replies: 0, reposts: 0 }
      }
    });
  }
);

// スケジュール投稿
router.post('/schedule',
  [
    body('content').notEmpty().withMessage('投稿内容は必須です'),
    body('scheduledFor').isISO8601().withMessage('有効な日時を指定してください'),
  ],
  (req, res) => {
    res.status(201).json({
      message: '投稿がスケジュールされました',
      scheduledPost: {
        id: Date.now().toString(),
        content: req.body.content,
        scheduledFor: req.body.scheduledFor,
        status: 'scheduled'
      }
    });
  }
);

// 投稿テンプレート
router.get('/templates', (req, res) => {
  res.status(200).json({
    templates: [
      { id: '1', name: '一般投稿', content: 'これは一般的な投稿テンプレートです #threadshub' },
      { id: '2', name: '質問投稿', content: '【質問】\n\n#質問 #threadshub' }
    ]
  });
});

export default router; 