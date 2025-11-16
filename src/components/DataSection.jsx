// src/components/DataSection.jsx >> 데이터 관리 파트
import React from "react";

function DataSection() {
  return (
    <section id="data" className="section">
      <div className="section-header">
        <h2>데이터 관리</h2>
        <p>
          CSV 내보내기/가져오기, 전체 초기화, 로컬 저장소 기반 데이터 유지
          기능을 위한 UI 영역입니다
        </p>
      </div>

      <div className="card data-card">
        <h3 className="card-title">데이터 관리 도구</h3>
        <p className="card-desc">
          실제 동작은 JavaScript 및 로컬 저장소(LocalStorage) 또는 IndexedDB와
          연동하여 구현할 수 있습니다
        </p>

        <div className="data-actions">
          <button type="button" className="secondary-btn">
            CSV 내보내기
          </button>
          <button type="button" className="secondary-btn">
            CSV 가져오기
          </button>
          <button type="button" className="danger-btn">
            전체 데이터 초기화
          </button>
        </div>

        <div className="data-notice">
          <p>
            · 로컬 저장소 기반으로 데이터 유지 시, 브라우저를 닫아도 동일한
            PC/브라우저에서는 기록이 유지됩니다
          </p>
          <p>
            · 다른 기기/브라우저와 동기화가 필요하다면, 추후 백엔드 서버 또는
            계정 시스템이 추가될 수 있습니다
          </p>
        </div>
      </div>
    </section>
  );
}

export default DataSection;
