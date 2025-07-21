'use client';

import { useState } from 'react';
import { useCachedRequest } from '../hooks/useCachedRequest';
import { useNonCachedRequest } from '../hooks/useNonCachedRequest';

function CachedRequest({ url, trigger }: { url: string; trigger: number }) {
  const { data, error, isLoading } = useCachedRequest(url, trigger);

  if (!trigger) {
    return (
      <div className="bg-green-50 p-4 rounded border">
        <h3 className="font-bold text-green-800 mb-2">キャッシュあり（デフォルト）</h3>
        <p className="text-gray-600">ボタンをクリックしてリクエストを開始してください</p>
      </div>
    );
  }

  if (error) return <div className="text-red-500">エラー: {error.message}</div>;
  if (isLoading) return <div className="text-blue-500">読み込み中...</div>;

  return (
    <div className="bg-green-50 p-4 rounded border">
      <h3 className="font-bold text-green-800 mb-2">キャッシュあり（デフォルト）</h3>
      <pre className="text-sm bg-white p-2 rounded border overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

function NonCachedRequest({ url, trigger }: { url: string; trigger: number }) {
  const { data, error, isLoading } = useNonCachedRequest(url, trigger);

  if (!trigger) {
    return (
      <div className="bg-red-50 p-4 rounded border">
        <h3 className="font-bold text-red-800 mb-2">キャッシュなし（毎回リクエスト）</h3>
        <p className="text-gray-600">ボタンをクリックしてリクエストを開始してください</p>
      </div>
    );
  }

  if (error) return <div className="text-red-500">エラー: {error.message}</div>;
  if (isLoading) return <div className="text-blue-500">読み込み中...</div>;

  return (
    <div className="bg-red-50 p-4 rounded border">
      <h3 className="font-bold text-red-800 mb-2">キャッシュなし（毎回リクエスト）</h3>
      <pre className="text-sm bg-white p-2 rounded border overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default function Home() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [cachedRequestCount, setCachedRequestCount] = useState(0);
  const [nonCachedRequestCount, setNonCachedRequestCount] = useState(0);

  const handleCachedRequest = () => {
    setCachedRequestCount(prev => prev + 1);
  };

  const handleNonCachedRequest = () => {
    setNonCachedRequestCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">SWR キャッシュ比較サンプル</h1>
        
        <div className="mb-8">
          <label htmlFor="url" className="block text-sm font-medium mb-2">
            リクエストURL:
          </label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://jsonplaceholder.typicode.com/posts/1"
          />
          <p className="text-sm text-gray-600 mt-1">
            デフォルト: JSONPlaceholder API（テスト用の無料JSON API）
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <button
                onClick={handleCachedRequest}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                キャッシュありリクエスト (実行回数: {cachedRequestCount})
              </button>
            </div>
            <CachedRequest url={url} trigger={cachedRequestCount} />
          </div>
          <div>
            <div className="mb-4">
              <button
                onClick={handleNonCachedRequest}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                キャッシュなしリクエスト (実行回数: {nonCachedRequestCount})
              </button>
            </div>
            <NonCachedRequest url={url} trigger={nonCachedRequestCount} />
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-4 rounded border">
          <h2 className="font-bold text-blue-800 mb-2">使い方</h2>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>1. 上のテキストフィールドでリクエスト先URLを設定できます</li>
            <li>2. 各ボタンを個別にクリックして動作を比較してみてください</li>
            <li>3. 左側（キャッシュあり）は2回目以降同じデータを再利用します</li>
            <li>4. 右側（キャッシュなし）は毎回新しいリクエストを送信します</li>
            <li>5. ブラウザの開発者ツール（F12）のNetworkタブでHTTPリクエストを確認できます</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
