import React from 'react'

function InputBox({ label, type, onChange, name, value, placeholder }) {
    return (

      <div >
          <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={`${type}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    );
  }
  
  export default InputBox;
  
  