import { usePathname } from 'next/navigation'
import React from 'react'

const Home = () => {
  const pathname = usePathname()
  return (
    <>
    <h1 className={`text-3xl md:text-5xl font-bold text-center ${ pathname === "/" ? "mt-10" : "mt-28"} mx-4 text-white`}>The Hadith Stack</h1>
    <p className="text-center text-xs md:text-base mt-1.5 md:mt-3 mx-4 text-gray-400">Find hadiths from different books in one place.</p> 
    </>
  )
}

export default Home