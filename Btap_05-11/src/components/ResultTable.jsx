import React from 'react'
import './ResultTable.css'

function ResultTable({ keyword = '', user, onAdded }) {
  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [editing, setEditing] = React.useState(null)

  React.useEffect(() => {
    let isMounted = true
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return
        setUsers(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
    return () => {
      isMounted = false
    }
  }, [])

  React.useEffect(() => {
    if (!user) return
    setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }])
    onAdded && onAdded()
  }, [user, onAdded])

  const filteredUsers = users.filter((u) => {
    const kw = String(keyword || '').toLowerCase()
    return (
      u.name.toLowerCase().includes(kw) || u.username.toLowerCase().includes(kw)
    )
  })

  function editUser(u) {
    setEditing({ ...u, address: { ...u.address } })
  }

  function handleEditChange(field, value) {
    if (!editing) return
    if (['street', 'suite', 'city'].includes(field)) {
      setEditing({ ...editing, address: { ...editing.address, [field]: value } })
    } else {
      setEditing({ ...editing, [field]: value })
    }
  }

  function saveUser() {
    if (!editing) return
    setUsers((prev) => prev.map((u) => (u.id === editing.id ? editing : u)))
    setEditing(null)
  }

  function cancelEdit() {
    setEditing(null)
  }

  function removeUser(id) {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  if (loading) return <div>Đang tải dữ liệu...</div>

  return (
    <div>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Actions</th>
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
                <div className="actions">
                  <button className="btn btn-edit" onClick={() => editUser(u)}>Sửa</button>
                  <button className="btn btn-delete" onClick={() => removeUser(u.id)}>Xóa</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Sửa người dùng</h4>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={editing.name}
                onChange={(e) => handleEditChange('name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={editing.username}
                onChange={(e) => handleEditChange('username', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={editing.email}
                onChange={(e) => handleEditChange('email', e.target.value)}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="street">Street</label>
                <input
                  id="street"
                  type="text"
                  value={editing.address?.street || ''}
                  onChange={(e) => handleEditChange('street', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="suite">Suite</label>
                <input
                  id="suite"
                  type="text"
                  value={editing.address?.suite || ''}
                  onChange={(e) => handleEditChange('suite', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                value={editing.address?.city || ''}
                onChange={(e) => handleEditChange('city', e.target.value)}
              />
            </div>
            <div className="form-actions">
              <button className="btn btn-edit" onClick={saveUser}>Lưu</button>
              <button className="btn btn-delete" onClick={cancelEdit}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResultTable