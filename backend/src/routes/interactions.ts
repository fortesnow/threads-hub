import express from 'express';
import { body } from 'express-validator';

const router = express.Router();

// リプライ取得
router.get('/replies', (req, res) => {
  res.status(200).json({
    replies: [
      { id: '1', postId: '101', content: 'すごい投稿ですね！', author: 'user123', createdAt: new Date() },
      { id: '2', postId: '101', content: '参考になりました', author: 'user456', createdAt: new Date() }
    ]
  });
});

// リプライ対応
router.post('/replies/:id/respond',
  [
    body('response').notEmpty().withMessage('返信内容は必須です')
  ],
  (req, res) => {
    res.status(200).json({
      message: '返信しました',
      reply: {
        id: req.params.id,
        response: req.body.response,
        respondedAt: new Date()
      }
    });
  }
);

// メンション取得
router.get('/mentions', (req, res) => {
  res.status(200).json({
    mentions: [
      { id: '1', postId: '201', content: '@threadshub すごいアプリですね', author: 'user789', createdAt: new Date() },
      { id: '2', postId: '202', content: '@threadshub について質問があります', author: 'user101', createdAt: new Date() }
    ]
  });
});

// キーワードモニタリング
router.get('/keywords', (req, res) => {
  res.status(200).json({
    keywords: [
      { id: '1', term: 'threadshub' },
      { id: '2', term: 'スレッズ管理' }
    ],
    matches: [
      { id: '1', keywordId: '1', postId: '301', content: 'threadshubが便利すぎる', author: 'user202', createdAt: new Date() },
      { id: '2', keywordId: '2', postId: '302', content: 'スレッズ管理がとても楽になった', author: 'user303', createdAt: new Date() }
    ]
  });
});

// キーワード追加
router.post('/keywords',
  [
    body('term').notEmpty().withMessage('キーワードは必須です')
  ],
  (req, res) => {
    res.status(201).json({
      message: 'キーワードが追加されました',
      keyword: {
        id: Date.now().toString(),
        term: req.body.term
      }
    });
  }
);

export default router; 