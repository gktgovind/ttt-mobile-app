import * as React from 'react';
import { useState, useEffect } from 'react';


import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { updateShowLogin } from '../../slices/counterSlice';
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { motion } from 'framer-motion';


const Login: any = () => {
   const dispatch = useDispatch();
   const showLoginState = useSelector((state: any) => state.counter.showlogin);
   const [isMobile, setIsMobile] = useState(false);

   const { data: session, status } = useSession();
   const [showLogin, setShowLogin] = useState(false);
   const [showForm, setShowForm] = useState(false);

   useEffect(() => {
      setShowLogin(showLoginState);

      const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);

   }, [showLoginState]);


   const closeLogin = () => {
      dispatch(updateShowLogin(false));

   }

   const Sign_Up_form = () => {
      setShowForm(true)
   }
   const Sign_In_form = () => {
      setShowForm(false)
   }

   return (
      <>

         {showLogin && (<>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex md:items-center md:justify-center items-end z-20">
               <motion.div
                  initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.9, y: 20 }}
                  animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
                  exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.9, y: 20 }}
                  transition={isMobile ? { duration: 0.3, ease: "easeInOut" } : { duration: 0.3, type: "spring", bounce: 0.3 }}
                  className={`bg-white dark:bg-gray-800 shadow-2xl 
                    ${isMobile ? "rounded-t-2xl fixed inset-x-0 bottom-0 w-full" : "rounded-lg md:w-96 w-full"}`}
               >
                  <div className="modal-dialog login-popup relative" style={{ maxWidth: "400px" }}>
                     <button type="button" className="w-[20px] absolute right-5 top-5" data-bs-dismiss="modal" aria-label="Close" onClick={closeLogin}><img src='/images/close.svg' /></button>

                     <div className="modal-content p-5  ">
                        <div className="modal-body" >
                           <div className="row">

                              {
                                 showForm ? <RegisterForm /> : <LoginForm />
                              }

                           </div>
                           <p className='text-center'>{showForm ? <Link href="#" className="text-sm font-semibold mt-3 block" onClick={Sign_In_form}>Login In</Link> : <Link href="#" className="text-sm font-semibold mt-5 block" onClick={Sign_Up_form}>Create Account</Link>}</p>

                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
         </>)}

      </>
   )
}



export default Login;