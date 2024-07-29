import HadithCard from '@/components/HadithCard';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';
import TextLine from '@/components/TextLine';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const Search = ({ API_KEY }) => {
  const router = useRouter();
  const [hadiths, setHadiths] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [currentPage, setCurrentPage] = useState(parseInt(router.query.page, 10) || 1);
  const [found, setFound] = useState(true);
  const [bookSelect, setBookSelect] = useState('');
  const [bookSelectText, setBookSelectText] = useState('All Books');
  const [searchSelect, setSearchSelect] = useState('hadithNumber');
  const [searchSelectText, setSearchSelectText] = useState('Hadith Number');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const baseUrl = `https://hadithapi.com/api/hadiths?apiKey=${API_KEY}`;

  useEffect(() => {
    // Set loading only if we are on the initial load or if the page number changes
    if (router.query.page) {
      setCurrentPage(parseInt(router.query.page, 10));
    }
  }, [router.query.page]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setCurrentPage(1);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1 }
    });
    fetchHadiths(1);
  };
  
  const fetchHadiths = (page) => {
    setLoading(true);
    let url = `${baseUrl}&page=${page}`;

    if (bookSelect) {
      url += `&book=${bookSelect}`;
    }

    if (searchSelect && searchInput) {
      url += `&${searchSelect}=${searchInput}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setHadiths(data.hadiths.data);
          setPageData(data.hadiths);
          setFound(true);
        } else if (data.status === 404) {
          setFound(false);
          setHadiths([]);
          setPageData(null);
        } else {
          setFound(false);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setFound(false);
        setLoading(false);
      });
  };

  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
    fetchHadiths(page);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page }
    });
  };

  return (
    <>
      {loading && <Loading />}
      <Head>
        <title>{bookSelectText} - {searchSelectText} - {searchInput} Advanced Search - The Hadith Stack</title>
      </Head>
      <TextLine text="Advanced Search" />
      <form
        id="searchForm"
        onSubmit={handleSubmit}
        className="mb-6 mt-2 flex justify-center w-[75%] mx-auto space-y-4 flex-col md:flex-row md:space-y-0 md:space-x-2"
      >
        <select
          id="book-select"
          className="block min-w-40 p-2 text-sm border rounded-lg focus:ring-red-500 focus:border-red-500 bg-zinc-900 border-zinc-800 text-white"
          value={bookSelect}
          onChange={(e) => {
            setBookSelect(e.target.value);
            setBookSelectText(e.target.options[e.target.selectedIndex].text);
          }}
        >
          <option value="" defaultChecked>All Books</option>
          <option value="sahih-bukhari">Sahih Bukhari</option>
          <option value="sahih-muslim">Sahih Muslim</option>
          <option value="al-tirmidhi">Jami&#39; Al-Tirmidhi</option>
          <option value="abu-dawood">Sunan Abu Dawood</option>
          <option value="ibn-e-majah">Sunan Ibn-e-Majah</option>
          <option value="sunan-nasai">Sunan An-Nasa&#39;i</option>
          <option value="mishkat">Mishkat Al-Masabih</option>
        </select>
        <select
          id="search-select"
          className="min-w-40 p-2 text-sm border rounded-lg focus:ring-red-500 focus:border-red-500 bg-zinc-900 border-zinc-800 text-white"
          value={searchSelect}
          onChange={(e) => {
            setSearchSelect(e.target.value);
            setSearchSelectText(e.target.options[e.target.selectedIndex].text);
          }}
        >
          <option value="hadithNumber" defaultChecked>Hadith Number</option>
          <option value="hadithEnglish">Words in English</option>
          <option value="chapter">Chapter number</option>
        </select>
        <input
          type="search"
          id="default-search"
          className="block flex-1 p-2 text-sm border rounded-lg focus:ring-red-500 focus:border-red-500 bg-zinc-900 border-zinc-800 placeholder-zinc-400 text-white"
          placeholder="Search for Hadith"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          required
        />
        <button
          type="submit"
          className="duration-200 text-white focus:ring-4 focus:outline-none focus:ring-red-500 font-medium rounded-lg text-sm px-4 py-2 bg-red-500 hover:bg-red-600"
        >
          Search
        </button>
      </form>

      {found && hadiths.length > 0 && (
        <>
          <p className="text-center">Searching {searchSelectText} &quot;<span className="text-red-500">{searchInput}</span>&quot; in {bookSelectText}...</p>
          {hadiths.map((hadith, index) => (
            <HadithCard
              source="search"
              searchBookName={hadith.book?.bookName}
              query={searchInput}
              key={index}
              {...hadith}
              chapter={hadith.chapter?.chapterEnglish}
              type={searchSelect}
            />
          ))}
          {pageData && (
            <div className="container mx-auto p-4">
              <Pagination
                currentPage={pageData.current_page}
                lastPage={pageData.last_page}
                links={pageData.links}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}

      {!found && (
        <div className="bg-zinc-900 duration-300 md:hover:scale-[1.005] w-3/4 mx-auto mt-4 p-6 md:p-8 rounded-2xl shadow-lg shadow-red-500 overflow-hidden">
          <p className="text-center">No results found! Try using a different query.</p>
        </div>
      )}
    </>
  );
};

export default Search;
