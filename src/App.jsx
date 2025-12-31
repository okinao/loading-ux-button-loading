import React, { useState } from 'react';

// シンプルなスピナーアイコン
const Spinner = ({ size = 18 }) => (
  <svg
    className="animate-spin"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// ローディングボタンコンポーネント
const SubmitButton = ({ isLoading, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium min-w-[140px] justify-center"
    >
      {isLoading ? (
        <>
          <Spinner size={18} />
          送信中...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [clickCount, setClickCount] = useState(0);

  const handleSubmit = async () => {
    setIsLoading(true);
    setResult(null);
    setClickCount(0);

    // 送信処理をシミュレート（2秒）
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    setResult('送信完了しました！');
  };

  // disabled中のクリックをカウント（ユーザーがどれだけクリックしたか）
  const handleDisabledClick = () => {
    if (isLoading) {
      setClickCount(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            ボタン内ローディング デモ
          </h1>
          <p className="text-slate-600">
            連打（二重送信）を防止しつつ処理中であることを伝える
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                お名前
              </label>
              <input
                type="text"
                placeholder="山田太郎"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                メールアドレス
              </label>
              <input
                type="email"
                placeholder="example@example.com"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div onClick={handleDisabledClick}>
            <SubmitButton isLoading={isLoading} onClick={handleSubmit}>
              送信する
            </SubmitButton>
          </div>

          {/* 結果表示 */}
          {result && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              ✓ {result}
            </div>
          )}

          {/* 連打カウンター */}
          {clickCount > 0 && (
            
          )}
        </div>
      </div>
    </div>
  );
}
