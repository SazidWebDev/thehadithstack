import TextLine from '@/components/TextLine'
import Head from 'next/head'
import React, { useState } from 'react'
import { FaChevronDown, FaYoutube } from 'react-icons/fa'

const categories = [
  {
    title: 'Self Help',
    channels: [
      { name: 'Noble Lessons', url: 'https://www.youtube.com/results?search_query=Noblelessons' },
      { name: 'Muslim Odyssey', url: 'https://www.youtube.com/results?search_query=MuslimOdyssey' },
      { name: 'Noble Spouse', url: 'https://www.youtube.com/results?search_query=Noblespouse' },
      { name: 'Yusuf Jarrar', url: 'https://www.youtube.com/results?search_query=yusuufff' },
      { name: 'Sufyaan', url: 'https://www.youtube.com/results?search_query=sxfyy' },
      { name: 'Practical Islam', url: 'https://www.youtube.com/results?search_query=PracticalIslam' },
    ],
  },
  {
    title: 'Educational',
    channels: [
      { name: 'Smile 2 Jannah', url: 'https://www.youtube.com/results?search_query=smiletojannah' },
      { name: 'Sense Islam', url: 'https://www.youtube.com/results?search_query=SenseIslam' },
      { name: 'Nourish TV', url: 'https://www.youtube.com/results?search_query=NourishTV' },
      { name: 'One Islam Productions', url: 'https://www.youtube.com/results?search_query=OneIslamProductions' },
      { name: 'The Prophet\'s Path', url: 'https://www.youtube.com/results?search_query=TheProphetsPath' },
      { name: 'Islam Channel', url: 'https://www.youtube.com/results?search_query=islamchanneltv' },
      { name: 'The Daily Reminder', url: 'https://www.youtube.com/results?search_query=TheDailyReminder' },
      { name: 'Islamic Guidance', url: 'https://www.youtube.com/results?search_query=Islamic_Guidance' },
      { name: 'OnePath Network', url: 'https://www.youtube.com/results?search_query=OnePathNetwork' },
      { name: 'Qewt Elfekr', url: 'https://www.youtube.com/results?search_query=qewtelfekr77' },
      { name: 'FreeQuranEducation', url: 'https://www.youtube.com/results?search_query=FreeQuranEducation' },
      { name: 'Nouman Ali Khan - Official - Bayyinah', url: 'https://www.youtube.com/results?search_query=bayyinah' },
    ],
  },
  {
    title: 'Sheikh',
    channels: [
      { name: 'assimalhakeem', url: 'https://www.youtube.com/results?search_query=assimalhakeem' },
      { name: 'Mufti Menk', url: 'https://www.youtube.com/results?search_query=muftimenkofficial' },
      { name: 'Yaqeen Institute', url: 'https://www.youtube.com/results?search_query=yaqeeninstituteofficial' },
    ],
  },
  {
    title: 'Dawah and Debate',
    channels: [
      { name: 'One Message Foundation', url: 'https://www.youtube.com/results?search_query=OneMessageFoundation' },
      { name: 'Random Dawah', url: 'https://www.youtube.com/results?search_query=randomdawah' },
      { name: 'Ali Dawah', url: 'https://www.youtube.com/results?search_query=AliDawah' },
      { name: 'Mohammed Hijab', url: 'https://www.youtube.com/results?search_query=MohammedHijab' },
      { name: 'The3Muslims', url: 'https://www.youtube.com/results?search_query=The3Muslims' },
      { name: 'The Muslim Lantern', url: 'https://www.youtube.com/results?search_query=TheMuslimLantern' },
      { name: 'EF Dawah', url: 'https://www.youtube.com/results?search_query=EFDawah' },
      { name: 'Hamza\'s Den', url: 'https://www.youtube.com/results?search_query=HamzasDen' },
    ],
  },
  {
    title: 'Finance',
    channels: [
      { name: 'Thom J. Défilet (ريّان)', url: 'https://www.youtube.com/results?search_query=thomdefilet' },
      { name: 'IFG - Islamic Finance Guru', url: 'https://www.youtube.com/results?search_query=IFGuru' },
      { name: 'Practical Islamic Finance', url: 'https://www.youtube.com/results?search_query=PracticalIslamicFinance' },
    ],
  },
  {
    title: 'Quran',
    channels: [
      { name: 'FreeQuranEducation', url: 'https://www.youtube.com/results?search_query=FreeQuranEducation' },
      { name: 'Sense Quran TV', url: 'https://www.youtube.com/results?search_query=SenseQuranTV' },
      { name: 'Quran Weekly', url: 'https://www.youtube.com/results?search_query=QuranWeekly' },
    ],
  },
  {
    title: 'Others',
    channels: [
      { name: 'MercifulServant', url: 'https://www.youtube.com/results?search_query=TheMercifulServant' },
      { name: 'Darul Arqam Studios', url: 'https://www.youtube.com/results?search_query=darularqamstudioofficial' },
    ],
  },
];

const CategorySection = ({ title, channels }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-zinc-900 w-[75%] mx-auto my-8 py-4 px-6 rounded-xl shadow-lg overflow-hidden hover:scale-[1.025] shadow-red-500 transition-all duration-300">
      <div onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center cursor-pointer">
        <h2 className="text-xl my-4 text-white font-bold">
          {title}
        </h2>
        <FaChevronDown className={`text-white duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <ul className="list-disc">
          {channels.map((channel, index) => (
            <li key={index} className="mb-2 flex items-center">
              <FaYoutube className="text-red-500 mr-2" size={30} />
              <div>
                <p className="text-lg font-semibold text-white">{channel.name}</p>
                <a href={channel.url} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline underline-offset-2 decoration-1">
                  {channel.url}
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Miscellaneous = () => {
  return (
    <>
      <Head>
        <title>Miscellaneous - The Hadith Stack</title>
      </Head>
      <TextLine text="Miscellaneous" />
      <h2 className="text-3xl text-white font-bold mb-8 text-center">Learn Arabic</h2>
      <div className="bg-zinc-900 w-[90%] mx-auto mt-4 p-6 md:p-8 rounded-xl hover:scale-[1.025] duration-300 transition-all shadow-lg overflow-hidden shadow-red-500">
        <iframe 
          width="100%" 
          className="h-200 sm:h-[400px] xl:h-[600px]" 
          src="https://www.youtube.com/embed/IuiTV5SEeGw?list=PL6TlMIZ5ylgrYBl5c2LGoc1iwTPyYMMYH" 
          title="7 STEPS to READ &amp; UNDERSTAND the Holy Quran in Arabic - A step-by-step GUIDE - Arabic 101" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
      </div>
      <h2 className="text-3xl text-white font-bold mb-4 mt-16 text-center">Beneficial YouTube <br className="sm:hidden" />Channels</h2>
      {categories.map((category, index) => (
        <CategorySection key={index} title={category.title} channels={category.channels} />
      ))}
    </>
  );
};

export default Miscellaneous;
