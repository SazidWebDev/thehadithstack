import HadithCard from '@/components/HadithCard';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';
import TextLine from '@/components/TextLine';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Query = ({ API_KEY }) => {
  const router = useRouter();
  const query = router.query.query;
  const [hadiths, setHadiths] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [currentPage, setCurrentPage] = useState(
    parseInt(router.query.page, 10) || 1
  );
  const [found, setFound] = useState(false);
  const [loading, setLoading] = useState(true)

  const hadithData = async (url) => {
      const response = await fetch(url);
      const hadith = await response.json();
      if (hadith.status === 200) {
          setHadiths(hadith.hadiths.data);
          setPageData(hadith.hadiths);
          setFound(true);
          setCurrentPage(hadith.hadiths.current_page);
          setLoading(false)
        } else {
          setFound(false);
          setLoading(false)
      console.log(hadith);
      }
    };
    
    useEffect(() => {
    if (query) {
      const pageQuery = currentPage;
      if (!isNaN(parseInt(query))) {
        hadithData(
          `https://hadithapi.com/api/hadiths?apiKey=${API_KEY}&hadithNumber=${query}&page=${pageQuery}`
        );
      } else {
        hadithData(
          `https://hadithapi.com/api/hadiths?apiKey=${API_KEY}&hadithEnglish=${query}&page=${pageQuery}`
        );
      }
    }
  }, [query, currentPage, API_KEY]);
  
  const handlePageChange = (page) => {
    setLoading(true)
    setCurrentPage(page);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page }
    });
    setLoading(false)
  };

  return (
    <>
    {loading && <Loading></Loading>}
      <TextLine text={`Search Results for "${query}"`} />

      {found && hadiths &&
      <>
      <p className='text-center'>Cannot find your hadith? Try <Link href="/search" className='text-red-500 hover:underline underline-offset-2'>Advanced Search</Link></p>
        {hadiths.map(
          (hadith, index) =>
            hadith && (
              <HadithCard
                source="search"
                searchBookName={hadith.book?.bookName}
                query={query}
                key={index}
                {...hadith}
                chapter={hadith.chapter?.chapterEnglish}
              />
            )
        )}
      </>}

      {found && pageData && (
        <div className="container mx-auto p-4">
          <Pagination
            currentPage={pageData.current_page}
            lastPage={pageData.last_page}
            links={pageData.links}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {!found && <>
          <div className="bg-zinc-900 duration-300 md:hover:scale-[1.005] w-3/4 mx-auto mt-4 p-6 md:p-8 rounded-2xl shadow-lg shadow-red-500 overflow-hidden">
                <p className='text-center'>Hadiths not found! Try using a different query or <Link href="/search" className='text-red-500 hover:underline underline-offset-2'>Advanced Search</Link>.</p>
            </div></>}
    </>
  );
};

export default Query;
