import express, { Request, Response } from 'express';
import { Keyword, KeywordMatch } from '../models';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// キーワード一覧を取得
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const keywords = await Keyword.find({ user: req.user?.userId });
    res.json(keywords);
  } catch (error) {
    console.error('キーワード取得エラー:', error);
    res.status(500).json({ message: 'キーワードの取得中にエラーが発生しました' });
  }
});

// 新しいキーワードを追加
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { term } = req.body;

    // 既存キーワードの確認
    const existingKeyword = await Keyword.findOne({
      user: req.user?.userId,
      term: { $regex: new RegExp(`^${term}$`, 'i') }
    });

    if (existingKeyword) {
      return res.status(400).json({ message: 'このキーワードは既に登録されています' });
    }

    const newKeyword = new Keyword({
      user: req.user?.userId,
      term,
      isActive: true
    });

    await newKeyword.save();
    res.status(201).json(newKeyword);
  } catch (error) {
    console.error('キーワード作成エラー:', error);
    res.status(500).json({ message: 'キーワードの作成中にエラーが発生しました' });
  }
});

// キーワードの更新 (有効/無効の切り替えなど)
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { isActive } = req.body;

    const keyword = await Keyword.findOneAndUpdate(
      { _id: req.params.id, user: req.user?.userId },
      { isActive, updatedAt: new Date() },
      { new: true }
    );

    if (!keyword) {
      return res.status(404).json({ message: 'キーワードが見つかりません' });
    }

    res.json(keyword);
  } catch (error) {
    console.error('キーワード更新エラー:', error);
    res.status(500).json({ message: 'キーワードの更新中にエラーが発生しました' });
  }
});

// キーワードの削除
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const keyword = await Keyword.findOneAndDelete({
      _id: req.params.id,
      user: req.user?.userId
    });

    if (!keyword) {
      return res.status(404).json({ message: 'キーワードが見つかりません' });
    }

    // 関連するマッチも削除
    await KeywordMatch.deleteMany({ keyword: req.params.id });

    res.json({ message: 'キーワードが削除されました' });
  } catch (error) {
    console.error('キーワード削除エラー:', error);
    res.status(500).json({ message: 'キーワードの削除中にエラーが発生しました' });
  }
});

// キーワードマッチ一覧を取得
router.get('/matches', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { isRead, keywordId, sort = 'matchedAt', order = 'desc', page = 1, limit = 10 } = req.query;
    const query: any = { user: req.user?.userId };

    // 特定のキーワードに絞り込む
    if (keywordId) {
      query.keyword = keywordId;
    }

    // 既読/未読フィルター
    if (isRead === 'true' || isRead === 'false') {
      query.isRead = isRead === 'true';
    }

    // ソート設定
    const sortOption: any = {};
    sortOption[sort as string] = order === 'asc' ? 1 : -1;

    // ページネーション
    const skip = (Number(page) - 1) * Number(limit);

    // マッチを取得
    const matches = await KeywordMatch.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .populate('keyword', 'term');

    // 総数をカウント
    const total = await KeywordMatch.countDocuments(query);

    res.json({
      matches,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('キーワードマッチ取得エラー:', error);
    res.status(500).json({ message: 'キーワードマッチの取得中にエラーが発生しました' });
  }
});

// キーワードマッチをマークアス既読
router.put('/matches/mark-as-read', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: '有効なIDの配列が必要です' });
    }

    const result = await KeywordMatch.updateMany(
      { _id: { $in: ids }, user: req.user?.userId },
      { $set: { isRead: true, updatedAt: new Date() } }
    );

    res.json({ 
      message: 'キーワードマッチが既読としてマークされました',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('キーワードマッチ更新エラー:', error);
    res.status(500).json({ message: 'キーワードマッチの更新中にエラーが発生しました' });
  }
});

// 未読キーワードマッチのカウント取得
router.get('/matches/unread-count', authenticateToken, async (req: Request, res: Response) => {
  try {
    const count = await KeywordMatch.countDocuments({
      user: req.user?.userId,
      isRead: false
    });

    res.json({ count });
  } catch (error) {
    console.error('未読カウント取得エラー:', error);
    res.status(500).json({ message: '未読カウントの取得中にエラーが発生しました' });
  }
});

export default router; 