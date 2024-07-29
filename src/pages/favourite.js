import HadithCard from '@/components/HadithCard'
import TextLine from '@/components/TextLine'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

const Favourite = () => {
  const [hadiths, setHadiths] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [filteredHadiths, setFilteredHadiths] = useState([])

  useEffect(() => {
    const localFavHadiths = localStorage.getItem('favourite-hadith-array')
    const favouriteHadiths = localFavHadiths ? JSON.parse(localFavHadiths) : []
    if (!localFavHadiths || localFavHadiths.length === 0 || localFavHadiths === '[]') {
      setHadiths({ available: "not", message: "No favourite hadiths found! Please add hadiths to your favourite list by clicking on ❤️" })
    } else {
      setHadiths(favouriteHadiths)
      setFilteredHadiths(favouriteHadiths)
    }
  }, [])

  useEffect(() => {
    if (searchInput) {
      const searchQuery = searchInput.toLowerCase()
      const filtered = hadiths.filter(hadith => {
        return hadith.hadithEnglish.toLowerCase().includes(searchQuery) ||
               hadith.hadithArabic.toLowerCase().includes(searchQuery) ||
               hadith.englishNarrator.toLowerCase().includes(searchQuery)
      })
      setFilteredHadiths(filtered)
    } else {
      setFilteredHadiths(hadiths)
    }
  }, [searchInput, hadiths])

  const highlightQuery = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? <span key={index} className="bg-red-500 text-black font-semibold">{part}</span> : part
    );
  };

  return (
    <>
      <Head>
        <title>Favourite Hadiths - The Hadith Stack</title>
      </Head>
      <TextLine text={"Favourite Hadiths"} />
      <div className="w-3/4 mx-auto mt-4">
        <input
          type="text"
          placeholder="Search favourite hadiths..."
          className="bg-zinc-950 text-white border-1 border-zinc-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full ps-4 p-3"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="space-y-10 flex flex-col-reverse">
        { (hadiths.available === "not") ? (
          <div className="bg-zinc-950 duration-300 text-xl md:hover:scale-[1.005] w-3/4 mx-auto text-center font-semibold mt-4 p-6 md:p-8 rounded-2xl shadow-lg shadow-red-500 overflow-hidden">
            {hadiths.message}
          </div>
        ) : (
          <>
            {filteredHadiths && filteredHadiths.map(hadith => (
              <HadithCard
                key={hadith.id}
                {...hadith}
                source={"favourite"}
                query={searchInput}
                hadithEnglish={highlightQuery(hadith.hadithEnglish, searchInput)}
                hadithArabic={highlightQuery(hadith.hadithArabic, searchInput)}
                englishNarrator={highlightQuery(hadith.englishNarrator, searchInput)}
              />
            ))}
            <button
              className="bg-red-500 self-center hover:bg-red-600 text-base font-semibold w-fit py-2 duration-200 px-4 rounded-full"
              onClick={() => {
                localStorage.removeItem('favourite-hadith-array')
                setHadiths([])
                setFilteredHadiths([])
              }}
            >
              Clear Favourites
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default Favourite
