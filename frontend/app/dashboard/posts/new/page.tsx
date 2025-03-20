'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';

export default function NewPost() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [scheduledFor, setScheduledFor] = useState<string>('');
  const [status, setStatus] = useState<'draft' | 'publish' | 'schedule'>('publish');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // ダミーデータ
  const templates = [
    { id: '1', name: '基本テンプレート', content: 'こんにちは！今日は #Threads についての投稿です。' },
    { id: '2', name: 'お知らせテンプレート', content: '【お知らせ】新機能をリリースしました！詳細は以下のリンクからご確認ください。 #お知らせ' },
    { id: '3', name: '質問テンプレート', content: '質問です：皆さんは #Threads をどのように活用していますか？コメントで教えてください！' },
  ];

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setContent(template.content);
    }
  };

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      setMediaFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const removeMedia = (index: number) => {
    setMediaFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      alert('投稿内容を入力してください');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 実際の実装ではここでAPIリクエストを行います
      console.log({
        content,
        status,
        scheduledFor: status === 'schedule' ? scheduledFor : null,
        mediaFiles: mediaFiles.map(file => file.name),
      });
      
      // 成功したらダッシュボードにリダイレクト
      setTimeout(() => {
        alert('投稿が完了しました');
        router.push('/dashboard/posts');
      }, 1500);
    } catch (error) {
      console.error('投稿エラー:', error);
      alert('投稿に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">新規投稿作成</h1>
          
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
              <div className="p-6">
                {/* テンプレート選択 */}
                <div className="mb-6">
                  <label htmlFor="template" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    テンプレート（オプション）
                  </label>
                  <select
                    id="template"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={selectedTemplate || ''}
                    onChange={(e) => handleTemplateSelect(e.target.value)}
                  >
                    <option value="">テンプレートを選択</option>
                    {templates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* 投稿内容 */}
                <div className="mb-6">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    投稿内容
                  </label>
                  <textarea
                    id="content"
                    rows={6}
                    className="mt-1 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="投稿内容を入力..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    残り{500 - content.length}文字
                  </p>
                </div>
                
                {/* メディアアップロード */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    メディア（画像・動画）
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md dark:border-gray-600">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600 dark:text-gray-400">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 focus-within:outline-none"
                        >
                          <span>ファイルをアップロード</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*,video/*"
                            onChange={handleMediaUpload}
                            multiple
                          />
                        </label>
                        <p className="pl-1">またはドラッグ＆ドロップ</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF, MP4 (最大10MB)
                      </p>
                    </div>
                  </div>
                  
                  {/* アップロードされたメディアのプレビュー */}
                  {mediaFiles.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {mediaFiles.map((file, index) => (
                        <div key={index} className="relative">
                          <div className="aspect-w-1 aspect-h-1 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700">
                            {file.type.startsWith('image/') ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  ビデオ: {file.name}
                                </span>
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeMedia(index)}
                            className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
                            aria-label="Remove"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* 公開設定 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    公開設定
                  </label>
                  <div className="mt-2 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="publish-now"
                        name="status"
                        type="radio"
                        checked={status === 'publish'}
                        onChange={() => setStatus('publish')}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600"
                      />
                      <label htmlFor="publish-now" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        今すぐ公開
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="schedule"
                        name="status"
                        type="radio"
                        checked={status === 'schedule'}
                        onChange={() => setStatus('schedule')}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600"
                      />
                      <label htmlFor="schedule" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        予約投稿
                      </label>
                    </div>
                    
                    {status === 'schedule' && (
                      <div className="ml-7">
                        <label htmlFor="scheduled-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          公開日時
                        </label>
                        <input
                          type="datetime-local"
                          id="scheduled-time"
                          name="scheduled-time"
                          className="mt-1 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          value={scheduledFor}
                          onChange={(e) => setScheduledFor(e.target.value)}
                          min={new Date().toISOString().slice(0, 16)}
                        />
                        {scheduledFor && (
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {formatDateTime(scheduledFor)}に投稿されます
                          </p>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <input
                        id="save-draft"
                        name="status"
                        type="radio"
                        checked={status === 'draft'}
                        onChange={() => setStatus('draft')}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600"
                      />
                      <label htmlFor="save-draft" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        下書き保存
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right sm:px-6 rounded-b-lg">
                <button
                  type="button"
                  className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-500"
                  onClick={() => router.push('/dashboard/posts')}
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      処理中...
                    </>
                  ) : status === 'draft' ? '下書き保存' : status === 'schedule' ? '予約投稿' : '公開する'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 