import Link from 'next/link';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const RandomHadith = ({ API_KEY }) => {
    const [hadiths, setHadiths] = useState([]);
    const [currentHadith, setCurrentHadith] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [selectedHadithArray, setSelectedHadithArray] = useState([]);
    const interval = useRef(null);

    const fetchHadiths = useCallback(async () => {
        try {
            const response = await fetch(`https://hadithapi.com/public/api/hadiths?apiKey=${API_KEY}&book=sahih-bukhari&paginate=1000&status=sahih`);
            const data = await response.json();
            return data.hadiths.data;
        } catch (error) {
            console.error('Error fetching hadiths:', error);
            return [];
        }
    }, [API_KEY]);

    const filterHadiths = useCallback((hadiths) => {
        return hadiths.filter(hadith =>
            hadith.hadithEnglish.length >= 30 &&
            hadith.hadithEnglish.length < 225 &&
            hadith.englishNarrator &&
            hadith.englishNarrator.length < 30
        );
    }, []);

    const selectedHadiths = useCallback(() => {
        const selectedHadithsArray = [];
        const hadithsCopy = [...hadiths];
        while (selectedHadithsArray.length < 15 && hadithsCopy.length > 0) {
            const randomIndex = Math.floor(Math.random() * hadithsCopy.length);
            const [randomHadith] = hadithsCopy.splice(randomIndex, 1);
            selectedHadithsArray.push(randomHadith);
        }
        setSelectedHadithArray(selectedHadithsArray);
    }, [hadiths]);

    useEffect(() => {
        const getHadiths = async () => {
            const localHadiths = localStorage.getItem('random-hadiths');

            if (!localHadiths || localHadiths.length === 0 || localHadiths === "[]") {
                const returnedHadiths = await fetchHadiths();
                const filteredHadiths = filterHadiths(returnedHadiths);
                setHadiths(filteredHadiths);
                localStorage.setItem('random-hadiths', JSON.stringify(filteredHadiths));
            } else {
                const parsedHadiths = JSON.parse(localHadiths);
                const filteredHadiths = filterHadiths(parsedHadiths);
                setHadiths(filteredHadiths);
            }
            setFetching(false);
        };
        getHadiths();
    }, [fetchHadiths, filterHadiths]);

    useEffect(() => {
        if (hadiths.length > 0) {
            selectedHadiths();
        }
    }, [hadiths, selectedHadiths]);

    useEffect(() => {
        if (selectedHadithArray.length > 0) {
            setCurrentHadith(selectedHadithArray[0]);
            interval.current = setInterval(() => {
                document.getElementById('next-hadith').click();
            }, 7000);
        }
        return () => clearInterval(interval.current);
    }, [selectedHadithArray]);

    const handleNavigation = useCallback((direction) => {
        const currentIndex = selectedHadithArray.findIndex(hadith => hadith === currentHadith);
        let newIndex;

        if (direction === 'previous') {
            newIndex = currentIndex === 0 ? selectedHadithArray.length - 1 : currentIndex - 1;
        } else {
            newIndex = currentIndex === selectedHadithArray.length - 1 ? 0 : currentIndex + 1;
        }

        setCurrentHadith(selectedHadithArray[newIndex]);
        clearInterval(interval.current);
        interval.current = setInterval(() => {
            document.getElementById('next-hadith').click();
        }, 7000);
    }, [currentHadith, selectedHadithArray]);

    return (
        <>
            <div className="relative mx-4 pb-24 transition-all md:mx-36 text-center mt-24 bg-zinc-950 px-4 min-h-52 md:px-10 py-6 rounded-xl shadow-lg overflow-x-hidden shadow-red-500 hover:scale-[1.01] duration-300">
                <button onClick={() => handleNavigation('previous')} className='absolute bottom-6 md:bottom-1/2 md:translate-y-1/2 opacity-50 hover:opacity-100 duration-200 left-3 p-2 bg-zinc-800 rounded-full'>
                    <FaArrowLeft />
                </button>
                <button onClick={() => handleNavigation('next')} id='next-hadith' className='absolute bottom-6 md:bottom-1/2 md:translate-y-1/2 opacity-50 hover:opacity-100 duration-200 right-3 p-2 bg-zinc-800 rounded-full'>
                    <FaArrowRight />
                </button>
                {currentHadith && (
                    <>
                        <h3 className="font-semibold text-lg sm:text-xl text-red-500 md:mb-2 text-center">{currentHadith.englishNarrator}</h3>
                        <p className="text-white mb-2 text-xs sm:text-base">{currentHadith.hadithEnglish}</p>
                        <p className="text-sm text-white mb-2 font-semibold absolute bottom-12 md:bottom-6 md:right-6 right-1/2 translate-x-1/2 md:translate-x-0">Bukhari, {currentHadith.hadithNumber} - <span className="text-green-500">{currentHadith.status}</span></p>
                        <Link href={`/random/${currentHadith.hadithNumber}`} className="font-semibold absolute bottom-5 left-1/2 -translate-x-1/2  text-white hover:bg-red-600 bg-red-500 py-2 px-3 rounded-full duration-200 text-sm">Read the Hadith</Link>
                    </>
                )}
                {fetching && <p className="text-white mb-2 text-xl md:text-3xl animate-pulse font-semibold">Fetching Random Hadiths...</p>}
                <div className='flex space-x-1 sm:space-x-1.5 lg:space-x-2 absolute bottom-1.5 left-1/2 -translate-x-1/2'>
                    {selectedHadithArray.map((hadith, index) => (
                        <div key={index} onClick={() => setCurrentHadith(hadith)} className={`${hadith === currentHadith ? "bg-red-500" : "bg-zinc-700"} rounded-full cursor-pointer hover:scale-110 hover:bg-zinc-200 w-2 h-2 duration-200`}></div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default RandomHadith;
