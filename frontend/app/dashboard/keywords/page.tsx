'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function KeywordsPage() {
  const [newKeyword, setNewKeyword] = useState('');

  // ダミーデータ
  const keywords = [
    {
      id: '1',
      term: 'Threads API',
      isActive: true,
      createdAt: '2023-10-15',
      matchCount: 24
    },
    {
      id: '2',
      term: 'Meta',
      isActive: true,
      createdAt: '2023-10-16',
      matchCount: 56
    },
    {
      id: '3',
      term: 'Instagram',
      isActive: false,
      createdAt: '2023-10-17',
      matchCount: 37
    },
  ];

  const matches = [
    {
      id: '1',
      keyword: 'Threads API',
      author: {
        name: '田中太郎',
        username: 'tanaka_taro',
        avatar: '/avatars/user1.jpg'
      },
      content: 'Threads APIの新機能がリリースされました！詳細はこちら...',
      matchedAt: '2023-11-01 14:30',
      isRead: true
    },
    {
      id: '2',
      keyword: 'Meta',
      author: {
        name: '佐藤花子',
        username: 'sato_hanako',
        avatar: '/avatars/user2.jpg'
      },
      content: 'Metaが発表した新しいAI機能が話題になっています。#Meta #AI',
      matchedAt: '2023-11-02 09:15',
      isRead: false
    },
    {
      id: '3',
      keyword: 'Threads API',
      author: {
        name: '鈴木一郎',
        username: 'suzuki_ichiro',
        avatar: '/avatars/user3.jpg'
      },
      content: 'Threads APIを使った新しいアプリケーションの開発中です！',
      matchedAt: '2023-11-03 16:45',
      isRead: false
    },
  ];

  const handleAddKeyword = () => {
    // 新しいキーワードを追加する処理
    if (newKeyword.trim()) {
      console.log('新しいキーワードを追加:', newKeyword);
      setNewKeyword('');
    }
  };

  const handleToggleKeyword = (id: string) => {
    // キーワードのアクティブ状態を切り替える処理
    console.log('キーワードの状態を切り替え:', id);
  };

  const handleDeleteKeyword = (id: string) => {
    // キーワードを削除する処理
    console.log('キーワードを削除:', id);
  };

  const handleMarkAsRead = (id: string) => {
    // マッチを既読としてマークする処理
    console.log('マッチを既読としてマーク:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">キーワードモニタリング</h1>
          
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* キーワード管理セクション */}
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  監視キーワード
                </h2>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {keywords.filter(k => k.isActive).length}個アクティブ
                </span>
              </div>
              
              <div className="px-4 py-3 sm:px-6">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="新しいキーワード..."
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-l-md"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyword}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                  >
                    追加
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {keywords.map((keyword) => (
                    <li key={keyword.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleToggleKeyword(keyword.id)}
                            className={`mr-3 h-5 w-5 rounded-full ${
                              keyword.isActive
                                ? 'bg-green-500 dark:bg-green-400'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          ></button>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {keyword.term}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {keyword.matchCount}件のマッチ · {keyword.createdAt}から
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteKeyword(keyword.id)}
                          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-400"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* マッチ履歴セクション */}
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  最近のマッチ
                </h2>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  {matches.filter(m => !m.isRead).length}件未読
                </span>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {matches.map((match) => (
                    <li key={match.id} className={`px-4 py-4 sm:px-6 ${!match.isRead ? 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={match.author.avatar || 'https://via.placeholder.com/40'}
                            alt={match.author.name}
                          />
                          <div className="ml-4">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {match.author.name}
                              </p>
                              <p className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                                @{match.author.username}
                              </p>
                            </div>
                            <p className="text-sm text-gray-900 dark:text-gray-200">
                              {match.content}
                            </p>
                            <div className="mt-1 flex items-center">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                                #{match.keyword}
                              </span>
                              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                {match.matchedAt}
                              </span>
                            </div>
                          </div>
                        </div>
                        {!match.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(match.id)}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                          >
                            既読にする
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 