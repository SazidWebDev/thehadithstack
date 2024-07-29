import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ClipboardJS from 'clipboard';

const HadithCard = ({ type, hadithNumber, englishNarrator, hadithEnglish, hadithArabic, bookName, status, source, id, chapter, searchBookName, query }) => {
  const router = useRouter();
  const [favourite, setFavourite] = useState(false);

  const copyHadith = (copyHadithNumber) => {
    const clipboard = new ClipboardJS(`.copy-button-${router.query.book}-${copyHadithNumber}`);
    const element = document.querySelector(`.copy-button-${router.query.book}-${copyHadithNumber}`).firstElementChild;
    clipboard.on('success', function (e) {
      element.classList.remove('fill-transparent');
      element.classList.add('fill-sky-500');
      setTimeout(() => {
        element.classList.remove('fill-sky-500');
        element.classList.add('fill-transparent');
      }, 1500);
    });
    clipboard.on('error', function (e) {
      element.classList.remove('fill-transparent');
      element.classList.add('fill-red-500');
      setTimeout(() => {
        element.classList.remove('fill-red-500');
        element.classList.add('fill-transparent');
      }, 1500);
    });
  };

  const favouriteHadith = (hadithData) => {
    setFavourite(!favourite);
    const prevState = JSON.parse(localStorage.getItem('favourite-hadith-array'));
    const updatedHadithData = {
      ...hadithData,
      chapter: typeof hadithData.chapter === 'object' ? hadithData.chapter.chapterEnglish : hadithData.chapter,
    };
    if (!favourite) {
      localStorage.setItem('favourite-hadith-array', JSON.stringify(prevState ? [...prevState, updatedHadithData] : [updatedHadithData]));
    } else {
      localStorage.setItem('favourite-hadith-array', JSON.stringify(prevState ? prevState.filter((hadith) => hadith.hadithNumber !== hadithData.hadithNumber && hadith.id !== hadithData.id) : []));
    }
  };

  const highlightQuery = (text, query) => {
    if (!query || source !== 'search' || type === 'chapter') return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? <span key={index} className="bg-red-500 text-black font-semibold">{part}</span> : part
    );
  };

  const bookSlug = [
    "sahih-bukhari",
    "sahih-muslim",
    "al-tirmidhi",
    "abu-dawood",
    "ibn-e-majah",
    "sunan-nasai",
    "mishkat"
  ];

  const bookNameData = [
    "Sahih Bukhari",
    "Sahih Muslim",
    "Jami' Al-Tirmidhi",
    "Sunan Abu Dawood",
    "Sunan Ibn-e-Majah",
    "Sunan An-Nasa`i",
    "Mishkat Al-Masabih"
  ];

  const aboutIndex = bookSlug.indexOf(router.query.book);

  if (!bookName) {
    bookName = bookNameData[aboutIndex];
  }

  useEffect(() => {
    if (localStorage.getItem('favourite-hadith-array')) {
      const favouriteHadithArray = JSON.parse(localStorage.getItem('favourite-hadith-array'));
      if (favouriteHadithArray.find((hadith) => hadith.hadithNumber === hadithNumber && hadith.id === id)) {
        setFavourite(true);
      }
    }
  }, [hadithNumber]);

  return (
    <>
      <div className="bg-zinc-950 duration-300 md:hover:scale-[1.005] w-3/4 mx-auto mt-4 p-6 md:p-8 rounded-2xl shadow-lg shadow-red-500 overflow-hidden">
        <div className="justify-between flex">
          <span className="text-lg text-white bg-zinc-800 p-1.5 px-3 rounded-full font-bold text-start">{hadithNumber}</span>
          <div className="flex items-center">
            <button onClick={() => copyHadith(hadithNumber)} className={`duration-200 box-border sm:hover:bg-zinc-800 rounded-full p-2 text-white mr-1 sm:mr-2 copy-button-${router.query.book}-${hadithNumber}`} data-clipboard-text={`${bookName} - Hadith Number ${hadithNumber} - ${status.charAt(0).toUpperCase() + status.slice(1)} Hadith\n\n${englishNarrator}\n${hadithArabic}\n${hadithEnglish}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-transparent stroke-sky-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
              </svg>
            </button>
            <button onClick={() => favouriteHadith({ hadithNumber, englishNarrator, hadithEnglish, hadithArabic, bookName, status, chapter, searchBookName, id })} className={`duration-200 box-border sm:hover:bg-zinc-800 rounded-full p-2 text-white mr-0 sm:mr-3 favourite-button-${router.query.book}-${hadithNumber}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${favourite ? 'fill-red-500' : 'fill-transparent'} stroke-red-500`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </button>
            <p className={`block text-white font-bold p-1 px-3 capitalize rounded-full ${status.toLowerCase() === "sahih" ? "bg-green-500" : ""}${status.toLowerCase() === "hasan" ? "bg-yellow-500" : ""}${status.toLowerCase() === "da`eef" ? "bg-gray-500" : ""}`}>{status}</p>
          </div>
        </div>
        <h2 className="text-2xl text-white font-bold text-start mt-4">{englishNarrator}</h2>
        <p className="text-zinc-300 mt-5 text-end">{hadithArabic}</p>
        <p className="text-zinc-300 mt-5">{highlightQuery(hadithEnglish, query)}</p>
        {(source === "random" || source === "favourite" || source === "search") && <p className="text-zinc-300 mt-5 text-right font-semibold">{bookName ? bookName : searchBookName} - {typeof chapter === 'object' ? chapter.chapterEnglish : chapter} - Hadith Number {hadithNumber}</p>}
      </div>
    </>
  );
};

export default HadithCard;