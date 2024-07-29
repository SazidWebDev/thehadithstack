import React from 'react'

const Loading = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      {/* Blurred background */}
      <div className='absolute inset-0 bg-zinc-800 opacity-50 backdrop-blur-md'></div>
      
      {/* Loading spinner */}
      <div className='relative z-10'>
        <div className="h-16 w-16 rounded-full border-4 border-gray-300 animate-spin border-r-red-500"></div>
      </div>
    </div>
  )
}

export default Loading
