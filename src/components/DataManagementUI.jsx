import React from "react";
import Papa from "papaparse";
import { CSVLink } from "react-csv";
import "../styles/DataManagementUI.css";

const CSV_HEADERS = [
  { label: "ID", key: "id" },
  { label: "항목", key: "item" },
  { label: "금액", key: "amount" },
];

const STORAGE_KEY = "my-transaction-data";

export default function DataManagementUI() {
  const [data, setData] = useLocalStorage(STORAGE_KEY, []);

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const importedData = results.data.map((row) => ({
          ...row,
          amount: parseFloat(row.amount) || 0,
          id: row.id || crypto.randomUUID(),
        }));
        setData(importedData);
      },
    });

    event.target.value = null;
  };

  const handleReset = () => {
    if (window.confirm("모든 데이터를 초기화하시겠습니까?")) {
      setData([]);
    }
  };

  return (
    <div className="data-management-wrapper">
      <h2>데이터 관리</h2>

      <div className="button-group">
        <CSVLink
          className="btn btn-export"
          data={data}
          headers={CSV_HEADERS}
          filename="toss-data.csv"
        >
          CSV 내보내기
        </CSVLink>

        <label htmlFor="csv-import" className="btn btn-import">
          CSV 가져오기
          <input
            id="csv-import"
            className="hidden-input"
            type="file"
            accept=".csv"
            onChange={handleImport}
          />
        </label>
      </div>

      <button className="btn btn-danger" onClick={handleReset}>
        전체 데이터 초기화
      </button>

      <h3 style={{ marginTop: "20px" }}>현재 데이터 (로컬 저장소)</h3>
      <div className="data-display">
        {data.length > 0 ? JSON.stringify(data, null, 2) : "데이터가 없습니다."}
      </div>
    </div>
  );
}
