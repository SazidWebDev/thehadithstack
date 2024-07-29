import AboutCard from '@/components/AboutCard'
import TextLine from '@/components/TextLine'
import Head from 'next/head'
import React from 'react'

const About = () => {
  return (
    <>
    <Head>
      <title>About - The Hadith Stack</title>
    </Head>
    <TextLine text="About Compilers"></TextLine>
    <div className="space-y-10">
    {[...Array(7)].map((_, i) => (
      <AboutCard textLineVisible={false} key={i} aboutIndex={i} />
    ))}
    </div>
    </>
  )
}

export default About