// src/components/DataSection.jsx
import React, { useEffect, useState } from "react";
import PouchDB from "pouchdb-browser";
import Papa from "papaparse";

const dbName = "finance_db";

function DataSection() {
  const [data, setData] = useState([]);
  const db = new PouchDB(dbName);

  /** -----------------------------------
   * 📥 DB 전체 문서 로딩
   * ---------------------------------- */
  const loadAllData = async () => {
    const result = await db.allDocs({ include_docs: true });
    const docs = result.rows.map((r) => r.doc);
    setData(docs);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  /** -----------------------------------
   * 📤 CSV 내보내기
   * ---------------------------------- */
  const handleExport = async () => {
    const csv = Papa.unparse(
      data.map((doc) => ({
        id: doc._id,
        type: doc.type,
        date: doc.date,
        source: doc.source,
        amount: doc.amount,
        memo: doc.memo,
      }))
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "financial_data.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  /** -----------------------------------
   * 📥 CSV 가져오기 (PouchDB 저장)
   * ---------------------------------- */
  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const imported = results.data.map((row) => ({
          _id:
            row.id ||
            `entry-${row.date}-${Date.now()}-${Math.random()
              .toString(36)
              .substring(2, 6)}`,
          type: row.type || "income",
          date: row.date,
          source: row.source,
          amount: parseFloat(row.amount) || 0,
          memo: row.memo || "",
        }));

        for (const item of imported) {
          try {
            await db.put(item);
          } catch (err) {
            console.warn("이미 존재하는 문서 → 업데이트 시도:", item._id);
            const existing = await db.get(item._id);
            await db.put({ ...existing, ...item });
          }
        }

        await loadAllData();
      },
    });

    event.target.value = null;
  };

  /** -----------------------------------
   * 🗑 전체 초기화
   * ---------------------------------- */
  const handleReset = async () => {
    if (!window.confirm("정말 모든 데이터를 초기화하시겠습니까?")) return;

    await db.destroy();
    const newDB = new PouchDB(dbName);
    setData([]);
  };

  // ... 생략된 상단 코드 동일

  return (
    <section id="data" className="section">
      <div className="section-header">
        <h2>데이터 관리</h2>
        <p>CSV 내보내기/가져오기 및 전체 데이터 초기화를 관리할 수 있습니다</p>
      </div>

      <div className="card data-card">
        <h3 className="card-title">데이터 관리 도구</h3>
        <p className="card-desc">
          PouchDB 기반으로 데이터가 브라우저에 안전하게 저장됩니다.
        </p>

        <div className="data-actions">
          <button
            type="button"
            className="secondary-btn"
            onClick={handleExport}
          >
            CSV 내보내기
          </button>

          <label className="secondary-btn" style={{ cursor: "pointer" }}>
            CSV 가져오기
            <input
              type="file"
              accept=".csv"
              style={{ display: "none" }}
              onChange={handleImport}
            />
          </label>

          <button type="button" className="danger-btn" onClick={handleReset}>
            전체 데이터 초기화
          </button>
        </div>

        <div className="data-notice">
          <p>
            · 데이터는 PouchDB(IndexedDB)에 저장되므로 브라우저를 닫아도
            유지됩니다.
          </p>
          <p>
            · 서버 동기화가 필요하면 향후 CouchDB와 연동하여 확장 가능합니다.
          </p>
          <p style={{ fontSize: "13px", color: "#666" }}>
            (전체 항목은 CSV로 확인하세요)
          </p>
        </div>
      </div>
    </section>
  );
}

export default DataSection;
