// ...existing code...
import React, { useState } from "react";
import styles from "./Modal.module.css";

function AddUser({ onAdd }) {
  const [adding, setAdding] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    phone: "",
    website: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (["street", "suite", "city"].includes(id)) {
      // cập nhật nested state đúng cách
      setUser((prev) => ({ ...prev, address: { ...prev.address, [id]: value } }));
    } else {
      setUser((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.name.trim() || !user.username.trim()) {
      alert("Vui lòng nhập Name và Username!");
      return;
    }
    // gửi lên parent; parent (App) sẽ gán id nếu cần
    onAdd && typeof onAdd === "function" && onAdd({ ...user });
    // reset form
    setUser({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
      phone: "",
      website: "",
    });
    setAdding(false);
  };

  const closeModal = (e) => {
    // click ngoài modal để đóng
    if (e.target === e.currentTarget) setAdding(false);
  };

  return (
    <>
      {/* khi chưa mở modal chỉ hiển thị nút */}
      {!adding && (
        <button type="button" onClick={() => setAdding(true)}>
          Thêm
        </button>
      )}

      {/* modal chỉ render khi đang thêm */}
      {adding && (
        <div className={styles["modal-overlay"]} onClick={closeModal}>
          <div className={styles["modal-content"]} role="dialog" aria-modal="true">
            <form onSubmit={handleSubmit} style={{ marginTop: 8 }}>
              <h4>Thêm người dùng</h4>

              <div>
                <label htmlFor="name">Name: </label>
                <input id="name" type="text" value={user.name} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="username">Username: </label>
                <input id="username" type="text" value={user.username} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="email">Email: </label>
                <input id="email" type="email" value={user.email} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="street">Street: </label>
                <input id="street" type="text" value={user.address.street} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="suite">Suite: </label>
                <input id="suite" type="text" value={user.address.suite} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="city">City: </label>
                <input id="city" type="text" value={user.address.city} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="phone">Phone: </label>
                <input id="phone" type="text" value={user.phone} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="website">Website: </label>
                <input id="website" type="text" value={user.website} onChange={handleChange} />
              </div>

              <div style={{ marginTop: 8 }}>
                <button type="submit">Lưu</button>
                <button type="button" onClick={() => setAdding(false)} style={{ marginLeft: 8 }}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddUser;
// ...existing code...