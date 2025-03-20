import express from 'express';

const router = express.Router();

// エンゲージメント分析
router.get('/engagement', (req, res) => {
  res.status(200).json({
    engagement: {
      summary: {
        totalLikes: 150,
        totalReplies: 45,
        totalReposts: 30
      },
      byDay: [
        { date: '2023-11-01', likes: 20, replies: 5, reposts: 3 },
        { date: '2023-11-02', likes: 25, replies: 8, reposts: 4 },
        { date: '2023-11-03', likes: 30, replies: 10, reposts: 6 }
      ]
    }
  });
});

// フォロワー分析
router.get('/followers', (req, res) => {
  res.status(200).json({
    followers: {
      total: 1250,
      growth: {
        weekly: 50,
        monthly: 180
      },
      activeTime: {
        mostActive: '18:00-21:00',
        byHour: [
          { hour: '00:00', count: 5 },
          { hour: '06:00', count: 10 },
          { hour: '12:00', count: 35 },
          { hour: '18:00', count: 60 }
        ]
      }
    }
  });
});

// 投稿パフォーマンス
router.get('/posts', (req, res) => {
  res.status(200).json({
    posts: {
      bestPerforming: [
        { id: '1', content: '最も人気の投稿', engagement: { likes: 75, replies: 25, reposts: 15 } },
        { id: '2', content: '2番目に人気の投稿', engagement: { likes: 60, replies: 18, reposts: 12 } }
      ],
      byType: {
        text: { avgLikes: 15, avgReplies: 5, avgReposts: 3 },
        image: { avgLikes: 25, avgReplies: 8, avgReposts: 5 },
        carousel: { avgLikes: 30, avgReplies: 10, avgReposts: 7 }
      }
    }
  });
});

// 最適投稿時間
router.get('/optimal-times', (req, res) => {
  res.status(200).json({
    optimalTimes: {
      byDay: [
        { day: '月曜日', time: '19:00', engagementScore: 85 },
        { day: '水曜日', time: '12:00', engagementScore: 80 },
        { day: '金曜日', time: '20:00', engagementScore: 90 }
      ]
    }
  });
});

export default router; 