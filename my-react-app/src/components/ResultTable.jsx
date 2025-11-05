// ...existing code...
import React, { useEffect, useState } from "react";
import styles from './ResultTable.module.css';

function ResultTable({ keyword = "", user, onAdded }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load initial data once
    useEffect(() => {
        let mounted = true;
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => {
                if (mounted) setUsers(data);
            })
            .catch(() => {
                if (mounted) setUsers([]);
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });
        return () => (mounted = false);
    }, []);

    // If parent passes a new `user` prop, append it (avoid duplicates)
    useEffect(() => {
        if (!user) return;
        setUsers((prev) => {
            const exists = prev.some((u) => u.id === user.id);
            if (exists) return prev;
            // if incoming user has no id, give a new unique id
            const newUser =
                user.id != null
                    ? user
                    : { ...user, id: (prev.reduce((m, p) => Math.max(m, p.id || 0), 0) || 0) + 1 };
            onAdded && typeof onAdded === "function" && onAdded(newUser);
            return [...prev, newUser];
        });
    }, [user, onAdded]);

    const editUser = (u) => {
        const name = prompt("Tên:", u.name);
        if (name == null) return; // cancelled
        const username = prompt("Tên đăng nhập:", u.username) ?? u.username;
        const email = prompt("Email:", u.email) ?? u.email;
        const city = prompt("Thành phố:", u.address?.city ?? "") ?? (u.address?.city ?? "");
        setUsers((prev) =>
            prev.map((item) =>
                item.id === u.id
                    ? { ...item, name, username, email, address: { ...(item.address || {}), city } }
                    : item
            )
        );
    };

    const removeUser = (id) => {
        if (!confirm("Xóa người dùng này?")) return;
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    const q = (keyword || "").toLowerCase().trim();
    const filteredUsers = users.filter(
        (u) =>
            !q ||
            (u.name && u.name.toLowerCase().includes(q)) ||
            (u.username && u.username.toLowerCase().includes(q)) ||
            (u.email && u.email.toLowerCase().includes(q))
    );

    if (loading) {
        return (
            <div>
                <p>Đang tải dữ liệu...</p>
            </div>
        );
    }

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Tên đăng nhập</th>
                    <th>Email</th>
                    <th>Thành phố</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {filteredUsers.map((u) => (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>{u.address?.city}</td>
                        <td>
                            <button onClick={() => editUser(u)}>Sửa</button>
                            <button onClick={() => removeUser(u.id)}>Xóa</button>
                        </td>
                    </tr>
                ))}
                {filteredUsers.length === 0 && (
                    <tr>
                        <td colSpan={6} style={{ textAlign: "center" }}>
                            Không tìm thấy người dùng
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default ResultTable;
// ...existing code...