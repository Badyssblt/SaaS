import React, { useState } from 'react';

/**
 * Form
 * @param {any} {onSubmit
 * @param {any} children
 * @param {any} successMessage}
 * @returns {any}
 */
function Form({ onSubmit, children, successMessage, formStyle = "", buttonText = "Envoyer", buttonStyle = "primary" }) {
  const [formState, setFormState] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState, setSuccess);
  };


  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onChange: handleChange,
        value: formState[child.props.name] !== undefined ? formState[child.props.name] : child.props.value || '',
      });
    }
    return child;
  });
  
  const buttonClass = (style) => {
    switch(style){
      case 'primary':
        return 'bg-primary text-white w-full flex justify-center rounded-md py-2 my-2'
      default: 
        return style
    }
  }

  return (
    <form onSubmit={handleSubmit} className={formStyle}>
      {childrenWithProps}
      <button type="submit" className={buttonClass(buttonStyle)}>
        {buttonText}
      </button>
      {success && (
        <div>
          <p className='font-bold text-lime-600 text-center my-2'>{successMessage}</p>
        </div>
      )}
    </form>
  );
}

export default Form;
