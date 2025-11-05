
import React, { useState } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import AddUser from "./components/AddUser";
import ResultTable from "./components/ResultTable";

function App() {
  const [keyword, setKeyword] = useState("");
  const [newUser, setNewUser] = useState(null);
  const [tab, setTab] = useState("list"); // 'list' | 'add'

  const handleAdd = (user) => {
    // receive user from AddUser; forward to ResultTable by state
    setNewUser(user);
    setTab("list"); // auto chuyển về danh sách để thấy kết quả
  };

  return (
    <div className="app-container">
      <header>
        <h1>Quản lý người dùng</h1>
        <nav className="tabs">
          <button className={tab === "list" ? "active" : ""} onClick={() => setTab("list")}>
            Danh sách
          </button>
          <button className={tab === "add" ? "active" : ""} onClick={() => setTab("add")}>
            Thêm người
          </button>
        </nav>
      </header>

      <main>
        {tab === "list" && (
          <>
            <div style={{ marginBottom: 12 }}>
              <SearchForm onchangeValue={setKeyword} />
            </div>
            <ResultTable keyword={keyword} user={newUser} onAdded={() => setNewUser(null)} />
          </>
        )}

        {tab === "add" && (
          <div>
            {/* AddUser có modal nội tại — vẫn gọi để test form */}
            <AddUser onAdd={handleAdd} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
// ...existing code...