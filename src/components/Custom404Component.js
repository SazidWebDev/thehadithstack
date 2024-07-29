import Link from 'next/link'
import React from 'react'

const Custom404Component = () => {
  return (
    <div className='h-screen w-[65%] mx-auto flex flex-col justify-center items-center'>
	<h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
	<div className="bg-red-500 px-2 text-sm text-white rounded rotate-12 absolute">
		Page Not Found
	</div>
	<button className="mt-5">
      <Link href={"/"}
        className="relative inline-block text-sm font-medium text-red-500 group hover:text-red-600"
      >
        <span className="relative block px-8 py-3 rounded-full bg-red-500 text-white">
          Go Home
        </span>
      </Link>
    </button>
    </div>
  )
}

export default Custom404Component