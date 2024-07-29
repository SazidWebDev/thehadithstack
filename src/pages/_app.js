import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import Home from "@/components/Home";
import RandomHadith from "@/components/RandomHadith";
import { usePathname } from 'next/navigation'
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const pathname = usePathname()
  const API_KEY = process.env.API_KEY
  const [loading, setLoading] = useState(true)
  return <>
    <Navbar />
    <div className="mt-20"></div>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      className="mt-12"
    />
    {pathname === "/" && <RandomHadith API_KEY={API_KEY} />}
    <Home />
    <main>
      <Component loading={loading} setLoading={setLoading} API_KEY={API_KEY} {...pageProps} />
    </main>
    <Footer></Footer>
  </>;
}
