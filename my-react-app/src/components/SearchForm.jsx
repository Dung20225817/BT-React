import React from 'react';

function SearchForm({onchangeValue}) {
    return (
        <input type="text" 
        placeholder="Tìm kiếm người dùng..." 
        onChange={(e) => onchangeValue(e.target.value)}
        />
    );
}

export default SearchForm;