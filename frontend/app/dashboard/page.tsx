'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Dashboard() {
  // ダミーデータ
  const stats = [
    { name: '総投稿数', value: '42' },
    { name: 'フォロワー', value: '2,458' },
    { name: '今月のエンゲージメント', value: '3,841' },
    { name: 'キーワードマッチ', value: '12' },
  ];

  const recentPosts = [
    {
      id: '1',
      title: 'Threadsの新機能について解説します！',
      date: '2023-11-05',
      engagement: { likes: 24, comments: 8, reposts: 4 },
      status: '公開済み'
    },
    {
      id: '2',
      title: '新製品のリリースに関するお知らせ',
      date: '2023-11-15',
      status: 'スケジュール済み'
    },
    {
      id: '3',
      title: '今後の開発計画について',
      date: '2023-11-01',
      status: '下書き'
    },
  ];

  const recentInteractions = [
    {
      id: '1',
      type: 'コメント',
      user: {
        name: '田中太郎',
        username: 'tanaka_taro',
        avatar: '/avatars/user1.jpg'
      },
      content: 'すごい投稿ですね！',
      date: '2023-11-01',
    },
    {
      id: '2',
      type: 'いいね',
      user: {
        name: '佐藤花子',
        username: 'sato_hanako',
        avatar: '/avatars/user2.jpg'
      },
      date: '2023-11-02',
    },
    {
      id: '3',
      type: 'リポスト',
      user: {
        name: '鈴木一郎',
        username: 'suzuki_ichiro',
        avatar: '/avatars/user3.jpg'
      },
      date: '2023-11-03',
    },
  ];

  const keywordMatches = [
    {
      id: '1',
      keyword: 'Threads API',
      content: 'Threads APIの新機能がリリースされました！詳細はこちら...',
      date: '2023-11-01',
    },
    {
      id: '2',
      keyword: 'Meta',
      content: 'Metaが発表した新しいAI機能が話題になっています。',
      date: '2023-11-02',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">ダッシュボード</h1>
          
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
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* 最近の投稿 */}
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  最近の投稿
                </h2>
                <Link
                  href="/dashboard/posts"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  すべて表示
                </Link>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentPosts.map((post) => (
                    <li key={post.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-600 truncate dark:text-blue-400">
                            {post.title}
                          </p>
                          <div className="mt-1 flex items-center">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              post.status === '公開済み'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : post.status === 'スケジュール済み'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            }`}>
                              {post.status}
                            </span>
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                              {post.date}
                            </span>
                          </div>
                        </div>
                        {post.engagement && (
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <span className="mr-2">👍 {post.engagement.likes}</span>
                            <span className="mr-2">💬 {post.engagement.comments}</span>
                            <span>🔄 {post.engagement.reposts}</span>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* 最近のインタラクション */}
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  最近のインタラクション
                </h2>
                <Link
                  href="/dashboard/interactions"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  すべて表示
                </Link>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentInteractions.map((interaction) => (
                    <li key={interaction.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={interaction.user.avatar || 'https://via.placeholder.com/40'}
                          alt={interaction.user.name}
                        />
                        <div className="ml-4">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {interaction.user.name}
                            </p>
                            <p className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                              @{interaction.user.username}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {interaction.content || `投稿を${interaction.type}しました`} · {interaction.date}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* キーワードマッチ */}
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  最近のキーワードマッチ
                </h2>
                <Link
                  href="/dashboard/keywords"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  すべて表示
                </Link>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {keywordMatches.map((match) => (
                    <li key={match.id} className="px-4 py-4 sm:px-6">
                      <div>
                        <div className="flex items-center">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            #{match.keyword}
                          </span>
                          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                            {match.date}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {match.content}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* クイックアクション */}
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  クイックアクション
                </h2>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Link 
                    href="/dashboard/posts/new"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
                  >
                    新規投稿作成
                  </Link>
                  <Link 
                    href="/dashboard/posts/templates"
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    テンプレート管理
                  </Link>
                  <Link 
                    href="/dashboard/keywords"
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    キーワード追加
                  </Link>
                  <Link 
                    href="/settings/threads"
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    Threads連携設定
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 