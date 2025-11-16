// src/components/DashboardSection.jsx >> 요약 대시보드 파트 
import React from "react";

function DashboardSection() {
  return (
    <section id="dashboard" className="section section-dashboard">
      <div className="section-header">
        <h2>요약 대시보드</h2>
        <p>이번 달 현황과 주요 지표를 한눈에 볼 수 있는 영역입니다</p>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <p className="card-label">이번 달 총 수입</p>
          <p className="card-value">0원</p>
          <p className="card-desc">
            다른 팀원이 구현 예정(저번 달보다 ?원 벌었어요)
          </p>
        </div>
        <div className="card">
          <p className="card-label">이번 달 총 지출</p>
          <p className="card-value">0원</p>
          <p className="card-desc">
            다른 팀원이 구현 예정(저번 달보다 ?원 많이썼어요)
          </p>
        </div>
        <div className="card">
          <p className="card-label">목표 금액</p>
          <p className="card-value">100,000,000원</p>
          <p className="card-desc">
            다른 팀원이 구현 예정(목표 금액까지 ?원 남았어요)
          </p>
        </div>
      </div>
    </section>
  );
}

export default DashboardSection;
