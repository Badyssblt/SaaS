import React from 'react'

/**
 * Button
 * @param {any} {style
 * @param {any} onClick
 * @param {any} style
 * @param {any} children}
 * @returns {any}
 */
function Button({style, onClick, children}) {

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
    <button className={`py-2 rounded-md  ${buttonClass()}`} onClick={onClick}>{children}</button>
  )
}

export default Button