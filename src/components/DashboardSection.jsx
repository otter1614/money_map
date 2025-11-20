// src/components/DashboardSection.jsx
import React, { useMemo } from "react";

function DashboardSection({ chartData, goal }) {
  // 오늘 날짜 기준 "YYYY-MM"
  const now = new Date();
  const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}`;

  // 📌 이번 달 데이터만 필터링
  const thisMonthData = useMemo(
    () => chartData.filter((d) => d.date.startsWith(ym)),
    [chartData]
  );

  // 📌 총 수입/지출/순수익 계산
  const totalIncome = thisMonthData.reduce(
    (sum, d) => sum + (d.income ?? 0),
    0
  );
  const totalExpense = thisMonthData.reduce(
    (sum, d) => sum + (d.expense ?? 0),
    0
  );
  const totalNet = totalIncome - totalExpense;

  // 📌 목표 대비 남은 금액
  const remaining =
    goal - (chartData.reduce((sum, d) => sum + (d.income - d.expense), 0) || 0);

  return (
    <section id="dashboard" className="section section-dashboard">
      <div className="section-header">
        <h2>요약 대시보드</h2>
        <p>이번 달 현황과 주요 지표를 한눈에 볼 수 있는 영역입니다</p>
      </div>

      <div className="dashboard-grid">
        {/* ----------------- 총 수입 ----------------- */}
        <div className="card">
          <p className="card-label">이번 달 총 수입</p>
          <p className="card-value">{totalIncome.toLocaleString()}원</p>
          <p className="card-desc">
            이번 달에는 총 <strong>{totalIncome.toLocaleString()}원</strong>을
            벌었어요
          </p>
        </div>

        {/* ----------------- 총 지출 ----------------- */}
        <div className="card">
          <p className="card-label">이번 달 총 지출</p>
          <p className="card-value">{totalExpense.toLocaleString()}원</p>
          <p className="card-desc">
            이번 달에는 총 <strong>{totalExpense.toLocaleString()}원</strong>을
            사용했어요
          </p>
        </div>

        {/* ----------------- 목표 금액 ----------------- */}
        <div className="card">
          <p className="card-label">남은 목표 금액</p>
          <p className="card-value">
            {remaining > 0 ? remaining.toLocaleString() : 0}원
          </p>
          <p className="card-desc">
            목표까지{" "}
            <strong>
              {remaining > 0
                ? `${remaining.toLocaleString()}원 남았어요`
                : "모든 목표를 달성했어요!"}
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}

export default DashboardSection;
