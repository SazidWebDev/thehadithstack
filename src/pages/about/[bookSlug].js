import AboutCard from '@/components/AboutCard';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'

const BookSlug = () => {
    const router = useRouter()
    const bookSlug = router.query.bookSlug
    const dataBookSlug = [
        "sahih-bukhari",
        "sahih-muslim",
        "al-tirmidhi",
        "abu-dawood",
        "ibn-e-majah",
        "sunan-nasai",
        "mishkat"
      ]
    const aboutIndex = dataBookSlug.indexOf(bookSlug)
  return (
    <>
    <Head>
      <title>About - The Hadith Stack</title>
    </Head>
    <AboutCard textLineVisible={true} aboutIndex={aboutIndex}/></>
  )
}

export default BookSlug