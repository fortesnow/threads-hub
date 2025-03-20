import Link from 'next/link';

export default function Posts() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* ヘッダー部分は共通コンポーネントとして後で切り出す */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">ThreadsHub</h1>
          <nav className="flex items-center space-x-4">
            <Link href="/dashboard" className="font-medium">ダッシュボード</Link>
            <Link href="/dashboard/posts" className="font-medium">投稿管理</Link>
            <Link href="/dashboard/analytics" className="font-medium">分析</Link>
            <Link href="/dashboard/interactions" className="font-medium">インタラクション</Link>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              U
            </div>
          </nav>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">投稿管理</h1>
          <div className="space-x-4">
            <Link href="/dashboard/posts/new" className="btn-primary">
              新規投稿を作成
            </Link>
            <Link href="/dashboard/posts/templates" className="btn-secondary">
              テンプレート管理
            </Link>
          </div>
        </div>
        
        {/* タブ */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <a href="#" className="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              すべての投稿
            </a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              公開済み
            </a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              スケジュール済み
            </a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              下書き
            </a>
          </nav>
        </div>
        
        {/* 検索・フィルター */}
        <div className="mb-6 flex justify-between">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="投稿を検索..."
              className="input w-full"
            />
          </div>
          <div className="flex space-x-4">
            <select className="input">
              <option>日付: 新しい順</option>
              <option>日付: 古い順</option>
              <option>エンゲージメント: 高い順</option>
              <option>エンゲージメント: 低い順</option>
            </select>
          </div>
        </div>
        
        {/* 投稿リスト */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {/* 投稿アイテム1 */}
            <li>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-blue-600 truncate">Threadsの新機能について解説します！</p>
                    <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      公開済み
                    </span>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <button className="mr-2 px-2 py-1 text-xs text-blue-600 hover:text-blue-800">編集</button>
                    <button className="px-2 py-1 text-xs text-red-600 hover:text-red-800">削除</button>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <span>2023/11/05</span>
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <span className="mr-3">👍 24</span>
                    <span className="mr-3">💬 8</span>
                    <span>🔄 4</span>
                  </div>
                </div>
              </div>
            </li>
            
            {/* 投稿アイテム2 */}
            <li>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-blue-600 truncate">新製品のリリースに関するお知らせ</p>
                    <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      スケジュール済み
                    </span>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <button className="mr-2 px-2 py-1 text-xs text-blue-600 hover:text-blue-800">編集</button>
                    <button className="px-2 py-1 text-xs text-red-600 hover:text-red-800">削除</button>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <span>予定：2023/11/15 10:00</span>
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <span>スケジュール済み</span>
                  </div>
                </div>
              </div>
            </li>
            
            {/* 投稿アイテム3 */}
            <li>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-blue-600 truncate">今後の開発計画について</p>
                    <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      下書き
                    </span>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <button className="mr-2 px-2 py-1 text-xs text-blue-600 hover:text-blue-800">編集</button>
                    <button className="px-2 py-1 text-xs text-red-600 hover:text-red-800">削除</button>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <span>最終更新：2023/11/01</span>
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <span>下書き</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        
        {/* ページネーション */}
        <div className="mt-6 flex justify-between">
          <div className="text-sm text-gray-700">
            1-10 / 23 件
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">前へ</button>
            <button className="px-3 py-1 border border-blue-500 bg-blue-500 text-white rounded-md text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">次へ</button>
          </div>
        </div>
      </main>
    </div>
  );
} 