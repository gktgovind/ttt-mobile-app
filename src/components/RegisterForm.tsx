

import * as React from 'react';
import { useFormik } from "formik";
import { useState,useRef,useEffect } from 'react';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { signIn,} from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { updateShowLogin,updateloading } from '../../slices/counterSlice';
import { AddUser,VerifyUser,resendOTP } from '@/utils/api/Httproutes';
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2';
import { isValidPhoneNumber } from 'libphonenumber-js';
const schema = Yup.object().shape({
   email: Yup.string().required("E-mail is required"),
   mobile: Yup.number().required("Phone no is required"),
   password: Yup.string().required("Password is required").min(7),
});


const RegisterForm:any = () =>  {
   const inputRefs = useRef<any>([]);
   const [showOTP,setShowOTP] = useState(false);
   const [otpUser,setOtpUser] = useState({});
   const [userPass,setUserPass] = useState("");
   const [userMobile,setUserMobile] = useState(0);
   const [phoneerrors23, setErrors23] = useState("");
   const [getPhone23, setPhone23] = useState("");
   const [countryCode23, setCountryCode23] = useState('');
   const [seconds, setSeconds] = useState(60);
   const [isActive, setIsActive] = useState(false);
   const handlePhoneChange1 = (value: any, country: any) => {
       formik.setFieldValue('mobile', value)
       const strippedNumber = value.replace(`${country.dialCode}`, '').replace(/^0+/, '');
       setPhone23(strippedNumber);
       setCountryCode23('+' + country.dialCode);
   };
   useEffect(() => {
   
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
    }
    return () => clearInterval(interval);
}, [isActive, seconds]);

   const [otp, setOTP] = useState({
      digit1: '',
      digit2: '',
      digit3: '',
      digit4: ''
     });
     const [passwordVisible, setPasswordVisible] = useState(false);
     const togglePasswordVisibility = () => {setPasswordVisible(!passwordVisible);};
   const dispatch = useDispatch(); 
   const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
        mobile: "",
        countrycode: ""
      },
      validationSchema: schema,
      onSubmit: async ({ email, password,mobile }) => {
        let initialOb={
            source:"T2T",
            email: email,
            password: password,
            mobile: Number(getPhone23),
            location:{
              phonecode: countryCode23
            }
          }
          
          dispatch(updateloading(true));

          await AddUser(initialOb).then((res:any)=>{
            if (res.status === 200) {
              dispatch(updateloading(false));
               setOtpUser(res.data.user)
               setUserPass(initialOb.password)
               setUserMobile(res.data.user.mobile)
               toast.success(res.data.Message !=""?res.data.Message:"OTP has been sent to the mobile for verify")
               // toast.success(res.data.Message !=""?res.data.Message:"OTP has been sent to the mobile for verify")
              setShowOTP(true)

             }else{
              dispatch(updateloading(false));
               toast.error(res.data.message)  
             }
          }).catch((error:any)=>{
            dispatch(updateloading(false));
            toast.error(error.response.data.message)
          })
          
      },
    });
   const { errors, touched, values, handleChange, handleSubmit,resetForm } = formik;


   const handleOTPChange = (name:any, value:any,index:any) => {
      setOTP(prevOTP => ({
        ...prevOTP,
        [name]: value
      }));
      if(value.length > 0){
         inputRefs.current[index + 1]?.focus();
       }else{
         inputRefs.current[index - 1]?.focus();
       }
    };


    const handleOTPSubmit = async(e:any) => {
      dispatch(updateloading(true));
      e.preventDefault();
      const otpString = Object.values(otp).join('');
      if(otpString.length !== 4){
        toast.error("Pls verify OTP, It's sent on your registered mobile number");
      }else{
         let otp_obj={
            otp: otpString,
            user:otpUser,
        }
       const UserVerified=  await VerifyUser(otp_obj)
       if (UserVerified.status === 200){
         dispatch(updateShowLogin(false));
         dispatch(updateloading(false));
         const result:any = await signIn('credentials', {
            redirect: false,
            email: "",
            number:userMobile,
            password: userPass,
          });
          if (result.status === 200) {
            dispatch(updateloading(false));
            toast.success(`Welcome user`);
            dispatch(updateShowLogin(false));
          } else {
            dispatch(updateloading(false));
            toast.error("Invalid username or password");
          }

         

       }
      }
    }


    const resendOTPFunction = async (e: any) => {
     
      dispatch(updateloading(true))
      const otpSubmit = await resendOTP(getPhone23, countryCode23,)
          .then((response: any) => {
              if (response.status === 200) {
                  dispatch(updateloading(false))
                      setSeconds(60);
                      setIsActive(true);
                      toast.success(response.data.message);
              } else {
                  toast.error("Invalid OTP");
                  dispatch(updateloading(false))
              }
          })
          .catch((error: any) => {
              dispatch(updateloading(false))
              toast.error(error.response.data.message);
          })
  
}
const login_with_otp=()=>{
  setShowOTP(false)
}
  return (
   <>
    
                     

                   {showOTP ? (
                         <div className="click-to-call-inner" id="click_to_call_otp">
                         <h3 className='mt-3 font-semibold  '>Enter OTP</h3>
                         <p className='mb-0 text-gray-700'>Please enter the OTP sent to <img src='/images/new-icons/sms.svg' className='inline-block' width={"24px"} /></p>
                         <p className='text-gray-700'>{countryCode23}-{getPhone23} <a href="#!"><img src='/images/new-icons/edit.svg' className='inline-block' onClick={login_with_otp}  /></a></p>
                         <div className="d-flex mt-3 mb-3">
                          <input type="tel" className="shadow-md rounded-md px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 m-1 w-1/5 text-center font-semibold  " maxLength={1}   ref={(el:any) => (inputRefs.current[1] = el)} onChange={e => handleOTPChange("digit1", e.target.value,1)}/>
                          <input type="tel" className="shadow-md rounded-md px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 m-1 w-1/5 text-center font-semibold  " maxLength={1}   ref={(el:any) => (inputRefs.current[2] = el)} onChange={e => handleOTPChange("digit2", e.target.value,2)}/>
                          <input type="tel" className="shadow-md rounded-md px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 m-1 w-1/5 text-center font-semibold  " maxLength={1}   ref={(el:any) => (inputRefs.current[3] = el)} onChange={e => handleOTPChange("digit3", e.target.value,3)}/>
                          <input type="tel" className="shadow-md rounded-md px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 m-1 w-1/5 text-center font-semibold  " maxLength={1}  ref={(el:any) => (inputRefs.current[4] = el)} onChange={e => handleOTPChange("digit4", e.target.value,4)}/>
                          {/* <input type="tel" className="shadow-md rounded-md px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 m-1 w-1/5 text-center font-semibold  " maxLength={1}  ref={(el:any) => (inputRefs.current[5] = el)} onChange={e => handleOTPChange("digit5", e.target.value,5)}/>
                          <input type="tel" className="shadow-md rounded-md px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 m-1 w-1/5 text-center font-semibold  " maxLength={1}   ref={(el:any) => (inputRefs.current[6] = el)} onChange={e => handleOTPChange("digit6", e.target.value,6)}/> */}
                        </div>
                        {isActive ? (<>
                        <p className=' m-0 mb-2 text-sm font-semibold  '>Resend OTP in 00:{seconds}</p>
                     </>):(<>
                        <p className=' m-0 mb-2 text-sm font-semibold  '>Not received your code? <a href='#!' className='pt-1 pb-1 font-semibold text-sm' onClick={resendOTPFunction}> Resend Code</a></p>
                     </>)}
                         <button type="button" className="w-full  bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all mb-2" onClick={handleOTPSubmit}>Submit</button>
                       </div> 
                      ):(
                        <>
                         <div className='login-popup-head text-center'>
                  <h5 className='fw-bold pt-2 mb-1'>Welcome to</h5>
                  <img src='https://ik.imagekit.io/bsg4v2a8gn4/assets/img/pmp-red.png' style={{width:"80px",margin:"0 auto",display:"block"}} />
                  <p className='mb-0'>Please enter your mobile number to receive a verification code</p>
                  </div>
                        <form className="p-2" onSubmit={handleSubmit} method="POST">
                         <div className="mb-3 ">
                            <label htmlFor="email" className="font-semibold   text-sm">Enter E-mail*</label>
                            <input 
                              type="email" 
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              placeholder='E-mail *'
                              id="email"
                              className={errors.email ? "shadow-md rounded-md w-full px-3 py-2 border border-width-2 border-red-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 is-invalid" : "shadow-md rounded-md w-full px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"}
                             />
                            {errors.email && touched.email && <div id="formErrorName1"><small className="text-danger font-italic">{errors.email}</small></div>}
                         </div>

                         <div className="mb-3 ">
                            <label htmlFor="mobile" className="font-semibold   text-sm"> Mobile*</label>
                           
                            <PhoneInput
                                country={'in'}
                                defaultMask=".............."
                                alwaysDefaultMask={true}
                                countryCodeEditable={false}
                                value={formik.values.mobile}
                                // onChange={mobileno => formik.setFieldValue('mobileno', mobileno)}
                                onChange={handlePhoneChange1}
                                placeholder="Enter your phone number *"
                                inputClass={`max-w-100 !py-2 bg-gray-900 border ${phoneerrors23 ? "shadow-md rounded-md w-full px-3 py-2 border border-width-2 !border-red-500 !focus:outline-none !focus:ring-indigo-500 !focus:border-indigo-500" : "shadow-md rounded-md w-full px-3 py-2 border border-width-2 !border-gray-500 !focus:outline-none !focus:ring-indigo-500 !focus:border-indigo-500"} rounded`}
                                containerClass="max-w-100"

                                inputProps={{
                                    name: 'mobile',
                                    required: true,
                                     
                                    autoComplete: "off",
                                }}
                                onBlur={(e:any) => {
                                    const { value } = e.target;
                                    const formattedValue = value.replace(/-/g, '').replace(/\s/g, '-');
                                    if (!isValidPhoneNumber(formattedValue)) {
                                        setErrors23("Invalid phone number");
                                    } else {
                                        setErrors23("");
                                    }
                                }}
                            />
                            {phoneerrors23 && <div id="formErrorName1"><small className="text-danger font-italic">{phoneerrors23}</small></div>}
                            {/* <input 
                              type="tel" 
                              name="mobile"
                              value={values.mobile}
                              onChange={handleChange}
                              id="mobile"
                              className={errors.mobile ? "shadow-md rounded-md w-full px-3 py-2 border border-width-2 border-red-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 is-invalid" : "shadow-md rounded-md w-full px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"}
                             />
                            {errors.mobile && touched.mobile && <div id="formErrorName1"><small className="text-danger font-italic">{errors.mobile}</small></div>} */}
                         </div>

                         <div className="mb-1 ">
                            <label htmlFor="password" className="font-semibold   text-sm">Enter your Password *</label>
                            <div className="input-group relative">
                               <input 
                                 type={passwordVisible ? 'text' : 'password'}
                                 name="password"
                                 value={values.password}
                                 onChange={handleChange}
                                 id="password"
                                 placeholder='Password *'
                                 className={errors.password ? "shadow-md rounded-md w-full px-3 py-2 border border-width-2 border-red-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 is-invalid" : "shadow-md rounded-md w-full px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"}
                                 />
                               <span className="input-group-text absolute top-4 right-5 cursor-pointer" onClick={togglePasswordVisibility}>
                                  <img src="/images/icons/1x/password-eye.svg" style={{width:'24px'}} />
                               </span>
                             </div>
                             {errors.password && touched.password  && <div id="formErrorName1"><small className="text-danger font-italic">{errors.password}</small></div>}
                         </div>
                         <div className="d-flex text-center mt-3">
                         <button type="submit" className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-all mb-2">Sign Up</button>
                        </div>
                      </form>
                      {/* <div className="social-login text-white p-3 text-center">
                         <p>Login In Using Social Network</p>
                         <div className="d-block text-center">
                            <Link href="#!" className="p-1"><img src="/images/icons/facebook.png" alt="Facebook" title="Facebook" /></Link> 
                            <Link href="#!" className="p-1"><img src="/images/icons/google.png" alt="Google" title="Goolge" /></Link>
                         </div>
                      </div> */}
                      </>)
                     }
                    
  </>
  )
}



export default RegisterForm;