import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full bg-white shadow-sm flex justify-center">
        <div className="w-full max-w-3xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-2xl font-bold text-gray-800">Money Map</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              대시보드
            </button>
            <button className="text-gray-600 hover:text-gray-900">통계</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
              + 새 기록
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full flex justify-center py-8">
        <div className="w-full max-w-3xl px-4 flex flex-col items-center">
          {children}
        </div>
      </main>

      <footer className="w-full bg-white border-t mt-auto flex justify-center">
        <div className="w-full max-w-3xl px-4 py-4 flex justify-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Money Map
          </p>
        </div>
      </footer>
    </div>
  );
}
