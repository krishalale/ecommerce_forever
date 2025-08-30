import React from 'react'

const NewsletterBox = () => {

  const onSubmitHandler = (e) => {
    e.preventDefault();
  }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe Now & Get 20% off</p>
      <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 gap-3 flex items-center mx-auto my-6 border border-gray-400 pl-3'>
        <input type='email' placeholder='Enter your email' className='w-full sm:flex-1 outline-none'/>
        <button className='bg-black text-white py-4 text-xs px-10'>Subscribe</button>
      </form>

    </div>
  )
}

export default NewsletterBox
