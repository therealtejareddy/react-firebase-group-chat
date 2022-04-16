import React from 'react'

function Message({text,pic,by,at}) {
  return (
    <div className='flex items-center hover:bg-gray-100 py-2 px-6'>
        <img className="w-8 h-8 rounded-full mr-2" src={pic} alt={by}/>
        <div className='flex flex-col items-start'>
            <div><span className="text-xs text-gray-600">{by}</span></div>
            <div><span className="font-medium">{text}</span></div>
        </div>
    </div>
  )
}

export default Message