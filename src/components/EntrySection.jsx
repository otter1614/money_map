// src/components/EntrySection.jsx >> 수입/지출 입력 + 로컬스토리지 + 반복 수입/지출 + 테이블 파트 
import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY_INCOME = "mytoss_income_entries";
const STORAGE_KEY_EXPENSE = "mytoss_expense_entries";

const chipPresets = [
  {
    label: "월급 · 2,500,000원",
    date: "2025-03-25",
    amount: 2500000,
    source: "직장",
    memo: "3월 급여",
  },
  {
    label: "배당금 · 150,000원",
    date: "2025-03-20",
    amount: 150000,
    source: "투자",
    memo: "배당금",
  },
  {
    label: "부업 · 300,000원",
    date: "2025-03-18",
    amount: 300000,
    source: "부업",
    memo: "부업 수입",
  },
];

// 금액 포맷터 (음수/양수 모두 처리)
function formatAmount(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return "0원";
  const abs = Math.abs(num).toLocaleString("ko-KR");
  return num < 0 ? `-${abs}원` : `${abs}원`;
}

// Date → "YYYY-MM-DD"
function formatDate(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// "반복 없음" / "매월" / "매주" / "매일" → 내부 코드
function normalizeRepeatType(value) {
  if (!value || value === "반복 없음") return "none";
  if (value === "매월") return "month";
  if (value === "매주") return "week";
  if (value === "매일") return "day";
  return "none";
}

// 반복 수에 따라 여러 날짜 생성
function generateRepeatDates(baseDateStr, rawRepeatType, repeatCount) {
  const dates = [];
  if (!baseDateStr) return dates;

  const baseDate = new Date(baseDateStr);
  const repeatType = normalizeRepeatType(rawRepeatType);

  dates.push(baseDateStr); // 기본 1개

  const countNum = Number(repeatCount);
  if (repeatType === "none" || !countNum || countNum <= 1) {
    return dates;
  }

  for (let i = 1; i < countNum; i++) {
    const d = new Date(baseDate);
    if (repeatType === "month") {
      d.setMonth(d.getMonth() + i);
    } else if (repeatType === "week") {
      d.setDate(d.getDate() + 7 * i);
    } else if (repeatType === "day") {
      d.setDate(d.getDate() + i);
    }
    dates.push(formatDate(d));
  }

  return dates;
}

function EntrySection() {
  // 폼 모드: "income" | "expense"
  const [mode, setMode] = useState("income");

  // 폼 입력 값 상태
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("직장");
  const [memo, setMemo] = useState("");

  const [repeatType, setRepeatType] = useState("반복 없음");
  const [repeatCount, setRepeatCount] = useState("");

  // 수입/지출 리스트
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [expenseEntries, setExpenseEntries] = useState([]);

  // 초기 로딩: localStorage → state
  useEffect(() => {
    try {
      const incomeRaw = localStorage.getItem(STORAGE_KEY_INCOME);
      const expenseRaw = localStorage.getItem(STORAGE_KEY_EXPENSE);
      setIncomeEntries(incomeRaw ? JSON.parse(incomeRaw) : []);
      setExpenseEntries(expenseRaw ? JSON.parse(expenseRaw) : []);
    } catch (e) {
      console.warn("로컬스토리지 파싱 중 오류:", e);
      setIncomeEntries([]);
      setExpenseEntries([]);
    }
  }, []);

  // state 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_INCOME, JSON.stringify(incomeEntries));
    localStorage.setItem(STORAGE_KEY_EXPENSE, JSON.stringify(expenseEntries));
  }, [incomeEntries, expenseEntries]);

  // 수입/지출 합친 테이블용 리스트 (날짜 오름차순)
  const mergedEntries = useMemo(() => {
    const merged = [
      ...incomeEntries.map((e) => ({ ...e, type: "income" })),
      ...expenseEntries.map((e) => ({ ...e, type: "expense" })),
    ];
    merged.sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });
    return merged;
  }, [incomeEntries, expenseEntries]);

  // 저장 버튼 핸들러
  const handleSave = () => {
    if (!date || !amount || !source) {
      const label =
        mode === "income"
          ? "수입의 날짜, 금액, 수입원"
          : "지출의 날짜, 금액, 지출원";
      alert(`${label}을(를) 모두 입력해주세요.`);
      return;
    }

    const numericAmount = Number(amount);
    if (Number.isNaN(numericAmount) || numericAmount === 0) {
      alert("금액은 0이 아닌 숫자로 입력해주세요.");
      return;
    }

    // 사용자가 -를 붙여도 모드에 맞게 자동 처리
    const absAmount = Math.abs(numericAmount);
    const finalAmount = mode === "income" ? absAmount : -absAmount;

    const dates = generateRepeatDates(date, repeatType, repeatCount || "1");

    const newEntries = dates.map((d) => ({
      date: d,
      source,
      amount: finalAmount,
      memo,
    }));

    if (mode === "income") {
      setIncomeEntries((prev) => [...prev, ...newEntries]);
    } else {
      setExpenseEntries((prev) => [...prev, ...newEntries]);
    }

    // 폼 일부 리셋 (날짜/수입원은 그대로 두고 금액/메모/반복만 리셋)
    setAmount("");
    setMemo("");
    setRepeatCount("");
    setRepeatType("반복 없음");
  };

  // 수입/지출 토글 버튼
  const handleToggleMode = () => {
    setMode((prev) => (prev === "income" ? "expense" : "income"));
  };

  // 최근 입력 칩 클릭 시, 폼 채우기
  const handleChipClick = (preset) => {
    setDate(preset.date);
    setAmount(String(preset.amount));
    setSource(preset.source);
    setMemo(preset.memo);
  };

  // 필터 초기화 (지금은 UI만 비우는 더미 기능)
  const handleFilterReset = () => {
    const inputs = document.querySelectorAll(
      ".filter-bar input, .filter-bar select"
    );
    inputs.forEach((el) => {
      if (el.tagName === "SELECT") {
        el.value = "";
      } else {
        el.value = "";
      }
    });
  };

  const isIncomeMode = mode === "income";

  return (
    <section id="income" className="section section-income">
      <div className="section-header">
        <h2>수입/지출 입력</h2>
        <p>날짜, 금액, 수입/지출원, 메모를 기록하고 반복 수입/지출도 설정해보세요</p>
      </div>

      <div className="income-layout">
        {/* 왼쪽: 수입/지출 입력 폼 */}
        <div className="income-form card">
          <div className="form-header-row">
            <h3 className="card-title" id="entry-form-title">
              {isIncomeMode ? "수입 입력 폼" : "지출 입력 폼"}
            </h3>
            <button
              type="button"
              className="mode-toggle-btn"
              id="entry-mode-toggle"
              onClick={handleToggleMode}
            >
              수입/지출
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="income-date">날짜</label>
            <input
              id="income-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="income-amount">금액</label>
            <input
              id="income-amount"
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="income-source" id="source-label">
              {isIncomeMode ? "수입원" : "지출원"}
            </label>
            <select
              id="income-source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            >
              <option>직장</option>
              <option>투자</option>
              <option>부업</option>
              <option>용돈</option>
              <option>기타</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="income-memo">메모</label>
            <textarea
              id="income-memo"
              rows={2}
              placeholder="예: 3월 급여, 배당금 등"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            ></textarea>
          </div>

          {/* 반복 수입/지출 설정 */}
          <div className="repeat-box">
            <div className="repeat-header">
              <span className="repeat-title" id="repeat-title">
                {isIncomeMode ? "반복 수입 설정" : "반복 지출 설정"}
              </span>
              <span className="repeat-helper">
                예: 월급/정기 지출 자동 생성
              </span>
            </div>
            <div className="form-group-inline">
              <select
                id="repeat-type"
                value={repeatType}
                onChange={(e) => setRepeatType(e.target.value)}
              >
                <option>반복 없음</option>
                <option>매월</option>
                <option>매주</option>
                <option>매일</option>
              </select>
              <input
                id="repeat-count"
                type="number"
                placeholder="반복 기간(개월/주)"
                value={repeatCount}
                onChange={(e) => setRepeatCount(e.target.value)}
              />
            </div>
          </div>

          {/* 최근 입력 추천 */}
          <div className="recent-suggestions">
            <p className="recent-title">최근 입력 추천</p>
            <div className="chip-row">
              {chipPresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  className="chip"
                  onClick={() => handleChipClick(preset)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <p className="recent-helper">
              입력한 데이터를 기록하여 더욱 더 심도있는 정보를 제공하고 있습니다
            </p>
          </div>

          <button
            className="primary-btn"
            id="save-income-btn"
            type="button"
            onClick={handleSave}
          >
            {isIncomeMode ? "수입 저장하기" : "지출 저장하기"}
          </button>
        </div>

        {/* 오른쪽: 수입/지출 내역 대시보드 */}
        <div className="income-dashboard card">
          <div className="card-header-row">
            <div className="card-header-text">
              <h3 className="card-title">수입/지출 내역 대시보드</h3>
              <p className="card-desc">
                수입/지출원에서 저장한 수입/지출 내역이 리스트나 테이블 형태로 제공됩니다
              </p>
            </div>
            <button
              type="button"
              className="filter-reset-btn"
              onClick={handleFilterReset}
            >
              필터 초기화
            </button>
          </div>

          {/* 필터 영역 (지금은 모양만, 실제 필터 로직은 팀원 구현용) */}
          <div className="filter-bar">
            <div className="filter-grid">
              <div className="filter-group">
                <label>기간</label>
                <div className="filter-inline filter-inline--dates">
                  <input type="date" />
                  <span className="filter-separator">~</span>
                  <input type="date" />
                </div>
              </div>

              <div className="filter-group">
                <label>수입/지출원</label>
                <select>
                  <option value="">전체</option>
                  <option>직장</option>
                  <option>투자</option>
                  <option>부업</option>
                  <option>용돈</option>
                  <option>기타</option>
                </select>
              </div>

              <div className="filter-group">
                <label>금액 범위</label>
                <div className="filter-inline filter-inline--amount">
                  <input
                    type="number"
                    placeholder="최소"
                    max={1000000000}
                  />
                  <span className="filter-separator">~</span>
                  <input
                    type="number"
                    placeholder="최대"
                    max={1000000000}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 수입/지출 내역 테이블 */}
          <div className="table-wrapper">
            <table className="income-table">
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>수입/지출원</th>
                  <th>금액</th>
                  <th>메모</th>
                </tr>
              </thead>
              <tbody id="income-table-body">
                {mergedEntries.length === 0 ? (
                  <tr className="empty-row">
                    <td colSpan={4}>아직 입력된 내역이 없습니다.</td>
                  </tr>
                ) : (
                  mergedEntries.map((entry, idx) => (
                    <tr key={idx}>
                      <td>{entry.date || "-"}</td>
                      <td>{entry.source || "-"}</td>
                      <td>{formatAmount(entry.amount || 0)}</td>
                      <td>{entry.memo || ""}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EntrySection;
