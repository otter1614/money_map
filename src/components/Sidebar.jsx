// src/components/Sidebar.jsx 왼쪽사이드바 파트
import React from "react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-dot"></span>
        <span className="logo-text">myMoneyMap</span>
      </div>

      <nav className="sidebar-menu">
        <a href="#dashboard" className="menu-item active">
          대시보드
        </a>
        <a href="#income" className="menu-item">
          수입/지출 입력
        </a>
        <a href="#analysis" className="menu-item">
          시각화 대시보드
        </a>
        <a href="#data" className="menu-item">
          데이터 관리
        </a>
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-version">v0.1 • 팀 프로젝트</p>
      </div>
    </aside>
  );
}

export default Sidebar;
