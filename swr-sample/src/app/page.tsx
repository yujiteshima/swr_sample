'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useCachedRequest } from '../hooks/useCachedRequest';
import { useNonCachedRequest } from '../hooks/useNonCachedRequest';

function CachedRequest({ url, trigger, onRequestClick }: { url: string; trigger: number; onRequestClick: () => void }) {
  const { data, error, isLoading } = useCachedRequest(url, trigger);

  if (!trigger) {
    return (
      <div className="bg-green-50 p-4 rounded border">
        <h3 className="font-bold text-green-800 mb-2">キャッシュあり（デフォルト）</h3>
        <div className="mb-4">
          <button
            onClick={onRequestClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            キャッシュありリクエスト実行
          </button>
        </div>
        <p className="text-gray-600">上のボタンでリクエストを開始してください</p>
      </div>
    );
  }

  if (error) return <div className="text-red-500">エラー: {error.message}</div>;
  if (isLoading) return <div className="text-blue-500">読み込み中...</div>;

  return (
    <div className="bg-green-50 p-4 rounded border">
      <h3 className="font-bold text-green-800 mb-2">キャッシュあり（デフォルト）</h3>
      <div className="mb-4">
        <button
          onClick={onRequestClick}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          再リクエスト実行 (実行回数: {trigger})
        </button>
      </div>
      <pre className="text-sm bg-gray-900 text-green-400 p-4 rounded border overflow-auto font-mono">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

function NonCachedRequest({ url, onRequestClick }: { url: string; onRequestClick: () => void }) {
  const { data, error, isLoading, refetch, requestCount } = useNonCachedRequest(url);

  const handleRequest = () => {
    refetch();
    onRequestClick();
  };

  if (!requestCount) {
    return (
      <div className="bg-red-50 p-4 rounded border">
        <h3 className="font-bold text-red-800 mb-2">キャッシュなし（毎回リクエスト）</h3>
        <div className="mb-4">
          <button
            onClick={handleRequest}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            キャッシュなしリクエスト実行
          </button>
        </div>
        <p className="text-gray-600">上のボタンでリクエストを開始してください</p>
      </div>
    );
  }

  if (error) return <div className="text-red-500">エラー: {error.message}</div>;
  if (isLoading) return <div className="text-blue-500">読み込み中...</div>;

  return (
    <div className="bg-red-50 p-4 rounded border">
      <h3 className="font-bold text-red-800 mb-2">キャッシュなし（毎回リクエスト）</h3>
      <div className="mb-4">
        <button
          onClick={handleRequest}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          再リクエスト実行 (実行回数: {requestCount})
        </button>
      </div>
      <pre className="text-sm bg-gray-900 text-green-400 p-4 rounded border overflow-auto font-mono">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default function Home() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [cachedRequestCount, setCachedRequestCount] = useState(0);

  const handleCachedRequest = () => {
    setCachedRequestCount(prev => prev + 1);
  };

  const handleNonCachedRequest = () => {
    // NonCachedRequestコンポーネント内でカウントを管理
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
            <CachedRequest url={url} trigger={cachedRequestCount} onRequestClick={handleCachedRequest} />
          </div>
          <div>
            <NonCachedRequest url={url} onRequestClick={handleNonCachedRequest} />
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <div className="bg-blue-50 p-4 rounded border">
            <h2 className="font-bold text-blue-800 mb-2">使い方</h2>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>1. 上のテキストフィールドでリクエスト先URLを設定できます</li>
              <li>2. 各ボタンをクリックして動作を比較してみてください</li>
              <li>3. 左側（キャッシュあり）は2回目以降同じデータを再利用します</li>
              <li>4. 右側（キャッシュなし）は毎回新しいリクエストを送信します</li>
              <li>5. ブラウザの開発者ツール（F12）のNetworkタブでHTTPリクエストを確認できます</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded border">
            <h2 className="font-bold text-gray-800 mb-4 text-xl">実装方法の詳細</h2>
            
            <div className="space-y-8">
              <div className="bg-white p-4 rounded border">
                <h3 className="font-bold text-green-800 mb-3 text-lg">キャッシュあり（標準動作）</h3>
                <p className="text-sm text-gray-600 mb-3">SWRのデフォルト設定を使用。同じキーでのリクエストは自動的にキャッシュされます。</p>
                <div className="text-sm mb-4">
                  <strong>使用オプション:</strong>
                  <ul className="text-gray-600 mt-1 ml-4 list-disc">
                    <li>デフォルト設定のまま</li>
                    <li>キャッシュが有効</li>
                    <li>重複リクエストの排除</li>
                  </ul>
                </div>
                <div className="overflow-x-auto">
                  <SyntaxHighlighter
                    language="typescript"
                    style={tomorrow}
                    customStyle={{
                      fontSize: '13px',
                      padding: '16px',
                      borderRadius: '6px',
                      minWidth: '100%',
                      width: 'max-content'
                    }}
                  >
{`// キャッシュありの実装
const { data, error, isLoading } = useSWR(
  trigger > 0 ? url : null, 
  fetcher
);`}
                  </SyntaxHighlighter>
                </div>
              </div>

              <div className="bg-white p-4 rounded border">
                <h3 className="font-bold text-red-800 mb-3 text-lg">キャッシュなし（毎回リクエスト）</h3>
                <p className="text-sm text-gray-600 mb-3">SWRの動的キー機能でキャッシュをバイパスし、毎回新しいリクエストを実行します。</p>
                <div className="text-sm mb-4">
                  <strong>使用技術:</strong>
                  <ul className="text-gray-600 mt-1 ml-4 list-disc">
                    <li><code>useSWR</code> - SWRの標準APIを使用</li>
                    <li><code>動的キー</code> - [url, cacheBypassCounter]で一意性を保証</li>
                    <li><code>refetch関数</code> - カウンターを増加して再リクエスト</li>
                    <li>キャッシュバイパス - 毎回新しいSWRキーでリクエスト</li>
                  </ul>
                </div>
                <div className="overflow-x-auto">
                  <SyntaxHighlighter
                    language="typescript"
                    style={tomorrow}
                    customStyle={{
                      fontSize: '13px',
                      padding: '16px',
                      borderRadius: '6px',
                      minWidth: '100%',
                      width: 'max-content'
                    }}
                  >
{`// キャッシュなしの実装（SWR動的キー）
const [cacheBypassCounter, setCacheBypassCounter] = useState(0);

const { data, error, isLoading } = useSWR(
  url && cacheBypassCounter > 0 ? [url, cacheBypassCounter] : null,
  ([url]) => fetch(url).then(res => res.json())
);

const refetch = useCallback(() => {
  setCacheBypassCounter(prev => prev + 1);
}, []);

// refetch()を呼び出すたびに新しいリクエストが実行される`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 p-4 rounded border border-yellow-200">
              <h4 className="font-bold text-yellow-800 mb-2">SWRオプションの説明</h4>
              <div className="text-sm text-yellow-700 space-y-1">
                <p><strong>dedupingInterval</strong>: 同一キーのリクエストの重複排除時間（ミリ秒）。0にすると無効化</p>
                <p><strong>revalidateOnFocus</strong>: ウィンドウがフォーカスされた時の再検証</p>
                <p><strong>revalidateOnReconnect</strong>: ネットワーク再接続時の再検証</p>
                <p><strong>SWRキーの仕組み</strong>: <code>[url, cacheBypassCounter]</code>でcacheBypassCounterが変わるたびに新しいキャッシュエントリを作成</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
