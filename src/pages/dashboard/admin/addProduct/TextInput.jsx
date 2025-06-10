import React from 'react';
import "./AddProduct.css";

const TextInput = ({ label, name, value, onChange, type="text", placeholder }) => {
  return (
    <div>
      <label htmlFor={name} className='text-input-info'>
        {label}
      </label>
      <input 
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='add-product-InputCSS'
        />
    </div>
  )
}

export default TextInput
