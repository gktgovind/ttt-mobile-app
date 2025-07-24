import * as React from 'react'
import { useDispatch } from 'react-redux';
import { updateloading } from '../../slices/counterSlice';
import { useEffect } from 'react';


const NotFound:any = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateloading(false))
  },[])

  return (
    <>
     <div className="p-5 text-center">
      <h6 style={{fontSize:"40px",fontWeight:"lighter"}}>Lost in our space</h6>
      <img src="/images/404.webp" className='d-block mb-4 m-auto text-center'/>
      <h3>Page you are looking for could not be found.</h3>
      <p>Meanwhile why not try out these useful links instead.</p>
      <div className='tags mt-4'>
        <a href='/package/kailash-mansarovar'>Home</a>
        <a href='/package/kailash-mansarovar'>Kailash Mansarovar Yatra</a>
        <a href='/package/adi-kailash'>Adi Kailash Yatra</a>
        <a href='/blogs'>Blogs</a>
        <a href='/faqs'>FAQs</a>
        <a href='/news'>News</a>

      </div>
     </div>
     </>
  )
}



export default NotFound;