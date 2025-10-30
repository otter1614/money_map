import React, { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import Modal from "./components/Modal";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <Layout>
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          중앙 모달 데모
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          무신사 스타일의 중앙 상단 바가 있는 모달 예제입니다.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
          >
            모달 열기
          </button>

          <button
            onClick={() => alert("다른 액션")}
            className="px-6 py-2.5 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 font-medium"
          >
            다른 액션
          </button>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="모달 제목">
        <p className="text-gray-700">
          여기에 모달 내용을 넣으세요. 텍스트, 이미지, 폼 등 모두 포함할 수
          있습니다.
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            닫기
          </button>
        </div>
      </Modal>
    </Layout>
  );
}

export default App;
