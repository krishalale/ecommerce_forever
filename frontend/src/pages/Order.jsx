import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Order = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className='border-t pt-16'>
      {/* Title */}
      <div className='text-2xl'>
        <Title text1='MY' text2='ORDERS' />
      </div>

      {/* Orders List */}
      <div>
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:justify-between gap-4'
          >
            {/* Product Info */}
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt={item.name} />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-2 text-base text-gray-500'>
                  <p className='text-lg'>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>
                <p>
                  Date: <span className='text-gray-400'>25, Jul, 2025</span>
                </p>
              </div>
            </div>

            {/* Status & Button */}
            <div className='flex justify-between items-center w-full md:max-w-xs'>
              <div className='flex items-center gap-3'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>Ready to Ship</p>
              </div>
              <button className='border px-3 py-1 text-sm font-medium rounded-sm'>
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
