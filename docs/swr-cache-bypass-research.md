# SWRキャッシュなしリクエストの実現方法 - 調査レポート

## 概要

SWRはキャッシュファーストなデータフェッチングライブラリですが、場合によってはキャッシュを無効化して毎回新しいリクエストを送信したいケースがあります。本ドキュメントは、SWRを使用してキャッシュなしリクエストを実現する複数のアプローチを調査し、それぞれの特徴と適用場面をまとめたものです。

## 調査背景

- **目的**: SWRのAPIを活用してキャッシュを無効化する方法を探る
- **制約**: useEffectなどの素のReactフックの使用は避けたい
- **要件**: SWRの思想に沿った実装を優先する

## 調査したアプローチ

### 1. useSWRMutation（推奨アプローチ）

#### 概要
SWR 2.0で導入された手動トリガー型のフック。リクエストが自動実行されず、明示的な呼び出しが必要。

#### 実装例
```typescript
import useSWRMutation from 'swr/mutation';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export function useNonCachedRequest(url: string) {
  const { data, error, isMutating, trigger } = useSWRMutation(
    url,
    fetcher
  );

  return {
    data,
    error,
    isLoading: isMutating,
    refetch: () => trigger()
  };
}
```

#### 特徴
- ✅ **手動トリガー**: キャッシュを完全回避
- ✅ **SWRの思想に適合**: 公式APIの正しい使用
- ✅ **シンプル**: 理解しやすい実装
- ❌ **自動実行なし**: 初回も手動トリガーが必要

### 2. 動的キー（採用したアプローチ）

#### 概要
SWRキーを動的に変更することで、毎回新しいキャッシュエントリを作成し、実質的にキャッシュを無効化。

#### 実装例
```typescript
import useSWR from 'swr';
import { useCallback, useState } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useNonCachedRequest(url: string) {
  const [cacheBypassCounter, setCacheBypassCounter] = useState(0);
  
  const { data, error, isLoading } = useSWR(
    url && cacheBypassCounter > 0 ? [url, cacheBypassCounter] : null,
    ([url]) => fetcher(url)
  );

  const refetch = useCallback(() => {
    setCacheBypassCounter(prev => prev + 1);
  }, []);

  return { 
    data, 
    error, 
    isLoading, 
    refetch,
    requestCount: cacheBypassCounter
  };
}
```

#### 特徴
- ✅ **useSWR活用**: 標準APIを使用
- ✅ **柔軟性**: 初回実行の制御が可能
- ✅ **カウンター機能**: 実行回数の追跡ができる
- ⚠️ **メモリ使用量**: 各リクエストがキャッシュに残る

### 3. 全オプション無効化（部分的解決）

#### 概要
SWRの自動再検証機能をすべて無効化する方法。完全なキャッシュ無効化ではない。

#### 実装例
```typescript
import useSWR from 'swr';

export function useNonCachedRequest(url: string) {
  return useSWR(url, fetcher, {
    dedupingInterval: 0,          // 重複排除無効
    revalidateOnFocus: false,     // フォーカス時無効
    revalidateOnReconnect: false, // 再接続時無効  
    revalidateIfStale: false,     // 古いデータ時の再検証無効
    refreshInterval: 0,           // 定期更新無効
  });
}
```

#### 特徴
- ✅ **設定のみ**: 追加のロジック不要
- ❌ **部分的**: キャッシュは残る
- ❌ **制限あり**: 完全なキャッシュ無効化ではない

### 4. カスタムキャッシュプロバイダー（上級者向け）

#### 概要
SWRConfig でカスタムキャッシュプロバイダーを提供し、キャッシュ動作を制御。

#### 実装例
```typescript
import { SWRConfig } from 'swr';

const noCacheProvider = () => {
  const map = new Map();
  return {
    get: () => undefined, // 常に未定義を返す
    set: () => {},        // 何も保存しない
    delete: () => {},
    keys: () => []
  };
};

// 使用例
<SWRConfig value={{ provider: noCacheProvider }}>
  <NonCachedComponent />
</SWRConfig>
```

#### 特徴
- ✅ **完全無効化**: キャッシュが一切機能しない
- ❌ **複雑**: 実装が複雑
- ❌ **SWRの利点喪失**: キャッシュの恩恵を受けられない

## アプローチ比較表

| アプローチ | 実装難易度 | 完全性 | SWR思想適合 | 推奨度 |
|-----------|-----------|-------|------------|--------|
| useSWRMutation | 低 | ★★★ | ★★★ | ★★★ |
| 動的キー | 低 | ★★☆ | ★★★ | ★★★ |
| オプション無効化 | 低 | ★☆☆ | ★★☆ | ★☆☆ |
| カスタムプロバイダー | 高 | ★★★ | ★☆☆ | ★☆☆ |

## 実装時の考慮事項

### メモリ管理
- 動的キーアプローチでは、各リクエストがキャッシュに蓄積される
- 長時間の運用では適切なクリーンアップが必要

### パフォーマンス
- キャッシュなしリクエストは本来のSWRの恩恵（高速化）を放棄する
- 必要な場面でのみ使用することを推奨

### ユーザビリティ
- ローディング状態の適切な表示
- エラーハンドリングの実装
- リクエスト回数の可視化

## 推奨事項

### 一般的なケース
**動的キーアプローチ**を推奨
- SWRの標準APIを活用
- 実装が簡潔
- デバッグしやすい

### 特殊なケース
**useSWRMutation**を推奨
- より明示的なAPIが必要な場合
- ミューテーション的な操作の場合
- SWR 2.0の機能を活用したい場合

## 結論

SWRでキャッシュなしリクエストを実現する方法は複数存在するが、それぞれに特徴がある。本プロジェクトでは**動的キーアプローチ**を採用し、教育的価値を重視してSWRの標準APIを活用した実装を選択した。

実際のプロダクションでは、要件や制約に応じて最適なアプローチを選択することが重要である。

---

**調査日**: 2025年1月21日  
**調査者**: Claude Code  
**プロジェクト**: SWR Cache Comparison Sample