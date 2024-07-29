import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const router = useRouter()
  const [dropdown, setDropdown] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchValue) {
      router.push(`/search/${encodeURIComponent(searchValue)}`)
    }
    setSearchValue('')
  }
  const handleOnChange = (e) => {
    setSearchValue(e.target.value)
  }
  return (
    <>
      <nav className="bg-black p-3 overflow-hidden font-medium fixed w-full h-16 md:h-fit overflow-x-hidden top-0 z-[100]">
        <div className="flex flex-col md:flex-row justify-around items-center">
          <div className='flex items-center justify-between'>
          <div className='flex items-center justify-between w-full md:w-fit mr-6'>
          <a href="/" className='absolute left-4 top-2 md:static'><img src="https://i.ibb.co/MpFwbn9/The-Hadith-Stack.png" draggablle="false" alt="Logo" className="w-16 select-none pointer-events-none rounded-lg hover:bg-red-500 duration-200" /></a>
          <RxHamburgerMenu onBlur={() => {setDropdown(false)}} onClick={() => {setDropdown(!dropdown)}} className='text-2xl top-5 absolute right-4 text-white md:hidden' />
          </div>
          <ul onBlur={() => {setDropdown(false)}} className={`fixed z-50 top-16 right-0 md:static flex flex-col md:flex-row text-center bg-zinc-900 md:bg-transparent space-y-2 md:space-y-0 p-4 md:p-0 rounded-lg justify-center text-white md:space-x-2 ${dropdown ? 'block' : 'hidden md:block'}`}>
            <Link className="hover:text-white select-none cursor-pointer p-1 px-2.5 md:p-2 md:px-4 hover:bg-red-500 rounded-3xl duration-200" href="/">Hadith Collection</Link>
            <Link className="hover:text-white select-none cursor-pointer p-1 px-2.5 md:p-2 md:px-4 hover:bg-red-500 rounded-3xl duration-200" href="/about">About</Link>
            <Link className="hover:text-white select-none cursor-pointer p-1 px-2.5 md:p-2 md:px-4 hover:bg-red-500 rounded-3xl duration-200" href="/credits">Credits</Link>
            <Link className="hover:text-white select-none cursor-pointer p-1 px-2.5 md:p-2 md:px-4 hover:bg-red-500 rounded-3xl duration-200" href="/contact">Contact</Link>
          </ul>
          </div>
          <form className="flex items-center mt-2.5 md:mt-0 absolute top-1 ml-6 md:ml-0 md:static" onSubmit={(e)=>handleSubmit(e)}>
            <div className="relative w-32 sm:w-full md:w-40 lg:w-full">
              <input type="text" id='search' onChange={(e) => handleOnChange(e)} value={searchValue} className="bg-zinc-950 text-white border-1 border-zinc-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full ps-4 p-2 md:p-2.5" placeholder="Search Hadith, Number..." required />
            </div>
            <button type="submit" className="p-2 md:p-2.5 ms-2 text-sm font-medium text-white bg-red-400 rounded-lg border border-red-500 hover:bg-red-500 focus:ring-2 focus:outline-none focus:ring-red-300">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </button>
          </form>
        </div>
      </nav>
    </>
  )
}

export default Navbar