import Link from 'next/link'
import React from 'react'

const ChapterCard = ({ chapterNumber, chapterEnglish, chapterArabic, bookSlug, buttonShow }) => {
    return (
        <>
                <div className="bg-zinc-950 relative duration-300 hover:scale-[1.015] w-3/4 lg:w-1/2 mx-auto mt-4 p-6 md:p-8 rounded-2xl text-center shadow-lg shadow-red-500">
                        <div className="text-lg md:absolute -ml-2 bg-opacity-50 -mt-2 sm:-ml-0 sm:-mt-0 top-6 left-6 text-white bg-zinc-800 p-1 px-3 rounded-full font-bold text-start w-fit">{chapterNumber}
                    </div>
                    <h2 className="text-2xl text-white font-bold">{chapterEnglish}</h2>
                        <p className={`text-zinc-300 mt-1.5 text-sm ${buttonShow ? 'mb-5' : ''}`}>{chapterArabic}</p>
                    {buttonShow && <Link href={`/hadiths/${bookSlug}/${chapterNumber}/1`} className="bg-red-500 hover:bg-text-white font-bold py-2 duration-200 px-4 rounded-full">Read Hadith</Link>}</div>
        </>
    )
}

export default ChapterCard