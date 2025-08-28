import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);

    useEffect(() => {
        const bestSellers = products.filter((item) => (item.bestseller));
        setBestSeller(bestSellers.slice(0,5));
    }, []);
  return (
    <div className='my-10'>
        <div className='text-3xl text-center py-8'>
           <Title text1='Best' text2='Sellers' />
           <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            bestSeller.map((item,index) => (
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
        }

    </div>
        
      
    </div>
  )
}

export default BestSeller
