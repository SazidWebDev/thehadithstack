import HadithCard from '@/components/HadithCard'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Hadithnumber = ({ API_KEY }) => {
  const router = useRouter()
  const [hadiths, setHadiths] = useState([])
  const [show, setShow] = useState(false)
  const { hadithnumber } = router.query

  const hadith = async () => {
    const localHadiths = JSON.parse(localStorage.getItem('random-hadiths'))
    if (!localHadiths || localHadiths.length === 0) {
      const response = await fetch(`https://hadithapi.com/api/hadiths?apiKey=${API_KEY}&hadithNumber=${hadithnumber}`)
      const hadith = await response.json()
      return hadith.length > 0 ? hadith : null
    } else {
      const hadith = localHadiths.find(hadith => hadith.hadithNumber == hadithnumber)
      return hadith ? [hadith] : null
    }
  }

  useEffect(() => {
    const hadithFunc = async () => {
      const hadiths = await hadith()
      if (!hadiths || hadiths.length === 0 || !hadiths[0] || hadiths[0].hadithNumber != hadithnumber) {
        setShow(true)
      } else {
        setHadiths(hadiths)
      }
    }
    if (hadithnumber) {
      hadithFunc()
    }
  }, [hadithnumber, API_KEY])

  return (
    <>
      {hadiths && hadiths.map((hadith, index) => hadith && <HadithCard source="random" bookName={hadith.book?.bookName} key={hadith.id} {...hadith} hadithBookSlug={hadith.bookSlug} />)}
      {show && (
        <div className='bg-zinc-950 duration-300 md:hover:scale-[1.005] w-3/4 mx-auto text-center font-semibold mt-4 p-6 md:p-8 rounded-2xl shadow-lg shadow-red-500 overflow-hidden'>
          <p className='text-xl'>Random hadith with number {hadithnumber} is not found 😥</p>
          <img src='https://gifdb.com/images/high/sad-man-crying-out-loud-meme-74loufg1hlyn7h48.webp' width={250} height={250} alt='sad-man-crying-out-loud-meme' className='mx-auto my-3 rounded-lg select-none pointer-events-none' draggable='false' />
          <Link href={'/'} className='bg-red-500 hover:bg-red-600 text-base py-2 duration-200 px-4 rounded-full'>Go Home</Link>
        </div>
      )}
    </>
  )
}

export default Hadithnumber
