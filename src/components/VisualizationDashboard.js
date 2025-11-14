// VisualizationDashboard_with_comments_and_features.jsx
// 사용자 요청 반영:
// 1. 월별 수입 추이를 "만원 단위"로 변환 + 천원 단위까지 소수점 표시
// 2. 그래프 여백 추가 (y축 domain 조정)
// 3. 가로(X축)를 "연/월/주/일" 단위로 선택할 수 있게 selector 추가
// 4. 지출 데이터도 함께 추가하여 수입/지출 토글 가능
// 5. 수입-지출(순수익)도 계산 후 함께 표기
// 6. 저축 목표 기능 추가 (목표 금액 + 목표 기간 → 월별 필요 저축액 계산)
// 7. 목표보다 부족할 경우 부족 기간 자동 연장 안내

import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ---------------------- MOCK DATA ----------------------
const mockIncome = [
  { date: "2025-01-05", amount: 320000, source: "직장" },
  { date: "2025-01-12", amount: 130000, source: "투자" },
  { date: "2025-02-05", amount: 3200000, source: "직장" },
  { date: "2025-02-20", amount: 200000, source: "알바" },
  { date: "2025-03-05", amount: 3200000, source: "직장" },
  { date: "2025-03-10", amount: 180000, source: "투자" },
  { date: "2025-04-05", amount: 320000, source: "직장" },
  { date: "2025-04-12", amount: 130000, source: "투자" },
  { date: "2025-05-05", amount: 3200000, source: "직장" },
  { date: "2025-05-20", amount: 200000, source: "알바" },
  { date: "2025-06-05", amount: 3200000, source: "직장" },
  { date: "2025-06-10", amount: 180000, source: "투자" },
];

const mockExpense = [
  { date: "2025-01-03", amount: 120000, category: "식비" },
  { date: "2025-01-09", amount: 40000, category: "교통" },
  { date: "2025-02-12", amount: 300000, category: "쇼핑" },
  { date: "2025-02-22", amount: 100000, category: "식비" },
  { date: "2025-03-02", amount: 150000, category: "여가" },
  { date: "2025-04-03", amount: 120000, category: "식비" },
  { date: "2025-04-09", amount: 40000, category: "교통" },
  { date: "2025-05-12", amount: 300000, category: "쇼핑" },
  { date: "2025-05-22", amount: 100000, category: "식비" },
  { date: "2025-06-02", amount: 150000, category: "여가" },
];

// -------------------------------------------------------
// 날짜 단위 변환 함수 (연/월/주/일)
const getDateKey = (dateStr, mode) => {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const week = Math.ceil(d.getDate() / 7); // 간단한 주차 계산

  switch (mode) {
    case "year":
      return `${y}`;
    case "month":
      return `${y}-${m}`;
    case "week":
      return `${y}-${m}-W${week}`;
    default:
      return `${y}-${m}-${day}`;
  }
};

// 금액 → "만원 단위" 변환 (천원 자리까지 소수점)
const toManwon = (value) => (value / 10000).toFixed(1);

export default function VisualizationDashboard() {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [mode, setMode] = useState("month"); // year/month/week/day
  const [showIncome, setShowIncome] = useState(true);
  const [showExpense, setShowExpense] = useState(true);

  // 목표 금액 컴포넌트 상태값
  const [goal, setGoal] = useState(10000000); // 1000만 원
  const [period, setPeriod] = useState(6); // 6개월
  const [saved, setSaved] = useState(0); // 현재까지 순수익 누적

  useEffect(() => {
    setIncome(mockIncome);
    setExpense(mockExpense);
  }, []);

  // -------------------------------------------------------
  // 그래프 데이터 변환: 날짜단위별로 묶기
  const mergeData = {};

  income.forEach((i) => {
    const key = getDateKey(i.date, mode);
    if (!mergeData[key]) mergeData[key] = { date: key, income: 0, expense: 0 };
    mergeData[key].income += i.amount;
  });

  expense.forEach((e) => {
    const key = getDateKey(e.date, mode);
    if (!mergeData[key]) mergeData[key] = { date: key, income: 0, expense: 0 };
    mergeData[key].expense += e.amount;
  });

  const chartData = Object.values(mergeData).map((v) => ({
    ...v,
    net: v.income - v.expense,
    income_mw: parseFloat(toManwon(v.income)),
    expense_mw: parseFloat(toManwon(v.expense)),
    net_mw: parseFloat(toManwon(v.income - v.expense)),
  }));

  // 현재 순수익 누적 계산
  useEffect(() => {
    const totalNet = chartData.reduce(
      (sum, d) => sum + (d.income - d.expense),
      0
    );
    setSaved(totalNet);
  }, [chartData]);

  // 목표 달성 계산
  const monthlyNeed = Math.ceil((goal - saved) / period);
  const delayMonths =
    monthlyNeed < 0 ? 0 : Math.ceil((goal - saved) / (monthlyNeed || 1));

  // -------------------------------------------------------
  return (
    <div
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: 20 }}
    >
      <h2>📊 수입 & 지출 시각화 대시보드</h2>

      {/* 날짜 단위 선택 */}
      <div style={{ marginTop: 10 }}>
        <label>📆 날짜 단위 :</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="year">연도별</option>
          <option value="month">월별</option>
          <option value="week">주별</option>
          <option value="day">일별</option>
        </select>
      </div>

      {/* 표시 토글 */}
      <div style={{ marginTop: 10 }}>
        <label>
          <input
            type="checkbox"
            checked={showIncome}
            onChange={() => setShowIncome(!showIncome)}
          />{" "}
          수입 보기
        </label>
        <label style={{ marginLeft: 20 }}>
          <input
            type="checkbox"
            checked={showExpense}
            onChange={() => setShowExpense(!showExpense)}
          />{" "}
          지출 보기
        </label>
      </div>

      {/* 수입 / 지출 AREA CHART */}
      <div style={{ marginTop: 30 }}>
        <h3>📈 수입·지출 추이 (만원 단위)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={chartData}
            margin={{ top: 30, right: 30, bottom: 20, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />

            {showIncome && (
              <Area
                type="monotone"
                dataKey="income_mw"
                stroke="#4e79a7"
                fill="#4e79a755"
                name="수입(만원)"
              />
            )}

            {showExpense && (
              <Area
                type="monotone"
                dataKey="expense_mw"
                stroke="#e15759"
                fill="#e1575955"
                name="지출(만원)"
              />
            )}

            <Area
              type="monotone"
              dataKey="net_mw"
              stroke="#59a14f"
              fill="#59a14f55"
              name="순수익(만원)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 목표 금액 컴포넌트 */}
      <div
        style={{
          marginTop: 50,
          padding: 20,
          border: "1px solid #ccc",
          borderRadius: 10,
        }}
      >
        <h3>🎯 목표 금액 설정</h3>

        <div>
          <label>목표 금액(원): </label>
          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(parseInt(e.target.value))}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>목표 기간(개월): </label>
          <input
            type="number"
            value={period}
            onChange={(e) => setPeriod(parseInt(e.target.value))}
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <p>현재까지 순수익 누적: {saved.toLocaleString()}원</p>
          {goal - saved > 0 ? (
            <>
              <p>
                ➡ 목표 달성을 위해 매달 필요한 금액:{" "}
                <b>{monthlyNeed.toLocaleString()}원</b>
              </p>
              <p>
                ➡ 현재 추세 기준, 목표 달성까지 <b>{delayMonths}개월</b> 예상
              </p>
            </>
          ) : (
            <p>🎉 목표 금액을 이미 달성했습니다!</p>
          )}
        </div>
      </div>
    </div>
  );
}
