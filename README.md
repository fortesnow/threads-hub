# ThreadsHub

ThreadsHubは、Meta Threads APIを活用したソーシャルメディア管理プラットフォームです。このアプリケーションでは、投稿の作成・スケジュール・分析機能や、インタラクションの管理、キーワード監視などが可能です。

## 機能

- **投稿管理**: テキスト投稿の作成、スケジュール、テンプレート管理
- **インタラクション管理**: いいね、リプライ、リポスト、メンションの一元管理
- **キーワード監視**: 特定のキーワードを含む投稿の監視
- **分析ダッシュボード**: 投稿のパフォーマンス分析

## 技術スタック

### バックエンド
- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- JWT認証

### フロントエンド
- Next.js
- React
- TypeScript
- Tailwind CSS

## インストール方法

### 必要条件
- Node.js 14.0以上
- MongoDB
- npm または yarn

### セットアップ

1. リポジトリをクローン:
```
git clone https://github.com/fortesnow/threads-hub.git
cd threads-hub
```

2. バックエンドの設定:
```
cd backend
npm install
cp .env.example .env
# .envファイルを編集して適切な環境変数を設定してください
npm run dev
```

3. フロントエンドの設定:
```
cd ../frontend
npm install
npm run dev
```

## 環境変数

### バックエンド (.env)
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/threads-hub
JWT_SECRET=your_jwt_secret_key
THREADS_API_KEY=your_threads_api_key
```

### フロントエンド (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 使用方法

1. ブラウザで `http://localhost:3000` にアクセス
2. アカウントを作成またはログイン
3. ダッシュボードから機能を利用開始

## ライセンス

MIT

## 作者

Your Name 