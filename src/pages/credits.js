import TextLine from '@/components/TextLine'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Credits = () => {
  return (
    <>
    <Head>
      <title>Credits - The Hadith Stack</title>
    </Head>
    <TextLine></TextLine>
    <div className="bg-zinc-950 duration-300 w-[75%] text-white mx-auto mt-4 p-6 md:p-8 rounded-2xl text-center shadow-lg shadow-red-500">
      <h1 className="text-3xl font-semibold mb-4">Credits</h1>
      <p className="mb-4">The Hadith Stack website was developed and implemented with love and dedication by Muhammed Sazid Ul Bari. We would like to extend our appreciation to the following resources:</p>
      <ul className="list-disc pl-6 mb-4 font-normal">
        <li> Hadith API for providing Hadith data. <Link href="https://www.hadithapi.com/docs/hadiths" target="_blank" className="underline-offset-4 decoration-2 underline hover:decoration-red-500">Check out the Hadith API.</Link></li>
        <li><Link href="https://www.wikipedia.org/" target="_blank" className="underline-offset-4 decoration-2 underline hover:decoration-red-500">wikipedia.org</Link> for providing data in about page.</li>
      </ul>
      <p>If you have any suggestions or feedback, please feel free to contact us at <Link href="mailto:subenglishschool@gmail.com" className="underline-offset-4 decoration-2 underline hover:decoration-red-500">subenglishschool@gmail.com</Link> or used the <Link href="/contact" className="underline-offset-4 decoration-2 underline hover:decoration-red-500">contact page.</Link></p>
    </div>
    </>
  )
}

export default Credits