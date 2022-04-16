import React from 'react'

function Button({onClick = null, children = null}) {
  return (
    <button className="bg-gray-100 py-2 px-4 rounded-xl font-semibold cursor-pointer" onClick={onClick}>{children}</button>
  )
}

export default Button