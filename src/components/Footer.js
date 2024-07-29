import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-zinc-900 mt-20 text-white text-sm">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1">
            <h2 className="text-lg font-semibold mb-4 text-red-500">About Me</h2>
            <p className="mb-2">I&apos;m Sazid, a Full Stack Web Developer.</p>
            <Link 
              href="https://sazidfullstack.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline-offset-4 decoration-2 underline hover:decoration-red-500 transition duration-200"
            >
              Visit my portfolio to learn more about me.
            </Link>
          </div>
          <div className="col-span-1">
            <h2 className="text-lg font-semibold mb-4 text-red-500">Contact</h2>
            <p className="mb-2">
              Email: 
              <Link
                href="mailto:subenglishschool@gmail.com" 
                className="underline-offset-4 decoration-2 underline hover:decoration-red-500 transition duration-200 ml-1"
              >
                subenglishschool@gmail.com
              </Link>
            </p>
            <p>
              Or use the 
              <Link 
                href="/contact" 
                className="underline-offset-4 decoration-2 underline hover:decoration-red-500 transition duration-200 ml-1"
              >
                contact page.
              </Link>
            </p>
          </div>
        </div>
        <hr className="my-8 border-zinc-700" />
        <p className="text-center -my-2 text-sm">&copy; 2024 The Hadith Stack. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
