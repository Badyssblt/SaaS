import React from 'react'

function Link({href, style, children}) {
  return (
    <a href={href} className={style}>{children}</a>
  )
}

export default Link