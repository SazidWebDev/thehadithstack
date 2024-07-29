import Link from 'next/link'
import React from 'react'

const BookCard = ({bookName, writerName, hadiths_count, chapters_count, bookSlug}) => {
    return (
        <>
            <div className="bg-zinc-950 relative duration-300 hover:scale-[1.015] w-3/4 lg:w-1/2 mx-auto mt-4 p-8 rounded-2xl text-center shadow-lg shadow-red-500">
                <Link href={`/about/${bookSlug}`} title={`Learn About ${writerName}`} className='cursor-pointer absolute top-4 right-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 md:w-8 h-7 md:h-8 stroke-white hover:bg-zinc-800 rounded-full p-[2px] duration-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                </Link>
                <h2 className="text-2xl text-white font-bold">{bookName}</h2>
                <p className="text-sm text-zinc-400 mt-1 mb-3">{writerName}</p>
                <div className="flex justify-around">
                <div className="text-sm text-zinc-200 mb-4 text-center">Chapters<div className='text-xl md:text-2xl font-semibold'>{chapters_count}</div></div>
                <div className="text-sm text-zinc-200 text-center">Hadiths<div className='text-xl md:text-2xl font-semibold'>{hadiths_count}</div></div>
            </div>
                <Link className="bg-red-500 hover:bg-red-600 text-sm text-white font-bold py-2 duration-200 px-4 rounded-full" href={`/chapters/${bookSlug}`}>Read Hadith</Link>
            </div>
        </>
    )
}

export default BookCard