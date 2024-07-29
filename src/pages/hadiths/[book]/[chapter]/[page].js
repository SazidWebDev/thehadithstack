import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import HadithCard from '@/components/HadithCard';
import TextLine from '@/components/TextLine';
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';
import Custom404Component from '@/components/Custom404Component';
import Head from 'next/head';

const Page = ({ API_KEY }) => {
  const router = useRouter();
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState(null);
  const page = router.query.page;

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await fetch(`https://hadithapi.com/api/hadiths?apiKey=${API_KEY}&book=${router.query.book}&chapter=${router.query.chapter}&page=${page}`);
        const data = await response.json();

        if (response.status === 404) {
          setHadiths([{ englishNarrator: "Hadiths not found!" }]);
        } else {
          setHadiths(data.hadiths.data);
          setPageData(data.hadiths);
          localStorage.setItem(`hadiths_${router.query.book}_${router.query.chapter}_${page}`, JSON.stringify(data));
        }
        setLoading(false);
      } catch (error) {
        setHadiths([{ englishNarrator: "Error while trying to get hadiths!" }]);
        setLoading(false);
      }
    };

    if (router.query.chapter && page) {
      const storedData = localStorage.getItem(`hadiths_${router.query.book}_${router.query.chapter}_${page}`);
      if (!storedData || storedData === '[]' || storedData === 'null' || storedData === 'undefined' || storedData === '{"chapters":[],"buttonShow":false}') {
        fetchData();
      } else {
        const parsedData = JSON.parse(storedData);
        setHadiths(parsedData.hadiths.data);
        setPageData(parsedData.hadiths);
        setLoading(false);
      }
    }
  }, [router.query.book, router.query.chapter, API_KEY, page]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        {hadiths[0]?.englishNarrator !== "Hadiths not found!" ? <title>{`${hadiths[0]?.book.bookName} - ${hadiths[0]?.chapter?.chapterEnglish || hadiths[0]?.chapter?.chapterArabic} - Page ${page} - The Hadith Stack`}</title> : <title>The Hadith Stack</title>}
      </Head>
      {hadiths[0]?.englishNarrator !== "Hadiths not found!" && (
        <TextLine text={`Hadiths - ${hadiths[0]?.chapter?.chapterEnglish || hadiths[0]?.chapter?.chapterArabic} - ${hadiths[0]?.book?.bookName}`} />
      )}
      {hadiths[0]?.englishNarrator !== "Hadiths not found!" ? (
        <div className="space-y-10">
          {hadiths.map((hadith) => (
            <HadithCard source="hadiths" chapter={hadith.chapter?.chapterEnglish} bookName={hadith.book?.bookName} key={hadith.id} {...hadith} hadithBookSlug={hadith.bookSlug} />
          ))}
          {pageData && (
            <div className="container mx-auto p-4">
              <Pagination
                currentPage={pageData.current_page}
                lastPage={pageData.last_page}
                links={pageData.links}
              />
            </div>
          )}
        </div>
      ) : (
        <Custom404Component />
      )}
    </>
  );
};

export default Page;