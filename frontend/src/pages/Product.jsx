import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/shopContext';
import { assets } from '../assets/assets';

const Product = () => {

  const {productId} = useParams();
  const {products,currency} = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('');
  const [size,setSize] = useState('');

  const fetchProductData = async () => {
     products.map((item)=>{
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
     })
  }

  useEffect(() => { fetchProductData()
  }, [productId, products])

  return productData?(
    <div className='border-t-2 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
           {/* product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' onClick={()=> setImage(item)}/>
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src = {image} alt =""/>
          </div>
        </div>
        {/* product details */}
        <div className='flex-1'>
          <h1 className='text-2xl font-medium mb-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_dull_icon} className='w-3.5' alt="" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
               <p>Select Size</p>
               <div className='flex gap-2'>
                {
                  productData.sizes.map((item,index)=>(
                      <button onClick={()=> setSize(item)} className={`border py-2 px-4 bg-gray-100 cursor-pointer ${item === size? 'border-orange-500' : ''}`} key={index}>{item}</button>
                  ))
                }
               </div>
          </div>
          <button className='bg-black text-white px-8 py-3 text-sm active:bg-white active:text-black'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on Delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* descriptio and review section */}
      
    </div>
  ) : <div className='opacity-0'>

  </div>
}

export default Product
