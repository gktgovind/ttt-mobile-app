import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { signIn, useSession } from 'next-auth/react';
import { getLoginOtp, AddToCart,resendOTP,forgotPassword,otpVerifyForReset,resetPassword } from '@/utils/api/Httproutes';
import { useDispatch, useSelector } from 'react-redux';
import { updateShowLogin,updateloading, confirmToClickedOnBookingBtn,clickOnKMYRBtn } from '../../slices/counterSlice';
import { isValidPhoneNumber } from 'libphonenumber-js';
import PhoneInput from 'react-phone-input-2';


const schema = Yup.object().shape({
   email: Yup.string()
   .email('Invalid email address') // This checks if the email format is correct
   .required('E-mail is required'),   // This makes the email field mandatory
  password: Yup.string().required("Password is required").min(7),
});

const resetPasswordSchema = Yup.object().shape({
   newpassword: Yup.string()
      .required('New Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[@$!%*#?&]/, 'Password must contain at least one special character: @$!%*#?&'),
   
   confirmpassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('newpassword'), ""], 'Passwords must match')
});


const LoginForm: any = () => {
   const dispatch = useDispatch();
   const showLoginState = useSelector((state: any) => state.counter.showlogin);
   const bookPkgDetails = useSelector((state: any) => state.counter.bookPkg);
   const bookingBtn = useSelector((state: any) => state.counter.ClickedOnBooking);
   const kmyRbtn = useSelector((state: any) => state.counter.clickOnKMYRegistrationBtn);
   const { data: session, status } = useSession();
   const inputRefs = useRef<any>([]);
   const [showLogin, setShowLogin] = useState(false);
   const [showBookingBtn, setShowBookingBtn] = useState(false);
   const [BookPkgDetails, setBookPkgDetails] = useState(bookPkgDetails);
   const [loginWith,setLoginWith] = useState(true);

   const [showOTP, setShowOTP] = useState(false);
   const [showEmailOTP, setShowEmailOTP] = useState(false);
   const [showEmailPassword, setShowEmailPassword] = useState(false);
   const [getVerifytoken, setVerifytoken] = useState("");

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
   const [otp, setOTP] = useState({
      digit1: '',
      digit2: '',
      digit3: '',
      digit4: ''
   });
   const [passwordVisible, setPasswordVisible] = useState(false);

   const togglePasswordVisibility = () => {
     setPasswordVisible(!passwordVisible);
   };
 
   
   useEffect(() => {
      if (status === "unauthenticated") {
         setShowLogin(showLoginState);
         setShowBookingBtn(bookingBtn);
      } else {
         setShowLogin(false);
      }
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
  }, [showLoginState,isActive, seconds]);

   const formik = useFormik({
      initialValues: {
         email: "",
         password: "",
      },
      validationSchema: schema,
      
      onSubmit: async ({ email, password }) => {
         dispatch(updateloading(true));

       //  let emailExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
         let mobileNo = 0;
         let emailValid = "";


         const result: any = await signIn('credentials', {
            redirect: false,
            email: email,
            number: mobileNo,
            password: password,
         });
         if (result.status === 200) {
            toast.success(`Welcome user`);
            dispatch(updateShowLogin(false));
            
            if (showBookingBtn) {
               dispatch(confirmToClickedOnBookingBtn(false));
               addCartApi(BookPkgDetails[0].pkgId, BookPkgDetails[0].pgkDate)
            }
            if(kmyRbtn==true){
               window.location.href = "/registration/kmy/add";
               dispatch(clickOnKMYRBtn(false))
            }
         } else {
            dispatch(updateloading(false));
            toast.error("Invalid username or password");
         }
      },
   });


   const formikResetPassword = useFormik({
      initialValues: {
         verifytoken:"",
         newpassword: "",
         confirmpassword: "",
      },
      validationSchema: resetPasswordSchema,
      onSubmit: async ({newpassword, confirmpassword }) => {
         const otpSubmit = await resetPassword(getVerifytoken,newpassword, confirmpassword,)
         .then((response: any) => {
             if (response.status === 200) {
                 dispatch(updateloading(false))
                     setSeconds(60);
                     setIsActive(true);
                     toast.success(response.data.message);
                     setLoginWith(false)
                     setShowEmailPassword(false)

             } else {
                 toast.error("Invalid OTP");
                 dispatch(updateloading(false))
             }
         })
         .catch((error: any) => {
             dispatch(updateloading(false))
             toast.error(error.response.data.message);
         })
      },
   });
   const { errors, touched, values, handleChange, handleSubmit, resetForm } = formik;


   const login_with_otp=()=>{
      setLoginWith(true)
      setShowOTP(false)
   }
   const login_with_password=()=>{
      setLoginWith(false)
   }

   async function addCartApi(package_id: any, pkyDate: any) {
      const cart = await AddToCart(package_id, pkyDate)
         .then((response) => {
            if (response.status === 200) {
               window.location.href = "/check-out"
            }
         })
         .catch((error) => {
            toast.error("Something unexpected happened or please try again later");
         })
   }

   const getUserOtp = async (e: any) => {
      e.preventDefault();
      const phoneTestReg = /^\d{10}$/;
      const isValidPhoneNumber = phoneTestReg.test(values.email);
      if (phoneerrors23!="Invalid phone number" && phoneerrors23=="" && getPhone23 !="") {
         dispatch(updateloading(true));
         const getOtp = await getLoginOtp(getPhone23,countryCode23).then((response) => {
               if (response.status === 200 && response.data.statuscode === 200) {
                  toast.success("Please check OTP sent on your phone number")
                  setShowOTP(true);
                  setErrors23("")
                  setSeconds(60);
                  setIsActive(true);
                  dispatch(updateloading(false));
                  
               } else {
                   toast.error("Please enter a valid phone number");
                   dispatch(updateloading(false));

               }
            })
            .catch((error) => {
               dispatch(updateloading(false));
               toast.error("Something unexpected happened or please try again later");
            })
      } else {
         setErrors23("Phone number must be required")
         // toast.error("Please enter a valid phone number")
      }
   }

   const handleOTPChange = (name: any, value: any, index: any) => {
      setOTP(prevOTP => ({
         ...prevOTP,
         [name]: value
      }));
      if (value.length > 0) {
         inputRefs.current[index + 1]?.focus();
      } else {
         inputRefs.current[index - 1]?.focus();
      }
   };

   const handleOTPSubmit = async (e: any) => {
      dispatch(updateloading(true));
      e.preventDefault();
      const otpString = Object.values(otp).join('');
      if (otpString.length !== 4) {
         dispatch(updateloading(false));
         toast.error("Pls verify OTP, It's sent on your registered mobile number");
      } else {
         const result: any = await signIn('credentials', {
            redirect: false,
            otp: otpString,
            number: getPhone23,
         });
         if (result.status === 200) {
            dispatch(updateloading(false));
            toast.success(`Welcome user`);
            dispatch(updateShowLogin(false));
            setPhone23('')
            if (showBookingBtn) {
               dispatch(confirmToClickedOnBookingBtn(false));
               addCartApi(BookPkgDetails[0].pkgId, BookPkgDetails[0].pgkDate)
            }
            if(kmyRbtn==true){
               window.location.href = "/registration/kmy/add";
               dispatch(clickOnKMYRBtn(false))
            }
         } else {
            dispatch(updateloading(false));
            toast.error("Pls verify OTP, It's sent on your registered mobile number.");
         }
      }
   }

   const closeLogin = () => {
      dispatch(updateShowLogin(false));
      resetForm();
      setShowOTP(false);
      setOTP({
         digit1: '',
         digit2: '',
         digit3: '',
         digit4: ''
      })

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
const forgotPasswordFunction = async (email:any) => {
     
   dispatch(updateloading(true))
   const otpSubmit = await forgotPassword(email)
       .then((response: any) => {
           if (response.status === 200) {
               dispatch(updateloading(false))
                   setSeconds(60);
                   setShowEmailOTP(true);
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
const handleEmailOTPSubmit = async (email:any) => {
     
   dispatch(updateloading(true))
   const otpString = Object.values(otp).join('');
   const otpSubmit = await otpVerifyForReset(email,otpString)
       .then((response: any) => {
           if (response.status === 200) {
               dispatch(updateloading(false))
                   setSeconds(60);
                    setShowEmailOTP(false);
                    setShowEmailPassword(true);
                    setVerifytoken(response.data.verifiyToken)
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


   return (
      <>
      {showEmailPassword ? (<>
         <div className="" id="">
                     <h3 className='mt-3'>Set New Password</h3>
                     <p className='mb-0 lh-sm'>Must be atleast 8 characters in length and should contain at least one alphabet, one number and one special character @$!%*#?&</p>
                     <form className="p-2 text-start" onSubmit={formikResetPassword.handleSubmit} method="POST">
                        
                     <div className="mb-1 ">
                           <label htmlFor="newpassword" className="text-sm font-semibold  ">New Password *</label>
                           <div className="input-group">
                              <input
                                 type={passwordVisible ? 'text' : 'password'}
                                 name="newpassword"
                                 value={formikResetPassword.values.newpassword}
                                 onChange={formikResetPassword.handleChange}
                                 id="newpassword"
                                 placeholder='New Password *'
                                 className={formikResetPassword.errors.newpassword ? "shadow-md rounded-md w-full px-3 py-2 border border-width-2 border-red-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 is-invalid" : "shadow-md rounded-md w-full px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"}
                              />
                              <span className="input-group-text" onClick={togglePasswordVisibility}>
                                 <img src="/images/icons/1x/password-eye.svg" style={{width:'24px'}} />
                              </span>
                           </div>
                           {formikResetPassword.errors.newpassword && formikResetPassword.touched.newpassword && <div id="formErrorName1"><small className="text-red-600 font-italic">{formikResetPassword.errors.newpassword}</small></div>}
                        </div>
                           <div className="mb-1 ">
                           <label htmlFor="confirmpassword" className="text-sm font-semibold  ">Confirm Password *</label>
                           <div className="input-group">
                              <input
                                 type={passwordVisible ? 'text' : 'password'}
                                 name="confirmpassword"
                                 value={formikResetPassword.values.confirmpassword}
                                 onChange={formikResetPassword.handleChange}
                                 id="confirmpassword"
                                 placeholder='confirmpassword *'
                                 className={formikResetPassword.errors.confirmpassword ? "shadow-md rounded-md w-full px-3 py-2 border border-width-2 border-red-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 is-invalid" : "shadow-md rounded-md w-full px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"}
                              />
                              <span className="input-group-text" onClick={togglePasswordVisibility}>
                                 <img src="/images/icons/1x/password-eye.svg" style={{width:'24px'}} />
                              </span>
                           </div>
                           {formikResetPassword.errors.confirmpassword && formikResetPassword.touched.confirmpassword && <div id="formErrorName1"><small className="text-red-600 font-italic">{formikResetPassword.errors.confirmpassword}</small></div>}
                        </div>
                        
                       
                        <div className="d-flex text-center mt-3">
                           <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all">Reset Password</button>                         
                        </div>
                     </form>
                  </div>
      </>):(<>
      
      {showEmailOTP ? (<>
         <div className="click-to-call-inner" id="click_to_call_otp">
                     <h3 className='mt-3'>Enter OTP</h3>
                     <p className='mb-0'>Please enter the OTP sent to your E-mail</p>
                     <p className='font-semibold  '>{values.email} </p>
                     {/* <img src="/images/icons/otp.png" style={{ margin: "10px auto",display:'block', width: "60px" }} /> */}
                     <div className="d-flex otp-input mt-3 mb-3">
                        <input type="tel" className="shadow-md rounded-md px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 m-1 w-1/5 text-center font-semibold   w-1/5 text-center font-semibold  " maxLength={1} ref={(el:any) => (inputRefs.current[1] = el)} onChange={e => handleOTPChange("digit1", e.target.value, 1)} />
                        <input type="tel" className="shadow-md rounded-md px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 m-1 w-1/5 text-center font-semibold   w-1/5 text-center font-semibold  " maxLength={1} ref={(el:any) => (inputRefs.current[2] = el)} onChange={e => handleOTPChange("digit2", e.target.value, 2)} />
                        <input type="tel" className="shadow-md rounded-md px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 m-1 w-1/5 text-center font-semibold   w-1/5 text-center font-semibold  " maxLength={1} ref={(el:any) => (inputRefs.current[3] = el)} onChange={e => handleOTPChange("digit3", e.target.value, 3)} />
                        <input type="tel" className="shadow-md rounded-md px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 m-1 w-1/5 text-center font-semibold   w-1/5 text-center font-semibold  " maxLength={1} ref={(el:any) => (inputRefs.current[4] = el)} onChange={e => handleOTPChange("digit4", e.target.value, 4)} />
                        {/* <input type="tel" className="shadow-md rounded-md px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 m-1 w-1/5 text-center font-semibold   w-1/5 text-center font-semibold  " maxLength={1} ref={(el:any) => (inputRefs.current[5] = el)} onChange={e => handleOTPChange("digit5", e.target.value, 5)} />
                        <input type="tel" className="shadow-md rounded-md px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 m-1 w-1/5 text-center font-semibold   w-1/5 text-center font-semibold  " maxLength={1} ref={(el:any) => (inputRefs.current[6] = el)} onChange={e => handleOTPChange("digit6", e.target.value, 6)} /> */}
                     </div>
                     {isActive ? (<>
                        <p className=' m-0 mb-2 text-sm font-semibold  '>Resend OTP in 00:{seconds}</p>
                     </>):(<>
                        <p className=' m-0 mb-2 text-sm font-semibold  '>Not received your code?  <a href='#!' className='pt-1 pb-1 font-semibold text-red-600' onClick={() => forgotPasswordFunction(values.email)}> Resend Code</a></p>
                     </>)}
                     <button type="button" className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all mb-2" onClick={() => handleEmailOTPSubmit(values.email)}>Submit</button>
                  </div>
      </>):(<>
      
         {showOTP ? (
                  <div className="click-to-call-inner" id="click_to_call_otp">
                     <h3 className='mt-3'>Enter OTP</h3>
                     <p className='mb-0'>Please enter the OTP sent to <img src='/images/new-icons/sms.svg' className='inline-block' width={"24px"} /></p>
                     <p>{countryCode23}-{getPhone23}  <img src='/images/new-icons/edit.svg' className='inline-block cursor-pointer' onClick={login_with_otp} width={"12px"} /></p>
                     {/* <img src="/images/icons/otp.png" style={{ margin: "10px auto",display:'block', width: "60px" }} /> */}
                     <div className="d-flex otp-input mt-3 mb-3">
                        <input type="tel" className="shadow-md rounded-md px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 m-1 w-1/5 text-center font-semibold  " maxLength={1} ref={(el:any) => (inputRefs.current[1] = el)} onChange={e => handleOTPChange("digit1", e.target.value, 1)} />
                        <input type="tel" className="shadow-md rounded-md px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 m-1 w-1/5 text-center font-semibold  " maxLength={1} ref={(el:any) => (inputRefs.current[2] = el)} onChange={e => handleOTPChange("digit2", e.target.value, 2)} />
                        <input type="tel" className="shadow-md rounded-md px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 m-1 w-1/5 text-center font-semibold  " maxLength={1} ref={(el:any) => (inputRefs.current[3] = el)} onChange={e => handleOTPChange("digit3", e.target.value, 3)} />
                        <input type="tel" className="shadow-md rounded-md px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 m-1 w-1/5 text-center font-semibold  " maxLength={1} ref={(el:any) => (inputRefs.current[4] = el)} onChange={e => handleOTPChange("digit4", e.target.value, 4)} />
                        {/* <input type="tel" className="shadow-md rounded-md px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 m-1 w-1/5 text-center font-semibold  " maxLength={1} ref={(el:any) => (inputRefs.current[5] = el)} onChange={e => handleOTPChange("digit5", e.target.value, 5)} />
                        <input type="tel" className="shadow-md rounded-md px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 m-1 w-1/5 text-center font-semibold  " maxLength={1} ref={(el:any) => (inputRefs.current[6] = el)} onChange={e => handleOTPChange("digit6", e.target.value, 6)} /> */}
                     </div>
                     {isActive ? (<>
                        <p className=' m-0 mb-2'>Resend OTP in 00:{seconds}</p>
                     </>):(<>
                        <p className=' m-0 mb-2 text-sm font-semibold  '>Not received your code? <a href='#!' className='pt-1 pb-1   text-sm' onClick={resendOTPFunction}> Resend Code</a></p>
                     </>)}
                     <button type="button" className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all" onClick={handleOTPSubmit}>Submit</button>
                  </div>
               ) : (
                  <>
                  <div className='login-popup-head text-center'>
                  <h5 className='fw-bold pt-2 mb-1'>Welcome to</h5>
                  <img src='https://ik.imagekit.io/bsg4v2a8gn4/assets/img/pmp-red.png' style={{width:"80px",margin:"0 auto",display:"block"}} />
                  <p >Please enter your mobile number to receive a verification code</p>
                  </div>
                     <form className="p-2" onSubmit={handleSubmit} method="POST">
                        <div className="mb-1 ">
                           <label htmlFor="email" className="text-sm font-semibold  ">Enter Your {loginWith ?'Mobile Number':'E-mail ID'}*</label>
                           {/* <input
                              type="tel"
                              name="email"
                              placeholder={`Enter your ${loginWith ?'Mobile Number':'E-mail ID'}*`}
                              value={values.email}
                              onChange={handleChange}
                              id="email"
                              className={errors.email ? "shadow-md rounded-md w-full px-3 py-2 border border-width-2 border-red-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 is-invalid" : "shadow-md rounded-md w-full px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"}
                           />
                           {errors.email && touched.email && <div id="formErrorName1"><small className="text-red-600 font-italic">{errors.email}</small></div>} */}
                        </div>
                        {loginWith ? (<>
                           <PhoneInput
                                country={'in'}
                                defaultMask=".............."
                                alwaysDefaultMask={true}
                                countryCodeEditable={false}
                                value={formik.values.email}
                                // onChange={mobileno => formik.setFieldValue('mobileno', mobileno)}
                                onChange={handlePhoneChange1}
                                placeholder="Enter your phone number"
                                inputClass={`max-w-100 !py-2 bg-gray-900 border ${phoneerrors23 ? "shadow-md rounded-md w-full px-3 py-2 border border-width-2 !border-red-500 !focus:outline-none !focus:ring-indigo-500 !focus:border-indigo-500" : "shadow-md rounded-md w-full px-3 py-2 border border-width-2 !border-gray-500 !focus:outline-none !focus:ring-indigo-500 !focus:border-indigo-500"} rounded`}
                                containerClass="max-w-100"
              
                                inputProps={{
                                    name: 'mobile',
                                    required: true,
                                    autoComplete: "off",
                                    
                                }}
                                onBlur={(e: { target: { value: any; }; }) => {
                                    const { value } = e.target;
                                    const formattedValue = value.replace(/-/g, '').replace(/\s/g, '-');
                                    if (!isValidPhoneNumber(formattedValue)) {
                                        setErrors23("Invalid phone number");
                                    } else {
                                        setErrors23("");
                                    }
                                }}
                            />
                            {phoneerrors23 && <div id="formErrorName1"><small className="text-red-600 font-italic">{phoneerrors23}</small></div>}
                        </>):(<>
                           <input
                              type="email"
                              name="email"
                              placeholder={`Enter Your ${loginWith ?'Mobile Number':'E-mail ID'}*`}
                              value={values.email}
                              onChange={handleChange}
                              id="email"
                              className={errors.email ? "shadow-md rounded-md w-full px-3 py-2 border border-width-2 border-red-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 is-invalid" : "shadow-md rounded-md w-full px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"}
                           />
                           {errors.email && touched.email && <div id="formErrorName1"><small className="text-red-600 font-italic">{errors.email}</small></div>}
                           <div className="mb-5 mt-3 ">
                           <label htmlFor="password" className="text-sm font-semibold  ">Enter your Password *</label>
                           <div className="input-group relative">
                              <input
                                 type={passwordVisible ? 'text' : 'password'}
                                 name="password"
                                 value={values.password}
                                 onChange={handleChange}
                                 id="password"
                                 placeholder='Password *'
                                 className={errors.password ? "shadow-md rounded-md w-full px-3 py-2 border border-width-2 border-red-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 is-invalid" : "shadow-md rounded-md w-full px-3 py-2 border border-width-2 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"}
                              />
                              <span className="input-group-text absolute top-4 right-5 cursor-pointer" onClick={togglePasswordVisibility}>
                                 <img src="/images/icons/1x/password-eye.svg" style={{width:'24px'}} />
                              </span>
                           </div>
                           {errors.password && touched.password && <div id="formErrorName1"><small className="text-red-600 font-italic">{errors.password}</small></div>}
                        </div>
                        <a href="#!" className="p-2 font-semibold  " onClick={() => forgotPasswordFunction(values.email)}>
                                 Reset Password
                              </a>
                        </>)}
                        
                       
                        <div className="d-flex text-center mt-3">
                           {loginWith ? (<><button type="button" className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all" onClick={getUserOtp}>Request OTP</button></>):(<>  <button type="submit" className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all mb-2">Sign In</button>                         
                              </>)}
                        </div>
                     </form>
                     <p  className="text-end d-block">{loginWith ? (<>
                           <span className='d-inline-block font-semibold   text-sm cursor-pointer' onClick={login_with_password}>Login with Password</span>
                        </>):(<>
                           <span className='d-inline-block font-semibold   text-sm cursor-pointer' onClick={login_with_otp}>Login with OTP</span>
                        </>)}</p>
                        
                    
                  </>
               )}
      </>)}
      </>)}
      
        
             
          
      </>
   )
}



export default LoginForm;