import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold">ThreadsHub</Link>
        <nav className="flex items-center space-x-4">
          <Link 
            href="/dashboard" 
            className={`font-medium ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'}`}
          >
            ダッシュボード
          </Link>
          <Link 
            href="/dashboard/posts" 
            className={`font-medium ${isActive('/dashboard/posts') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'}`}
          >
            投稿管理
          </Link>
          <Link 
            href="/dashboard/analytics" 
            className={`font-medium ${isActive('/dashboard/analytics') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'}`}
          >
            分析
          </Link>
          <Link 
            href="/dashboard/interactions" 
            className={`font-medium ${isActive('/dashboard/interactions') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'}`}
          >
            インタラクション
          </Link>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            U
          </div>
        </nav>
      </div>
    </header>
  );
} 