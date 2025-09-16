import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='border-t pt-10 text-2xl text-center'>
         <Title text1={'Contact'} text2={'US'}/>
      </div>

      <div className='flex flex-col md:flex-row my-10 justify-center gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt=''/>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-600'>23049 Hanuman Mandir Road <br/> Biratnagar, Nepal</p>
          <p className='text-gray-600'>Tel: 021-212134 <br/> Email: forever@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-600'>Lern more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300 rounded-2xl'>Explore</button>
        </div>
      </div>
      <NewsletterBox/>
      </div>
    
  )
}

export default Contact
