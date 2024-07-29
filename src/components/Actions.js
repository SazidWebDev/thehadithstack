import Link from 'next/link'
import React from 'react'

const Actions = () => {
    return (
        <div className="w-full flex items-center flex-col justify-center">
            <div className="flex flex-wrap justify-center items-center mx-auto">
                <Link href={'/favourite'} className="category-card group transform transition w-full sm:w-auto duration-300 hover:scale-105 mx-6 my-6 p-4 rounded-lg text-center shadow-lg text-white bg-zinc-950 sm:mx-4 mt-4 md:p-6 shadow-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.25" stroke="currentColor" className="w-10 h-10 mx-auto group-hover:fill-red-600 group-hover:stroke-red-600 stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    <p className="text-white mt-2">Favourite Hadiths</p>
                </Link>
                <Link href={'https://en.wikipedia.org/wiki/Hadith_terminology'} target="_blank" className="category-card group w-full sm:w-auto transform transition duration-300 hover:scale-105 mx-6 my-6 p-4 rounded-lg text-center shadow-lg text-white bg-zinc-950 sm:mx-4 mt-4 md:p-6 shadow-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.25" stroke="currentColor" className="w-10 h-10 mx-auto group-hover:fill-sky-600 stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                    <p className="text-white mt-2">Learn about Level of Authenticity</p>
                </Link>
                <Link href={'/miscellaneous'} className="category-card group w-full sm:w-auto transform transition duration-300 hover:scale-105 mx-6 my-6 p-4 rounded-lg text-center shadow-lg text-white bg-zinc-950 sm:mx-4 mt-4 md:p-6 shadow-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.25" stroke="currentColor" className="w-10 h-10 mx-auto group-hover:fill-green-600 group-hover:stroke-green-600 stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                    <p className="text-white mt-2">Miscellaneous</p>
                </Link>
            </div>
                <Link className="bg-gradient-to-r transition-all from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-sm duration-200 text-white font-bold py-2 px-4 rounded-full" href="/search">
                    Try Advanced Search ⭐
                </Link>
        </div>
    )
}

export default Actions