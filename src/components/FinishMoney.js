import React, { useState } from "react";
import styled from "styled-components";

function FinishMoney() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* 목표 금액 컴포넌트 */}
      <Car
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
      </Car>
    </div>
  );
}

export default FinishMoney;
