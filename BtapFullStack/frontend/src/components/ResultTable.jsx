// ResultTable.jsx
import React from 'react'
import './ResultTable.css'

function ResultTable({ keyword = '', student, onAdded }) {
  const [dataList, setDataList] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [activeEdit, setActiveEdit] = React.useState(null)
  const [ascendingOrder, setAscendingOrder] = React.useState(true)

  React.useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/students')
        const result = await response.json()
        if (!isMounted) return
        setDataList(result)
        setIsLoading(false)
      } catch (error) {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  React.useEffect(() => {
    if (!student) return
    setDataList((prev) => [...prev, { ...student, id: prev.length + 1 }])
    onAdded && onAdded()
  }, [student, onAdded])

  const matchedData = dataList.filter((item) => {
    const searchTerm = String(keyword || '').toLowerCase()
    return (
      item.name.toLowerCase().includes(searchTerm) ||
      (item.class && item.class.toLowerCase().includes(searchTerm))
    )
  })

  const orderedData = [...matchedData].sort((first, second) => {
    const nameFirst = first.name.toLowerCase()
    const nameSecond = second.name.toLowerCase()
    if (nameFirst < nameSecond) return ascendingOrder ? -1 : 1
    if (nameFirst > nameSecond) return ascendingOrder ? 1 : -1
    return 0
  })

  function initiateEdit(item) {
    setActiveEdit({ ...item })
  }

  function modifyField(fieldName, fieldValue) {
    if (!activeEdit) return
    setActiveEdit({ ...activeEdit, [fieldName]: fieldValue })
  }

  function commitChanges() {
    if (!activeEdit) return
    const recordId = activeEdit._id
    fetch(`http://localhost:5000/api/students/${recordId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activeEdit)
    })
      .then((response) => response.json())
      .then((updated) => {
        setDataList((prev) => prev.map((item) => (item._id === activeEdit._id ? updated : item)))
        setActiveEdit(null)
      })
      .catch((error) => console.error('Error updating student:', error))
  }

  function discardChanges() {
    setActiveEdit(null)
  }

  function deleteRecord(recordId) {
    fetch(`http://localhost:5000/api/students/${recordId}`, {
      method: 'DELETE'
    })
      .then(() => {
        setDataList((prev) => prev.filter((item) => item._id !== recordId))
      })
      .catch((error) => console.error('Error deleting student:', error))
  }

  if (isLoading) return <div className="loader-message">Đang tải dữ liệu...</div>

  return (
    <div className="table-wrapper">
      {dataList.length === 0 ? (
        <div className="empty-state">
          <svg className="empty-icon" width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path d="M32 8v48M8 32h48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
            <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="3" opacity="0.3"/>
          </svg>
          <p className="empty-text">Không có học sinh nào trong hệ thống.</p>
        </div>
      ) : (
        <>
          <div className="control-panel">
            <button 
              className="sort-toggle" 
              onClick={() => setAscendingOrder(prev => !prev)}
            >
              <svg className="sort-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 6l3-3 3 3M6 3v12M12 12l-3 3-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Sắp xếp: {ascendingOrder ? 'A → Z' : 'Z → A'}</span>
            </button>
          </div>

          <div className="data-grid-container">
            <table className="data-grid">
              <thead>
                <tr>
                  <th className="col-index">#</th>
                  <th className="col-name">Họ tên</th>
                  <th className="col-age">Tuổi</th>
                  <th className="col-class">Lớp học</th>
                  <th className="col-actions">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orderedData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="no-results">
                      <svg className="search-icon" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="2.5"/>
                        <path d="M20 20l6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                      <span>Không tìm thấy học sinh nào với từ khóa "{keyword}"</span>
                    </td>
                  </tr>
                ) : (
                  orderedData.map((item, idx) => (
                    <tr key={item._id} className="data-row">
                      <td className="cell-index">{idx + 1}</td>
                      <td className="cell-name">{item.name}</td>
                      <td className="cell-age">{item.age}</td>
                      <td className="cell-class">{item.class}</td>
                      <td className="cell-actions">
                        <div className="action-group">
                          <button className="action-modify" onClick={() => initiateEdit(item)}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M10 1l3 3-7 7H3v-3l7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Sửa
                          </button>
                          <button className="action-remove" onClick={() => deleteRecord(item._id)}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M2 4h10M5 4V2h4v2M4 4v8h6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      
      {activeEdit && (
        <div className="overlay-screen" onClick={discardChanges}>
          <div className="edit-panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-header">
              <div className="header-badge">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12 2l6 6-8 8H4v-6l8-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="panel-title">Chỉnh sửa thông tin</h3>
              <p className="panel-desc">Cập nhật thông tin học sinh</p>
            </div>

            <div className="panel-body">
              <div className="field-container">
                <label htmlFor="name" className="field-label">
                  <svg className="field-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 12c0-2.5 2-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Họ và tên
                </label>
                <input
                  id="name"
                  type="text"
                  value={activeEdit.name}
                  onChange={(e) => modifyField('name', e.target.value)}
                  className="field-input"
                  placeholder="Nhập họ tên"
                />
              </div>

              <div className="field-row">
                <div className="field-container">
                  <label htmlFor="age" className="field-label">
                    <svg className="field-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M7 3.5V7h2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Tuổi
                  </label>
                  <input
                    id="age"
                    type="number"
                    value={activeEdit.age}
                    onChange={(e) => modifyField('age', e.target.value)}
                    className="field-input"
                    placeholder="Nhập tuổi"
                  />
                </div>

                <div className="field-container">
                  <label htmlFor="class" className="field-label">
                    <svg className="field-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="2" y="3" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M5 3V2M9 3V2M2 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Lớp
                  </label>
                  <input
                    id="class"
                    type="text"
                    value={activeEdit.class}
                    onChange={(e) => modifyField('class', e.target.value)}
                    className="field-input"
                    placeholder="Nhập lớp"
                  />
                </div>
              </div>
            </div>

            <div className="panel-footer">
              <button className="footer-cancel" onClick={discardChanges}>
                Hủy
              </button>
              <button className="footer-save" onClick={commitChanges}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResultTable