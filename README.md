# ThreadsHub

ThreadsHubは、Meta Threads APIを活用したソーシャルメディア管理ツールです。投稿の作成、予約投稿、インタラクション管理、統計分析などの機能を提供します。

## 機能

- Threadsアカウントとの連携
- 投稿の作成、スケジュール管理
- 投稿テンプレート機能
- インタラクション（コメント、いいね、リポスト）の管理
- キーワードモニタリング
- 分析情報とレポート生成

## 技術スタック

### バックエンド
- Node.js
- Express
- MongoDB
- TypeScript

### フロントエンド
- Next.js
- React
- TypeScript
- Tailwind CSS

## セットアップ方法

### 前提条件
- Node.js (v14以上)
- npm または yarn
- MongoDB

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/your-username/threads-hub.git
cd threads-hub

# 依存関係のインストール
# バックエンド
cd backend
npm install

# フロントエンド
cd ../frontend
npm install
```

### 環境変数の設定
`.env.example`ファイルをコピーして`.env`ファイルを作成し、必要な環境変数を設定してください。

### 開発サーバーの起動

```bash
# バックエンド
cd backend
npm run dev

# フロントエンド (別ターミナルで)
cd frontend
npm run dev
```

## ライセンス
MIT

## 貢献方法
プルリクエストやイシューの報告は歓迎しています。大きな変更を加える場合は、まずイシューでディスカッションを開始してください。 