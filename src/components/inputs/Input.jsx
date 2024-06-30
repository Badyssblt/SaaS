import React from 'react';

/**
 * Input
 * @param {any} {label
 * @param {any} type='text'
 * @param {any} placeholder
 * @param {any} style
 * @param {any} onChange
 * @param {any} name
 * @param {any} defaultValue
 * @param {any} ...rest}
 * @returns {any}
 */
function Input({ label, type = 'text', placeholder, style, onChange, name, value = '', ...rest }) {
  return (
    <div className='flex flex-col'>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={style}
        onChange={onChange}
        name={name}
        id={name}
        value={value}
        {...rest}
      />
    </div>
  );
}

export default Input;
