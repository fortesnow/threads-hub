'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function InteractionsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // ダミーデータ
  const interactions = [
    {
      id: '1',
      type: 'コメント',
      content: 'すごい投稿ですね！',
      user: {
        name: '田中太郎',
        username: 'tanaka_taro',
        avatar: '/avatars/user1.jpg'
      },
      post: {
        id: 'post1',
        title: 'Threadsの新機能について'
      },
      date: '2023-11-01',
      status: '未対応'
    },
    {
      id: '2',
      type: 'いいね',
      content: '',
      user: {
        name: '佐藤花子',
        username: 'sato_hanako',
        avatar: '/avatars/user2.jpg'
      },
      post: {
        id: 'post2',
        title: 'APIの使い方ガイド'
      },
      date: '2023-11-02',
      status: '対応済み'
    },
    {
      id: '3',
      type: 'リポスト',
      content: '',
      user: {
        name: '鈴木一郎',
        username: 'suzuki_ichiro',
        avatar: '/avatars/user3.jpg'
      },
      post: {
        id: 'post1',
        title: 'Threadsの新機能について'
      },
      date: '2023-11-03',
      status: '未対応'
    },
  ];

  const filteredInteractions = interactions.filter(interaction => {
    if (activeTab !== 'all' && interaction.status !== (activeTab === 'pending' ? '未対応' : '対応済み')) {
      return false;
    }
    
    if (searchQuery) {
      return (
        interaction.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interaction.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interaction.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interaction.post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">インタラクション管理</h1>
          
          <div className="mt-6">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'all'
                      ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  すべて
                </button>
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'pending'
                      ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  未対応
                </button>
                <button
                  onClick={() => setActiveTab('resolved')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'resolved'
                      ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  対応済み
                </button>
              </nav>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row justify-between">
            <div className="mb-4 sm:mb-0 w-full sm:w-64">
              <input
                type="text"
                placeholder="検索..."
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredInteractions.map((interaction) => (
                <li key={interaction.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={interaction.user.avatar || 'https://via.placeholder.com/40'}
                          alt={interaction.user.name}
                        />
                        <div className="ml-4">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                              {interaction.user.name}
                            </p>
                            <p className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                              @{interaction.user.username}
                            </p>
                          </div>
                          <p className="text-sm text-gray-900 dark:text-gray-200">
                            {interaction.content || `この投稿を${interaction.type === 'いいね' ? 'いいね' : 'リポスト'}しました`}
                          </p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            interaction.status === '未対応'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}
                        >
                          {interaction.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          投稿: {interaction.post.title}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6 dark:text-gray-400">
                          種類: {interaction.type}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                        <span>{interaction.date}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end space-x-2">
                      {interaction.status === '未対応' && (
                        <button
                          type="button"
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800"
                        >
                          対応済みにする
                        </button>
                      )}
                      <button
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800"
                      >
                        返信
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {filteredInteractions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                インタラクションが見つかりませんでした。
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 