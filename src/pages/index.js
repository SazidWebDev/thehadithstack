import Actions from "@/components/Actions";
import BookCard from "@/components/BookCard";
import Loading from "@/components/Loading";
import TextLine from "@/components/TextLine";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home({ API_KEY }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const bookData = await fetch(`https://hadithapi.com/api/books?apiKey=${API_KEY}`);
      const books = await bookData.json();
      localStorage.setItem("books", JSON.stringify(books.books));
      setBooks(books.books);
      setLoading(false);
    };

    if (!localStorage.getItem("books") || localStorage.getItem("books") === '[]' || localStorage.getItem("books") === 'null' || localStorage.getItem("books") === 'undefined') {
      fetchData();
    } else {
      setBooks(JSON.parse(localStorage.getItem("books")));
      setLoading(false);
    }
  }, [API_KEY])

  return (
    <>
    <Head>
    <title>The Hadith Stack</title>
    </Head>
      <Actions></Actions>
      <TextLine text="Collected Books"></TextLine>
      {loading && <Loading></Loading>}
      <div className="space-y-10 md:space-y-8">
        {books && books.map(book => book.bookSlug == "musnad-ahmad" || book.bookSlug == "al-silsila-sahiha" ? "" : <BookCard key={book.id} {...book}></BookCard>)}
      </div>
    </>
  );
}