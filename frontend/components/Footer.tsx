import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-4 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} ThreadsHub - Threads API拡張機能アプリ
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="/terms" className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm">
              利用規約
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm">
              プライバシーポリシー
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm">
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 