// src/components/AnalysisSection.jsx >> 시각화 대시보드 파트
import React from "react";

function AnalysisSection() {
  return (
    <section id="analysis" className="section">
      <div className="section-header">
        <h2>시각화 대시보드</h2>
        <p>
          월별 추이, 수입원 비율, 요일별 집중도, 평균 수입 등을 시각화하는
          영역입니다
        </p>
      </div>

      <div className="chart-grid">
        <div className="card chart-card">
          <h3 className="card-title">월별 수입/지출 추이 (Line Chart)</h3>
          <p className="card-desc">
            라인 차트 라이브러리(e.g. Chart.js, D3 등)를 사용해 월별 수입 추이를
            표시하는 영역입니다
          </p>
          <div className="chart-placeholder">
            차트 영역 (캔버스 또는 SVG 삽입 예정)
          </div>
        </div>
        <div className="card chart-card">
          <h3 className="card-title">수입원별 비율 (Pie Chart)</h3>
          <p className="card-desc">
            수입원을 기준으로 비율을 파이 차트로 시각화하는 영역입니다
          </p>
          <div className="chart-placeholder">파이 차트 영역</div>
        </div>
      </div>

      <div className="chart-grid-wide">
        <div className="card chart-card">
          <h3 className="card-title">요일/날짜별 집중도 (Heatmap)</h3>
          <p className="card-desc">
            캘린더 형태 또는 Heatmap 형태로 수입이 집중되는 요일/날짜를 표현하는
            영역입니다
          </p>
          <div className="chart-placeholder">히트맵 차트 영역</div>
        </div>
        <div className="card summary-card">
          <h3 className="card-title">요약 지표</h3>
          <ul className="summary-list">
            <li>
              <span>평균 수입</span>
              <strong>0원</strong>
            </li>
            <li>
              <span>전월 대비 증감률</span>
              <strong>0%</strong>
            </li>
            <li>
              <span>올해 누적 수입</span>
              <strong>0원</strong>
            </li>
          </ul>
          <p className="summary-helper">
            해당 데이터 외에도, 다양한 의견을 받아 추후 더욱 더 많은 정보를
            제공할 예정입니다
          </p>
        </div>
      </div>
    </section>
  );
}

export default AnalysisSection;
