import React from 'react'
import './AddUser.css'

function AddUser({ onAdd }) {
  const [adding, setAdding] = React.useState(false)
  const [user, setUser] = React.useState({
    name: '',
    username: '',
    email: '',
    address: { street: '', suite: '', city: '' },
    phone: '',
    website: ''
  })

  function handleChange(e) {
    const { id, value } = e.target
    if (['street', 'suite', 'city'].includes(id)) {
      setUser({ ...user, address: { ...user.address, [id]: value } })
    } else {
      setUser({ ...user, [id]: value })
    }
  }

  function handleAdd() {
    if (user.name.trim() === '' || user.username.trim() === '') {
      alert('Vui lòng nhập Name và Username!')
      return
    }
    onAdd && onAdd(user)
    setUser({
      name: '',
      username: '',
      email: '',
      address: { street: '', suite: '', city: '' },
      phone: '',
      website: ''
    })
    setAdding(false)
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setAdding(true)}>Thêm</button>
      {adding && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Thêm người dùng</h4>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" value={user.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" value={user.username} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={user.email} onChange={handleChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="street">Street</label>
                <input id="street" type="text" value={user.address.street} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="suite">Suite</label>
                <input id="suite" type="text" value={user.address.suite} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input id="city" type="text" value={user.address.city} onChange={handleChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="text" value={user.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input id="website" type="text" value={user.website} onChange={handleChange} />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleAdd}>Thêm</button>
              <button className="btn btn-secondary" onClick={() => setAdding(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddUser