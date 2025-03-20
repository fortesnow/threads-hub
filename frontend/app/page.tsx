import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4">
          Meta Threads API を活用した管理・分析ツール
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <div className="flex items-center justify-center gap-4">
            <Link 
              href="/auth/login"
              className="btn-primary"
            >
              ログイン
            </Link>
            <Link 
              href="/auth/register"
              className="btn-secondary"
            >
              新規登録
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center my-32 text-center">
        <h1 className="text-5xl font-bold mb-4">ThreadsHub</h1>
        <p className="text-xl mb-8">
          Threadsプラットフォームでのコンテンツ管理、投稿スケジューリング、エンゲージメント分析など
          <br />様々な機能を提供する拡張機能アプリ
        </p>
        <Link 
          href="/dashboard"
          className="btn-primary text-lg px-8 py-3"
        >
          ダッシュボードを見る
        </Link>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left gap-8">
        <div className="card">
          <h2 className="mb-3 text-2xl font-semibold">
            高度な投稿管理
          </h2>
          <p className="m-0 text-sm opacity-80">
            スケジュール投稿、テンプレート管理、カルーセル投稿の作成・管理など効率的な投稿ワークフローを実現
          </p>
        </div>

        <div className="card">
          <h2 className="mb-3 text-2xl font-semibold">
            エンゲージメント分析
          </h2>
          <p className="m-0 text-sm opacity-80">
            投稿パフォーマンスの可視化、最適投稿時間の分析、フォロワー分析、コンテンツ効果測定を提供
          </p>
        </div>

        <div className="card">
          <h2 className="mb-3 text-2xl font-semibold">
            インタラクション管理
          </h2>
          <p className="m-0 text-sm opacity-80">
            リプライの一元管理、メンション追跡、キーワードモニタリング、自動エンゲージメント機能
          </p>
        </div>
      </div>
    </main>
  );
} 