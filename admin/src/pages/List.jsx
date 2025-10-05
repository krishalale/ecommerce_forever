import React from 'react'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendURL, currency } from '../App';

const List = ({token}) => {


  const [list,setList] = useState([]);

  const fetchList = async() =>{
    try{
      const response = await axios.get(backendURL+'/api/product/list');
      if (response.data.success){
        toast.success(response.data.message);
        setList(response.data.products);
      }else{
        toast.error(response.data.message);
      }

    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }

  const removeProduct = async(id) =>{
    try {
      const response = await axios.post(backendURL+'/api/product/remove/',{id},{headers:{token}});
      if (response.data.success){
        toast.success(response.data.message);
        fetchList();
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div>
      <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* Table Headings */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Categorty</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {/* Table Items */}
        {
          list.map((item,index)=>(
            <div className='grid grid-cols-3 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border text-sm]' key={index}>
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={()=>removeProduct(item._id)} className='md:text-center cursor-pointer text-lg border bg-red-800 px-2 py-2 text-white border-black justify-self-start sm:justify-self-center'>Delete</p>
            </div>
          ))
        }
      </div>
      </>
    </div>
  )
}

export default List
