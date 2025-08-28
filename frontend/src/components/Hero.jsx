import React from 'react'
import { assets } from '../assets/assets.js'

const Hero = () => {
  return (

    // Hero Left Side
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        <div className='sm:w-1/2 w-full flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                   <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                   <p className='font-medium text-sm md:text-base'>OUR BEST ARRIVALS</p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-realxed'>Latest Arrivals</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base'>Shop Now</p>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                </div>

            </div>
        </div>

        {/* Hero Right Side */}
       <img src={assets.hero_img} alt="Hero" className='sm:w-1/2 w-full h-full object-cover' />

      
    </div>
  )
}

export default Hero
