import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            React Data Fetching サンプル集
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reactにおけるデータフェッチングの様々な手法やライブラリの使用方法を学習できるサンプルアプリケーション集です。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 max-w-3xl mx-auto">
          {/* SWR キャッシュ比較サンプル */}
          <Link 
            href="/samples/swr-cache-comparison" 
            className="block group hover:scale-105 transition-transform duration-200"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    SWR キャッシュ比較デモ
                  </h2>
                  <p className="text-gray-600 mb-4">
                    SWRライブラリのキャッシュ機能を体験できるインタラクティブなサンプルです。キャッシュありとキャッシュなしのリクエストを実際に比較できます。
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">SWR</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">React Hooks</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">TypeScript</span>
                  </div>
                </div>
                <div className="ml-4 text-blue-500 group-hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* 将来のサンプル用のプレースホルダー */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-gray-300 opacity-75">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-500 mb-2">
                  React Query サンプル
                </h2>
                <p className="text-gray-500 mb-4">
                  React Queryを使用したデータフェッチングのサンプル（準備中）
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-full">React Query</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-full">Coming Soon</span>
                </div>
              </div>
              <div className="ml-4 text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-gray-300 opacity-75">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-500 mb-2">
                  Zustand 状態管理サンプル
                </h2>
                <p className="text-gray-500 mb-4">
                  Zustandを使用した軽量な状態管理のサンプル（準備中）
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-full">Zustand</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-full">Coming Soon</span>
                </div>
              </div>
              <div className="ml-4 text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-lg shadow-md p-6 inline-block">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              このサンプル集について
            </h3>
            <p className="text-gray-600 max-w-md">
              各サンプルは実際に動作するコードと詳細な説明を含んでおり、
              学習やプロトタイプ作成にご活用いただけます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}