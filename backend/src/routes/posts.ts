import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Post, PostTemplate } from '../models';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// 投稿リスト取得
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { status, sort = 'createdAt', order = 'desc', page = 1, limit = 10 } = req.query;
    const query: any = { user: req.user?.userId };

    // ステータスフィルター（指定されている場合）
    if (status && ['draft', 'scheduled', 'published'].includes(status as string)) {
      query.status = status;
    }

    // ソート設定
    const sortOption: any = {};
    sortOption[sort as string] = order === 'asc' ? 1 : -1;

    // ページネーション
    const skip = (Number(page) - 1) * Number(limit);

    // 投稿を取得
    const posts = await Post.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .populate('template', 'name');

    // 総数をカウント
    const total = await Post.countDocuments(query);

    res.json({
      posts,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('投稿取得エラー:', error);
    res.status(500).json({ message: '投稿の取得中にエラーが発生しました' });
  }
});

// 特定の投稿を取得
router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      user: req.user?.userId
    }).populate('template', 'name content');

    if (!post) {
      return res.status(404).json({ message: '投稿が見つかりません' });
    }

    res.json(post);
  } catch (error) {
    console.error('投稿取得エラー:', error);
    res.status(500).json({ message: '投稿の取得中にエラーが発生しました' });
  }
});

// 投稿作成
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { title, content, status, scheduledAt, template } = req.body;

    const newPost = new Post({
      title,
      content,
      status: status || 'draft',
      scheduledAt: scheduledAt || null,
      template: template || null,
      user: req.user?.userId
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('投稿作成エラー:', error);
    res.status(500).json({ message: '投稿の作成中にエラーが発生しました' });
  }
});

// 投稿の更新
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { title, content, status, scheduledAt, template } = req.body;

    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, user: req.user?.userId },
      {
        title,
        content,
        status,
        scheduledAt,
        template,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: '投稿が見つかりません' });
    }

    res.json(post);
  } catch (error) {
    console.error('投稿更新エラー:', error);
    res.status(500).json({ message: '投稿の更新中にエラーが発生しました' });
  }
});

// 投稿の削除
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user?.userId
    });

    if (!post) {
      return res.status(404).json({ message: '投稿が見つかりません' });
    }

    res.json({ message: '投稿が削除されました' });
  } catch (error) {
    console.error('投稿削除エラー:', error);
    res.status(500).json({ message: '投稿の削除中にエラーが発生しました' });
  }
});

// テンプレート関連のルート
router.get('/templates/all', authenticateToken, async (req: Request, res: Response) => {
  try {
    const templates = await PostTemplate.find({ user: req.user?.userId });
    res.json(templates);
  } catch (error) {
    console.error('テンプレート取得エラー:', error);
    res.status(500).json({ message: 'テンプレートの取得中にエラーが発生しました' });
  }
});

router.post('/templates', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { name, content } = req.body;

    const newTemplate = new PostTemplate({
      name,
      content,
      user: req.user?.userId
    });

    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (error) {
    console.error('テンプレート作成エラー:', error);
    res.status(500).json({ message: 'テンプレートの作成中にエラーが発生しました' });
  }
});

export default router; 