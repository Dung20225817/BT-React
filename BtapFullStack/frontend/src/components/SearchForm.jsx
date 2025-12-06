// SearchForm.jsx
import React from 'react'
import './SearchForm.css'

function SearchForm({ onChangeValue }) {
  return (
    <div className="filter-wrapper">
      <div className="icon-holder">
        <svg className="lookup-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M21 21l-4.35-4.35" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>
      <input
        type="text"
        className="query-field"
        placeholder="Nhập tên để tìm kiếm học sinh..."
        onChange={(e) => onChangeValue && onChangeValue(e.target.value)}
      />
      <div className="field-border"></div>
    </div>
  );
}

export default SearchForm