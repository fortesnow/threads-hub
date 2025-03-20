import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Interaction } from '../models';
import { authenticateToken } from '../middleware/auth';

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

// インタラクション一覧を取得
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { type, status, sort = 'createdAt', order = 'desc', page = 1, limit = 10 } = req.query;
    const query: any = { user: req.user?.userId };

    // タイプフィルター（指定されている場合）
    if (type && ['like', 'reply', 'repost', 'mention'].includes(type as string)) {
      query.type = type;
    }

    // ステータスフィルター（指定されている場合）
    if (status && ['read', 'unread'].includes(status as string)) {
      query.status = status;
    }

    // ソート設定
    const sortOption: any = {};
    sortOption[sort as string] = order === 'asc' ? 1 : -1;

    // ページネーション
    const skip = (Number(page) - 1) * Number(limit);

    // インタラクションを取得
    const interactions = await Interaction.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .populate('post', 'title content');

    // 総数をカウント
    const total = await Interaction.countDocuments(query);

    res.json({
      interactions,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('インタラクション取得エラー:', error);
    res.status(500).json({ message: 'インタラクションの取得中にエラーが発生しました' });
  }
});

// インタラクションをマークアス既読
router.put('/mark-as-read', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: '有効なIDの配列が必要です' });
    }

    const result = await Interaction.updateMany(
      { _id: { $in: ids }, user: req.user?.userId },
      { $set: { status: 'read', updatedAt: new Date() } }
    );

    res.json({ 
      message: 'インタラクションが既読としてマークされました',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('インタラクション更新エラー:', error);
    res.status(500).json({ message: 'インタラクションの更新中にエラーが発生しました' });
  }
});

// インタラクションの削除
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const interaction = await Interaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user?.userId
    });

    if (!interaction) {
      return res.status(404).json({ message: 'インタラクションが見つかりません' });
    }

    res.json({ message: 'インタラクションが削除されました' });
  } catch (error) {
    console.error('インタラクション削除エラー:', error);
    res.status(500).json({ message: 'インタラクションの削除中にエラーが発生しました' });
  }
});

// 未読インタラクションのカウント取得
router.get('/unread-count', authenticateToken, async (req: Request, res: Response) => {
  try {
    const count = await Interaction.countDocuments({
      user: req.user?.userId,
      status: 'unread'
    });

    res.json({ count });
  } catch (error) {
    console.error('未読カウント取得エラー:', error);
    res.status(500).json({ message: '未読カウントの取得中にエラーが発生しました' });
  }
});

export default router; 