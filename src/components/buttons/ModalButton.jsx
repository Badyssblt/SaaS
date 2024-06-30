import React from 'react'

/**
 * Button to open modal
 * @param {any} {onClick
 * @param {any} children}
 * @returns {any}
 */
function ModalButton({onClick, children, style}) {

  const buttonClass = () => {
    switch(style){
      case 'primary':
        return 'bg-primary text-white w-full flex justify-center'
      case 'secondary':
        return 'bg-white border text-black'
      case 'none':
        'text-black'
      default:
        return style;
    }
  }

  return (
    <button className={`px-4 py-2 rounded-md gap-4 ${buttonClass()}`} onClick={onClick}>{children}</button>
  )
}

export default ModalButton