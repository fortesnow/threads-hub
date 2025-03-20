'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('month');

  // ダミーデータ
  const stats = [
    { name: '総投稿数', value: '42', change: '+12%', isPositive: true },
    { name: '総エンゲージメント', value: '3,841', change: '+8%', isPositive: true },
    { name: '平均いいね数', value: '56', change: '+5%', isPositive: true },
    { name: '平均コメント数', value: '12', change: '-2%', isPositive: false },
  ];
  
  const topPosts = [
    {
      id: '1',
      title: 'Threadsの新機能について解説します！',
      date: '2023-11-05',
      engagement: { likes: 158, comments: 42, reposts: 23 },
    },
    {
      id: '2',
      title: 'ThreadsHubの使い方ガイド',
      date: '2023-11-03',
      engagement: { likes: 124, comments: 38, reposts: 16 },
    },
    {
      id: '3',
      title: 'APIを活用した効果的なSNS管理術',
      date: '2023-10-28',
      engagement: { likes: 98, comments: 22, reposts: 15 },
    },
  ];
  
  const followersGrowth = [
    { date: '11/01', count: 1200 },
    { date: '11/02', count: 1240 },
    { date: '11/03', count: 1260 },
    { date: '11/04', count: 1280 },
    { date: '11/05', count: 1305 },
    { date: '11/06', count: 1340 },
    { date: '11/07', count: 1370 },
  ];
  
  const engagementByTime = [
    { time: '0時', engagement: 42 },
    { time: '3時', engagement: 28 },
    { time: '6時', engagement: 56 },
    { time: '9時', engagement: 125 },
    { time: '12時', engagement: 246 },
    { time: '15時', engagement: 312 },
    { time: '18時', engagement: 289 },
    { time: '21時', engagement: 186 },
  ];

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">アナリティクス</h1>
            
            {/* 期間選択 */}
            <div className="mt-4 sm:mt-0 inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => handleDateRangeChange('week')}
                className={`relative inline-flex items-center px-4 py-2 rounded-l-md border text-sm font-medium ${
                  dateRange === 'week'
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                今週
              </button>
              <button
                type="button"
                onClick={() => handleDateRangeChange('month')}
                className={`relative inline-flex items-center px-4 py-2 border-t border-b text-sm font-medium ${
                  dateRange === 'month'
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                今月
              </button>
              <button
                type="button"
                onClick={() => handleDateRangeChange('quarter')}
                className={`relative inline-flex items-center px-4 py-2 rounded-r-md border text-sm font-medium ${
                  dateRange === 'quarter'
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                3ヶ月
              </button>
            </div>
          </div>
          
          {/* 統計情報 */}
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {stat.name}
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                      {stat.value}
                    </dd>
                    <dd className={`mt-2 text-sm ${stat.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {stat.change}
                    </dd>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* グラフ（レスポンシブなグリッドレイアウト） */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* フォロワー成長グラフ */}
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  フォロワー成長推移
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  日々のフォロワー数の変化
                </p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="h-64 relative">
                  {/* ここに本来はChartコンポーネントが入ります */}
                  <div className="absolute inset-0 flex items-end">
                    {followersGrowth.map((data, index) => (
                      <div key={data.date} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-blue-500 dark:bg-blue-600"
                          style={{
                            height: `${(data.count / Math.max(...followersGrowth.map(d => d.count))) * 80}%`,
                          }}
                        ></div>
                        <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">{data.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
                  現在のフォロワー数: 1,370 (+14.2%)
                </div>
              </div>
            </div>
            
            {/* 時間帯別エンゲージメント */}
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  時間帯別エンゲージメント
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  最も反応が良い投稿時間帯
                </p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="h-64 relative">
                  {/* ここに本来はChartコンポーネントが入ります */}
                  <div className="absolute inset-0 flex items-end">
                    {engagementByTime.map((data) => (
                      <div key={data.time} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-green-500 dark:bg-green-600"
                          style={{
                            height: `${(data.engagement / Math.max(...engagementByTime.map(d => d.engagement))) * 80}%`,
                          }}
                        ></div>
                        <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">{data.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
                  最適な投稿時間帯: 15時〜18時
                </div>
              </div>
            </div>
            
            {/* 人気投稿ランキング */}
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  人気投稿ランキング
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  エンゲージメント数の高い投稿
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {topPosts.map((post, index) => (
                    <li key={post.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-bold">
                          {index + 1}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-blue-600 truncate dark:text-blue-400">
                              {post.title}
                            </p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                {post.date}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 flex justify-between">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <span className="mr-2">👍 {post.engagement.likes}</span>
                              <span className="mr-2">💬 {post.engagement.comments}</span>
                              <span>🔄 {post.engagement.reposts}</span>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              合計: {post.engagement.likes + post.engagement.comments + post.engagement.reposts}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* コンテンツ内容の分析 */}
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  コンテンツ内容の分析
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  よく反応を得るコンテンツタイプ
                </p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">チュートリアル/解説</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">45%</div>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">ニュース/アップデート</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">30%</div>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">質問/議論</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">15%</div>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">その他</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">10%</div>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                  <p>推奨: チュートリアルや解説記事の投稿を増やすことでエンゲージメントを高める可能性があります。</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* レポート出力セクション */}
          <div className="mt-8 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                レポート出力
              </h2>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                選択した期間のアナリティクスレポートをダウンロードできます。
              </p>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 mb-3 sm:mb-0"
                >
                  PDFでダウンロード
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 mb-3 sm:mb-0"
                >
                  CSVでダウンロード
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  定期レポートを設定
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 