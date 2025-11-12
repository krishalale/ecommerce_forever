import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


const Order = () => {
  const { backendUrl,token, currency } = useContext(ShopContext);
  
  const [orderData,setOrderData] = useState([])

  const loadOrderData = async () => {
  try {
    if (!token) {
      return null;
    }

    const response = await axios.post(
      backendUrl + '/api/order/userorders',
      {},
      { headers: { token } }
    );
    console.log('Order data response:', response.data);

    if (response.data.success) {
      let allOrdersItem = [];

      response.data.orders.map((order) => {
        order.items.map((item) => {
          item['status'] = order.status;
          item['payment'] = order.payment;
          item['paymentMethod'] = order.paymentMethod;
          item['date'] = order.date;
          allOrdersItem.push(item);
        });
      });
      setOrderData(allOrdersItem.reverse());
    }
  } catch (error) {
    console.log('Error loading orders:', error);
  }
};


  useEffect(()=>{
    loadOrderData()
  },[])
  return (
    <div className='border-t pt-16'>
      {/* Title */}
      <div className='text-2xl'>
        <Title text1='MY' text2='ORDERS' />
      </div>

      {/* Orders List */}
      <div>
        {
        orderData.map((item, index) => (
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
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p>
                  Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span>
                </p>
                <p>
                  Item: <span className='text-gray-400'>{item.payment}</span>
                </p>
              </div>
            </div>

            {/* Status & Button */}
            <div className='flex justify-between items-center w-full md:max-w-xs'>
              <div className='flex items-center gap-3'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              <button onClick={loadOrderData} className='border px-3 py-1 text-sm font-medium rounded-sm'>
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
