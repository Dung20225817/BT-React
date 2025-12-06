import React from 'react'
import './AddStudent.css'

function AddStudent({ onAdd }) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: '',
    age: '',
    class: ''
  })

  function updateField(e) {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  async function submitForm() {
    if (formData.name.trim() === '' || formData.age.trim() === '' || formData.class.trim() === '') {
      alert('Vui lòng nhập đầy đủ thông tin!')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          age: parseInt(formData.age),
          class: formData.class
        })
      })

      if (!response.ok) {
        throw new Error('Không thể thêm học sinh')
      }

      const createdStudent = await response.json()
      onAdd && onAdd(createdStudent)
      
      setFormData({
        name: '',
        age: '',
        class: ''
      })
      setIsVisible(false)
      alert('Thêm học sinh thành công!')
    } catch (err) {
      console.error('Error adding student:', err)
      alert('Lỗi khi thêm học sinh: ' + err.message)
    }
  }

  return (
    <div>
      <button className="trigger-button" onClick={() => setIsVisible(true)}>
        <svg className="icon-plus" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 1V17M1 9H17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        Thêm học sinh
      </button>
      
      {isVisible && (
        <div className="backdrop" onClick={() => setIsVisible(false)}>
          <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <div className="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="dialog-title">Đăng ký học sinh mới</h3>
              <p className="dialog-subtitle">Điền thông tin chi tiết của học sinh</p>
            </div>

            <div className="dialog-body">
              <div className="input-wrapper">
                <label htmlFor="name" className="input-label">
                  <svg className="label-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM4 14c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Họ và tên
                </label>
                <input 
                  id="name" 
                  type="text" 
                  value={formData.name} 
                  onChange={updateField} 
                  placeholder='Nhập họ tên đầy đủ'
                  className="text-input"
                />
              </div>

              <div className="dual-column">
                <div className="input-wrapper">
                  <label htmlFor="age" className="input-label">
                    <svg className="label-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 14A6 6 0 108 2a6 6 0 000 12z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M8 4v4l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Tuổi
                  </label>
                  <input 
                    id="age" 
                    type="number" 
                    value={formData.age} 
                    onChange={updateField} 
                    placeholder='Nhập tuổi' 
                    className="text-input"
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="class" className="input-label">
                    <svg className="label-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 5l6-3 6 3v6l-6 3-6-3V5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 5l6 3m0 0l6-3m-6 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Lớp
                  </label>
                  <input 
                    id="class" 
                    type="text" 
                    value={formData.class} 
                    onChange={updateField} 
                    placeholder='Nhập lớp' 
                    className="text-input"
                  />
                </div>
              </div>
            </div>

            <div className="dialog-footer">
              <button className="action-cancel" onClick={() => setIsVisible(false)}>
                Hủy bỏ
              </button>
              <button className="action-submit" onClick={submitForm}>
                <svg className="submit-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Xác nhận thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddStudent