import React from 'react'

function Button({onClick = null, children = null}) {
  return (
    <button onClick={onClick}>{children}</button>
  )
}

export default Button