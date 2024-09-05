import React, { useState } from 'react';
import TextLine from '@/components/TextLine';
import Head from 'next/head';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const notify = (type, msg) => {
    toast[type](msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark"
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch('https://zidform.vercel.app/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '3961636fe33b846546dbac83c86c8c2420465384'
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        notify('success', 'Your message has been sent successfully!');
        setFormData({
          email: '',
          subject: '',
          message: '',
        })
      } else {
        notify('error', 'Failed to send your message. Please try again.');
        setFormData({
          email: '',
          subject: '',
          message: '',
        })
      }
    } catch (error) {
      notify('error', 'An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Contact - The Hadith Stack</title>
      </Head>
      <TextLine></TextLine>
      <div className="mx-auto w-[65%] mb-36">
        <h2 className="mb-4 text-3xl tracking-tight font-bold text-center text-white">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-zinc-200">Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="shadow-sm p-3 bg-zinc-800 border border-zinc-900 text-zinc-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full"
              placeholder="What's your email?"
              required={true}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <input type="hidden" name="from" id="from" value="thehadithstack" className='hidden'/>
          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-zinc-200">Subject</label>
            <input
              type="text"
              name="subject"
              id="subject"
              className="block p-3 w-full text-sm text-zinc-200 bg-zinc-800 rounded-lg border border-zinc-900 shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="How can I help you?"
              required={true}
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-zinc-200">Your message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              className="block p-2.5 w-full text-sm text-zinc-200 bg-zinc-800 rounded-lg shadow-sm border border-zinc-900 focus:ring-primary-500 focus:border-primary-500"
              placeholder="What are you saying?"
              required={true}
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            type="submit"
            name="submit"
            className="py-3 px-5 text-sm font-medium text-center bg-red-500 hover:bg-red-600 duration-200 sm:w-fit rounded-md"
          >
            Send message
          </button>
        </form>
      </div>
    </>
  );
}

export default Contact;
