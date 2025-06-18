import React from 'react';
import "./AddProduct.css";

const SelectInput = ({ label, name, value, onChange, options, }) => {
  return (
    <div>
      <label htmlFor={name} className='text-input-info'>
        {label}
      </label>
      <select 
        name={name} 
        id={name}
        value={value}
        onChange={onChange}
        className='add-product-InputCSS'
      >
        <option value="">Select an option</option>
        {
          options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))
        }
      </select>
    </div>
  )
}

export default SelectInput
