import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ChapterCard from '@/components/ChapterCard'
import TextLine from '@/components/TextLine'
import Loading from '@/components/Loading'
import Head from 'next/head'

const BookSlugName = ({ API_KEY }) => {
  const router = useRouter()
  const [chapters, setChapters] = useState({ chapters: [], buttonShow: false })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chapterData = await fetch(`https://hadithapi.com/api/${router.query.bookSlugName}/chapters?apiKey=${API_KEY}`);
        const chaptersData = await chapterData.json();
        if (chaptersData.status === 404) {
          setChapters({ chapters: [{ chapterEnglish: "Chapters not found!" }], buttonShow: false });
        } else {
          setChapters({ chapters: chaptersData.chapters, buttonShow: true });
          localStorage.setItem(`chapters_${router.query.bookSlugName}`, JSON.stringify({ chapters: chaptersData.chapters, buttonShow: true }));
        }
        setLoading(false);
      } catch (error) {
        setChapters({ chapters: [{ chapterEnglish: "Error while trying to get chapters!" }], buttonShow: false });
        setLoading(false);
      }
    };

    if (router.query.bookSlugName) {
      if (!localStorage.getItem(`chapters_${router.query.bookSlugName}`) || localStorage.getItem(`chapters_${router.query.bookSlugName}`) === '[]' || localStorage.getItem(`chapters_${router.query.bookSlugName}`) === 'null' || localStorage.getItem(`chapters_${router.query.bookSlugName}`) === 'undefined' || localStorage.getItem(`chapters_${router.query.bookSlugName}`) === '{"chapters":[],"buttonShow":false}') {
        fetchData();
      } else {
        setChapters(JSON.parse(localStorage.getItem(`chapters_${router.query.bookSlugName}`)));
        setLoading(false);
      }
    }

  }, [router.query.bookSlugName, API_KEY])
  const bookSlug = [
    "sahih-bukhari",
    "sahih-muslim",
    "al-tirmidhi",
    "abu-dawood",
    "ibn-e-majah",
    "sunan-nasai",
    "mishkat"
  ]

  const bookName = [
    "Sahih Bukhari",
    "Sahih Muslim",
    "Jami' Al-Tirmidhi",
    "Sunan Abu Dawood",
    "Sunan Ibn-e-Majah",
    "Sunan An-Nasa`i",
    "Mishkat Al-Masabih"
  ];

  const aboutIndex = bookSlug.indexOf(router.query.bookSlugName)


  return (
    <>
    {loading && <Loading></Loading>}
    <Head>
      {<title>{`Chapters - ${bookName[aboutIndex]} - The Hadith Stack`}</title>}
    </Head>
      <TextLine text={`Chapters - ${bookName[aboutIndex]}`}></TextLine>
      <div className="space-y-10">
        {chapters && chapters.chapters && chapters.chapters.map(chapter => (
          <ChapterCard key={chapter.id} {...chapter} buttonShow={chapters.buttonShow} />
        ))}
      </div>
    </>
  );
}

export default BookSlugName
