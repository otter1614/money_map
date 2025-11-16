// src/components/Topbar.jsx >> 화면 윗단 1억 가자 파트
import React from "react";

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="page-title">1억 가자!</h1>
        <p className="page-subtitle">
          가계부를 작성하여 수입·지출·분석·데이터를 한 번에 관리해보세요
        </p>
      </div>
    </header>
  );
}

export default Topbar;
