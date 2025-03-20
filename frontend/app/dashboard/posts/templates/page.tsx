'use client';

import { useState } from 'react';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';

export default function TemplatesPage() {
  const [showNewTemplateForm, setShowNewTemplateForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);
  const [templateName, setTemplateName] = useState('');
  const [templateContent, setTemplateContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ダミーデータ
  const [templates, setTemplates] = useState([
    { id: '1', name: '基本テンプレート', content: 'こんにちは！今日は #Threads についての投稿です。', isDefault: true },
    { id: '2', name: 'お知らせテンプレート', content: '【お知らせ】新機能をリリースしました！詳細は以下のリンクからご確認ください。 #お知らせ', isDefault: false },
    { id: '3', name: '質問テンプレート', content: '質問です：皆さんは #Threads をどのように活用していますか？コメントで教えてください！', isDefault: false },
  ]);

  const handleNewTemplate = () => {
    setEditingTemplate(null);
    setTemplateName('');
    setTemplateContent('');
    setShowNewTemplateForm(true);
  };

  const handleEditTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setEditingTemplate(templateId);
      setTemplateName(template.name);
      setTemplateContent(template.content);
      setShowNewTemplateForm(true);
    }
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (window.confirm('このテンプレートを削除してもよろしいですか？')) {
      setTemplates(templates.filter(t => t.id !== templateId));
    }
  };

  const handleSetDefaultTemplate = (templateId: string) => {
    setTemplates(
      templates.map(t => ({
        ...t,
        isDefault: t.id === templateId
      }))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!templateName.trim() || !templateContent.trim()) {
      alert('テンプレート名と内容は必須です');
      return;
    }
    
    setIsLoading(true);
    
    // 編集モードと新規作成モードの分岐
    if (editingTemplate) {
      // 既存テンプレートの更新
      setTemplates(
        templates.map(t => 
          t.id === editingTemplate 
            ? { ...t, name: templateName, content: templateContent } 
            : t
        )
      );
    } else {
      // 新規テンプレートの作成
      const newTemplate = {
        id: `template-${Date.now()}`,
        name: templateName,
        content: templateContent,
        isDefault: false
      };
      setTemplates([...templates, newTemplate]);
    }
    
    // フォームをリセット
    setTimeout(() => {
      setIsLoading(false);
      setShowNewTemplateForm(false);
      setEditingTemplate(null);
      setTemplateName('');
      setTemplateContent('');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">テンプレート管理</h1>
            <button
              onClick={handleNewTemplate}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              新規テンプレート作成
            </button>
          </div>
          
          {/* テンプレート一覧 */}
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {templates.map((template) => (
                <li key={template.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">{template.name}</h3>
                        {template.isDefault && (
                          <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            デフォルト
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {template.content}
                      </p>
                    </div>
                    <div className="flex">
                      {!template.isDefault && (
                        <button
                          onClick={() => handleSetDefaultTemplate(template.id)}
                          className="mr-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          デフォルトに設定
                        </button>
                      )}
                      <button
                        onClick={() => handleEditTemplate(template.id)}
                        className="mr-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        編集
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              
              {templates.length === 0 && (
                <li className="px-4 py-6 sm:px-6 text-center text-gray-500 dark:text-gray-400">
                  テンプレートがありません。「新規テンプレート作成」ボタンから作成してください。
                </li>
              )}
            </ul>
          </div>
          
          {/* 新規テンプレートフォーム */}
          {showNewTemplateForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    {editingTemplate ? 'テンプレートを編集' : '新規テンプレート作成'}
                  </h3>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="px-4 py-5 sm:p-6 space-y-4">
                    <div>
                      <label htmlFor="template-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        テンプレート名
                      </label>
                      <input
                        type="text"
                        id="template-name"
                        className="mt-1 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="template-content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        テンプレート内容
                      </label>
                      <textarea
                        id="template-content"
                        rows={6}
                        className="mt-1 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={templateContent}
                        onChange={(e) => setTemplateContent(e.target.value)}
                        placeholder="投稿テンプレートの内容を入力..."
                        required
                      ></textarea>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        残り{500 - templateContent.length}文字
                      </p>
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      <p>ヒント: #ハッシュタグ や @メンション を含めることができます。</p>
                    </div>
                  </div>
                  
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right sm:px-6 rounded-b-lg">
                    <button
                      type="button"
                      className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-500"
                      onClick={() => setShowNewTemplateForm(false)}
                    >
                      キャンセル
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 disabled:opacity-50"
                    >
                      {isLoading ? '保存中...' : '保存'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 