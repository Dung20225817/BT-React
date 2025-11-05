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
    onAdd && typeof onAdd === "function" && onAdd({ ...user });
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

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        {!adding && (
          <button type="button" onClick={() => setAdding(true)}>
            Thêm
          </button>
        )}

        {adding && (
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
        )}
      </div>
    </div>
  );
}

export default AddUser;