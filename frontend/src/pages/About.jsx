import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt=""/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum similique tempora odio inventore nisi, officia soluta voluptatem sequi perspiciatis fuga dolore illum pariatur quam sunt reprehenderit facere quisquam! Quas, laboriosam.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo autem possimus praesentium! Laborum, repellendus fugit! Pariatur sequi nisi assumenda blanditiis dolor, accusamus fugit saepe tempora nam sint magnam quis amet.</p>
          <b className='text-gray-800'>Our Misson</b>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis labore velit iste fugit architecto laborum aperiam natus animi eos fugiat reprehenderit maxime at sit excepturi aut suscipit, veniam ex corrupti?</p>
        </div>
      </div>

      <div className='text-2xl py-4'>
         <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum deserunt harum a quidem velit optio temporibus nulla distinctio veniam dolorem tenetur ut, ab dolores, voluptatem eius ipsam facere magni hic?</p>
         </div>
         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum deserunt harum a quidem velit optio temporibus nulla distinctio veniam dolorem tenetur ut, ab dolores, voluptatem eius ipsam facere magni hic?</p>
         </div>
         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum deserunt harum a quidem velit optio temporibus nulla distinctio veniam dolorem tenetur ut, ab dolores, voluptatem eius ipsam facere magni hic?</p>
         </div>
      </div>
    <NewsletterBox/>  
    </div>
  )
}

export default About
