import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, 
  });
  
  api.interceptors.request.use(
    async (config) => {
            const session:any = await getSession(); 
            if(session){
                config.headers.Authorization = session.user?.account?.userdetail?.Token;
            }else{
                config.headers.Authorization = `${process.env.NEXT_PUBILC_GLOBAL_AUTH_TOKEN}`;
            }
            return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
    
  export const getMenuRoutes = () => {
    return api.get(`/api/v1/categorymenu`);
  };

  export const getHomePageData = () => {
    return api.get(`/api/v1/get-homepage-data`);
  }
  export const getPageList = () => {
    return api.get(`/api/v1/pagelist`);
  }
  export const getBannerData = () => {
    return api.get(`/api/v1/banner`);
  }

  export const getPackageDetails = (packageslug:string) => {
    return api.get(`/api/v1/package-data/${encodeURIComponent(decodeURIComponent(packageslug))}`)
  }

  export const getPackageRelated = (packageid:string,packagecategory:string) => {
    return api.get(`/api/v1/package-related-data?id=${packageid}&category=${packagecategory}`)
  }
  export const getCategoryDetails = (slug:string) => {
    return api.get(`/api/v1/category-data/${encodeURIComponent(decodeURIComponent(slug))}`)
  }
  
  export const getCategoryStatBySlug = (slug:string) => {
    return api.get(`/api/v1/get-category-stat-by-slug/${encodeURIComponent(decodeURIComponent(slug))}`)
  }
  export const getCategoryGallery = (slug:string) => {
    return api.get(`/api/v1/pictures-site/${slug}/categorys`)
  }
  export const getCategoryPackage = (slug:string) => {
    return api.get(`/api/v1/packages?filterby=category&query=${encodeURIComponent(decodeURIComponent(slug))}`)
  }
  export const getCategoryReviews = (slug:string) => {
    return api.get(`/api/v1/reviews/public?filterby=category&query=${encodeURIComponent(decodeURIComponent(slug))}`)
  }
  export const getHomeReviewsData = () => {
    return api.get(`/api/v1/reviews/public?filterby=ishome&query=true`)
  }
  export const getHomeTextReviews = () => {
    return api.get(`/api/v1/reviews/public/formateby/text_reviews/true`)
  }
  export const getHomeVideoReviews = () => {
    return api.get(`/api/v1/reviews/public/formateby/video_reviews/false`)
  }
  
  export const getReviewOneRoutes = (id:any) => {
    return api.get(`/api/v1/review/${id}`);
  };
  export const getWeatherInfo = (packageid:string,requireddate:string) => {
    return api.get(`/api/v1/package/weather-list-site?filterby=package_id&query=${packageid}&givenDate=${requireddate}`)
  }

  export const getWeatherDateInfo = (package_id:any,date:string) => {
    return api.get(`/api/v1/package/weather-list-site?filterby=package_id&query=${package_id}&givenDate=${date}`)
  }

  export const getWeatherDate = (slug: any,date: string) => {
    return api.get(`/api/v1/weather?filterby=slug&query=${slug}&givenDate=${date}`)
  }

  export const getWishList = (type:string) => {
    return api.get(`/api/v1/package/get-wishlistids?wishlisttype=${type}`)
  }

  
  export const addWishList = (packageid:string,type:string) => {
    const addPayload = {
      "wishlisttype": type,
      "wishlisttypeid": packageid,
      "source": "T2T"
    }
    return api.post(`/api/v1/package/add-wishlist`,addPayload)
  }


  export const removeWishList = (packageid:string,type:string) => {
    const deleteItemPayload = {
      "wishlisttype": "package",
      "wishlisttypeid": packageid,
      "source": "T2T"
    }
    return api.delete(`/api/v1/package/delete-wishlist/${packageid}?wishlisttype=${type}`,{data:deleteItemPayload})
  }

  export const getRecentlyVisited = (recentlyVisitedPackages:any[]) => {
    const recentlyVisitePayload = {
      "packagesids": recentlyVisitedPackages,
      "source": "T2T"
    }
    return api.post(`/api/v1/package/recently-visit?page=1&limit=8`,recentlyVisitePayload)
  }
    export const getProfileRoutes = () => {
      return api.get('/api/v1/user');
    };

    export const UserProfileUpdate = (payload:any) => {  
      return api.put(`/api/v1/user/profile-update`,payload);
    };

    export const getUserProfilePicRoutes = (fileData:any,type:any) => {  
      return api.put(`/api/v1/user/image/${type}/-1`,fileData);
    };


    export const getUserOrderCount = () => {  
      return api.get(`/api/v1/get-orders-count?status=PROCESSING&status=COMPLETED&status=CANCELLED`);
    };

    
    export const getWishlistRoutes = () => {
      return api.get('/api/v1/package/get-wishlist?wishlisttype=package');
    };
    export const getTravellerRoutes = () => {
      return api.get('/api/v1/passenger/list');
    };
    export const getProfileRevews = () => {
      return api.get('/api/v1/reviews');
    };
    export const getTravellerOneRoutes = (id:any) => {
      return api.get(`/api/v1/passenger/${id}`);
    };

    export const changePassword = (password:any,newpassword:any,confirmpassword:any) => {
      const changePasswordPayload = {
        "password":password,
        "newpassword":newpassword,
        "confirmpassword":confirmpassword,
        "source":"T2T",
      }
      return api.put('/api/v1/user/change-password',changePasswordPayload);
    }

    
    export const KmyRegister = (kmyPayload:any,id:string,type:string) => {
      return api.post(`/api/v1/registration/addupdate?id=${id!=undefined?id:""}&informationtype=${type}`,kmyPayload);
    }

    export const KmyRegisterGetPackageYatra  = (pkgSlug:any) => {
      return api.get(`/api/v1/package-data/${encodeURIComponent(decodeURIComponent(pkgSlug))}`);
    }

    export const KmyRegisterFileUpload  = (payload:any,registerId:any,phototype:any) => {
      return api.put(`/api/v1/registration/image/${registerId}/${phototype}/-1`,payload);
    }

    export const KmyFinalRegister = (registerId:any) => {
      return api.put(`/api/v1/registration/email/${registerId}`);
    }
   
    export const getKmyRegister = (rId:any) => {
      return api.get(`/api/v1/registration/${rId}`);
    }

    export const getKmyRegisterDelete = (rId:any) => {
      return api.delete(`/api/v1/registration/delete/${rId}`);
    }

    export const getKmyRegisterAll = () => {
      return api.get(`/api/v1/registration`);
    }

    
    export const addTravellers = (addTravellerPayload:any) => {
      return api.post('/api/v1/passenger/add',addTravellerPayload);
    }

    export const UpdateTravellers = (id:any,addTravellerPayload:any) => {
      return api.put(`/api/v1/passenger/update/${id}`,addTravellerPayload);
    }

    export const deleteTraveller = (tid:string) => {
      return api.delete(`/api/v1/passenger/delete/${tid}`)
    }
    export const getOrder = (activeOrderTab:any) => {
      return api.get(`/api/v1/get-orders?status=${activeOrderTab}`);
    };
    export const getOrderDetails = (id:any) => {
      return api.get(`/api/v1/get-order/${id}`);
    };
    export const upoloadOrderKycFrontImage = (fileData:any,type:any,getOrderId:any,getPassengerId:any,getActiveKYCIndex:any) => {  
      return api.put(`/api/v1/order-passenger/document/${type}/${getActiveKYCIndex}/${getOrderId}/${getPassengerId}`,fileData);
    };
    export const deleteOrderKycFrontImage = (type:any,getOrderId:any,getPassengerId:any,getActiveKYCIndex:any) => {  
      return api.delete(`/api/v1/order-passenger/document/${type}/${getActiveKYCIndex}/${getOrderId}/${getPassengerId}`);
    };
    
    
    export const orderPassengerUpdateKyc = (values:any,orderid:any,passengerid:any) => {  
      return api.put(`/api/v1/order-passenger/update-kyc/${orderid}/${passengerid}`,values);
    };
    
    export const subscribeNewsletter = (email:string,) => {
      const enquiryPayload = {
        "source": "T2T",
        "email": email,
        "firstName":"",
        "lastName":"",
        "mobile":"",
        "countryCode":"",
        "category":[""],
       
      }
      return api.post(`/api/v1/subscriber/subscribe`,enquiryPayload)
    } 
  export const getEnquiryOtp = (mobileno:string,countrycode:string,) => {
    const enquiryPayload = {
      "source": "T2T",
      "mobile": Number(mobileno),
      "countrycode":countrycode,
      "otpverified": ""
    }
    return api.post(`/api/v1/enquiry/call`,enquiryPayload)
  }
  export const resendOTP = (mobileno:string,countrycode:string,) => {
    const resendPayload = {
      "source": "T2T",
      "mobile": Number(mobileno),
      "countrycode":countrycode,
    }
    return api.post(`/api/v1/user/send-opt`,resendPayload)
  }
  export const forgotPassword = (email: string) => {
    const forgotPayload = {
      "source": "T2T",
      "mobile": 0,
      "email":email,
    }
    return api.post(`/api/v1/user/forgot-password`,forgotPayload)
  }
  export const otpVerifyForReset = (email: string, otpString: string,) => {
    const otpVerifyForReset = {
      "source": "T2T",
      "mobile": 0,
      "otp":otpString,
      "email":email,
    }
    return api.post(`/api/v1/user/otp-verify-for-reset`,otpVerifyForReset)
  }
  export const resetPassword = (verifytoken:string,newpassword: string, confirmpassword: string,) => {
    const otpVerifyForReset = {
      "source": "T2T",
      "verifytoken": verifytoken,
      "newpassword":newpassword,
      "confirmpassword":confirmpassword,
    }
    return api.put(`/api/v1/user/reset-password`,otpVerifyForReset)
  }
  
  
  export const submitRequestForPrice = (name:string,email:string,phone:string,packageName:string,packageId:string,pslug:string) => {
    const enquiryPayload = {
      "source": "T2T",
      "NoOfPerson":"",
      "name":name,
      "email":email,
      "phone": Number(phone),
      "comment":packageName,
      "packageid":packageId,
      "pagessourcelink":pslug,
      "packagename":packageName
    }
    return api.post(`/api/v1/enquiry/create`,enquiryPayload)
  }
  export const submitJoinZoom = (name:string,email:string,phone:string,meetingID:string,zoomMeetingID:string) => {
    const str1: string = zoomMeetingID.toString();
    const zoomPayload = {
      "source": "T2T",
      "first_name":name,
      "last_name":"",
      "email":email,
      "mobile": Number(phone),
      "meetingID":meetingID,
      "zoomMeetingID":str1,
      "countryCode":"+91",
      "otpVerified":""
      
      
    }
    return api.post(`/api/v1/zoommeeting/add-subscriber`,zoomPayload)
  }
  
  export const submitJoinZoomOTP = (phone:string,otpString:string,getEnquiryId:any) => {
    getEnquiryId.id =""
    getEnquiryId.otpVerified =otpString
    return api.post(`/api/v1/zoommeeting/add-subscriber`,getEnquiryId)
  }
  export const submitQuickEnquiry = (name:string,email:string,mobileno:string,countrycode:string,person:string,packagename:string,comments:string) => {
    const enquiryPayload = {
      "source": "T2T",
      "name": name,
      "email": email,
      "phone": Number(mobileno),
      "countrycode":countrycode,
      "NoOfPerson": Number(person),
      "packagename": packagename,
      "packageid": "",
      "pagessourcelink": "https://www.triptotemples.com/",
      "comment": comments
  }
    return api.post(`/api/v1/enquiry/create`,enquiryPayload)
  }

  export const submitEnquiryOtp = (mobileno:string,otpString:string) => {
    const enquiryPayload = {
      "source": "T2T",
      "mobile": Number(mobileno),
      "otpverified": otpString
    }
    return api.post(`/api/v1/enquiry/call`,enquiryPayload)
  }
  export const submitEnquiryFormOtp = (mobileno:string,otpString:string,getEnquiryId:string) => {
    const enquiryPayload = {
      "source": "T2T",
      "id":getEnquiryId,
      "phone": Number(mobileno),
      "otpVerified": otpString
    }
    return api.post(`/api/v1/enquiry/verify`,enquiryPayload)
  }

  export const getLoginOtp = (email:string,countrycode:any) => {
    const loginOtpPayload = {
      "source": "T2T",
      "mobile": Number(email),
      "countrycode":countrycode
   }
    return api.post(`/api/v1/user/send-opt`,loginOtpPayload)
  }
  

  export const loginuser = (payload:any) => {
    let requestUrl = ``
    if(payload.otp && payload.mobile){
      requestUrl = '/api/v1/user/login-with-otp';
      return api.post(requestUrl,payload);
    }else{
      requestUrl = '/api/v1/user/login';
      // console.log("payload.....???????...",payload)
      return api.post(requestUrl,payload);
    }
  }
   
  export const getFaqsCatList = () => {
    return api.get(`/api/v1/faqslist`);
  }
  export const getMainFaqs = () => {
    return api.get(`/api/v1/page?filterby=type&query=Main-Faq`);
  }
  export const GetCommonFaqs = (slug:string) => {
    return api.get(`/api/v1/package-data/${slug}`);
  }
  export const FilterFaqs = (type:any,id:string,group:any) => {
    return api.get(`/api/v1/common/faqs-list/${type}/${id}?qgroup[]=${group}`);
  }
  export const defaultFaqs = (type:any,id:string) => {
    return api.get(`/api/v1/common/faqs-list/${type}/${id}`);
  }
  export const addFaqs = (faqtype:string,faqtypeid:string,faqtypetitle:string,faqtitle:string) => {
    const addFaqPayload = {
      "source":"T2T",
      "faqsType":faqtype,
      "faqsTypeID":faqtypeid,
      "faqsTypeTitle":faqtypetitle,
      "title":faqtitle,
      "description":"Walking regularly and eat healthy food."
    }
    return api.post(`/api/v1/common/faqs/add-faq`,addFaqPayload);
  }

  export const addComment = (faqtype:string,faqtypeid:string,faqid:string,faqCid:string,comment:string) => {
    const addCommentPayload = {
      "source":"T2T",
      "faqsType":faqtype,
      "faqsTypeID":faqtypeid,
      "faqsID":faqid,
      "comment":comment,
      "commentID":faqCid
    }
    return api.post('/api/v1/common/faqs/comment/add',addCommentPayload);
  }

  export const updateFaqStat = (faqtype:string,faqtypeid:string,faqid:string,faqCommentid:string,upvote:number,downvote:number) => {
    const statUpdatePayload = {
      "source":"T2T",
      "faqsType":faqtype,
      "faqsTypeID":faqtypeid,
      "faqsID":faqid,
      "commentID":faqCommentid,
      "upVote":upvote,
      "downVote":downvote
  }
    return api.post('/api/v1/common/faqs/faqsstatdetails/add',statUpdatePayload);
  }

  export const enquirySubmit = (name:string,email:string,mobileno:string,countrycode:string,person:string,packagename:string,comments:string) => {
    const enquiryPayload = {
      "source": "T2T",
      "name": name,
      "email": email,
      "countrycode":countrycode,
      "phone": Number(mobileno),
      "NoOfPerson": Number(person),
      "packagename": packagename,
      "packageid": "",
      "pagessourcelink": "https://www.triptotemples.com/",
      "comment": comments
  }
    return api.post(`/api/v1/enquiry/create`,enquiryPayload)
  }
 

  export const AddUser = (payload:any) => {
      let requestUrl = '/api/v1/user/add-user';
      return api.post(requestUrl,payload);
  }

  export const VerifyUser = (payload:any) => {
    let requestUrl = '/api/v1/user/user-verify';
    return api.post(requestUrl,payload);
}
  

export const AddToCart = (packageid:string,yatraDate:string,) => {
  const addPayload = {
    "packageID":packageid,
    "yatraDate":yatraDate,
    "PassengerList":[],
    "source":"T2T",
    "couponCode":""
  }
  return api.post(`/api/v1/cart/add`,addPayload)
}

export const getCartDetails = () => {
  return api.get('/api/v1/cart');
};
export const submitGstDetails = (gstPayload:any) => {
  
  return api.post(`/api/v1/cart/gst`,gstPayload)
}

export const updateKYCCheckout = (payload:any) => {  
  return api.put(`/api/v1/user/update-kyc`,payload);
};
export const UserUpdateCheckout = (payload:any) => {  
  return api.put(`/api/v1/user/update-kyc`,payload);
};

export const appyCoupon = (couponCode:string) => {
  const applyCoupon_obj = {
    "couponCode":couponCode,
    "source":"T2T",
  }
  return api.post(`/api/v1/cart/applyCoupon`,applyCoupon_obj)
}
export const removeCoupon = (couponCode:string) => {
  const removeCoupon_obj = {
    "couponCode":couponCode,
    "source":"T2T",
  }
  return api.post(`/api/v1/cart/removeCoupon`,removeCoupon_obj)
}
export const addTravellerInCart = (addPayload:any) => {
  
  return api.post(`/api/v1/cart/add`,addPayload)
}

export const updateTravellerIncart = (ID:string,yatraDate:any,packageId:string,addTraveller_obj:any,passengerList:any) => {
  const addPayload = {
    "packageID":packageId,
    "yatraDate":yatraDate,
    "PassengerList":passengerList,
    "source":"T2T",
    "couponCode":""
  }
  addPayload.PassengerList.push(addTraveller_obj)
  return api.post(`/api/v1/cart/add`,addPayload)
}

export const getTravellerByID = (ID:string) => {
  return api.get(`/api/v1/passenger/${ID}`)
}

export const finalPayment = (payload:any) => {
  
  return api.put(`/api/v1/payment/initiate`,payload)
}


export const finalPaymentSecuss = (payload:any) => {
  return api.put(`/api/v1/payment/success`,payload)
}

export const finalPendingPayment = (payload:any) => {
  
  return api.put(`/api/v1/payment/pending-initiate`,payload)
}
export const finalPendingPaymentSecuss = (payload:any) => {
  return api.put(`/api/v1/payment/pending-success`,payload)
}

export const getPaymentSecuss = (payload:any) => {
  return api.get(`/api/v1/get-order/${payload}`)
}

export const finalPaymentFail = (payload:any) => {
  return api.put(`/api/v1/payment/fail`,payload)
}

export const getCountry = () => {
  return api.get(`/api/v1/countries`)
}
export const getEnquiry = () => {
  return api.get(`/api/v1/user/enquiry?limit=100`);
};
export const getEmailConfirmationOtp = () => {
  return api.get(`/api/v1/user/email-confirmation-otp`);
};

export const verifyEmailConfirmationOtp = (code:any) => {
  const addPayload = {
    "Otp": code,
    "source": "T2T"
  }
  return api.put(`/api/v1/user/email-confirmation-verify`,addPayload)
}
export const getTrendingPackages = () => {
  return api.get(`/api/v1/get-trending-data?id[]=67109bee10bbb9c5fd9eb912&id[]=662cd29199d8a8cfdf03b9f9`);
};
export const getEwallet = (activeWalletTab:any,next:any,dtstart:any,dtend:any) => {
  return api.get(`/api/v1/wallet/transactions-paging?wallettype=${activeWalletTab}&limit=5&page=${next}&dtstart=${dtstart}&dtend=${dtend}`);
};
export const getEwalletFilter = (activeWalletTab:any,next:any,dtstart:any,dtend:any) => {
  return api.get(`/api/v1/wallet/transactions-paging?wallettype=${activeWalletTab}&page=${next}&dtstart=${dtstart}&dtend=${dtend}`);
};
export const getOrderEmployee = (orderId:any) => {
  return api.get(`/api/v1/get-order-employee/${orderId}`);
};

export const getWalletTotlaAmount = (activeWalletTab:any) => {
  return api.get(`/api/v1/get-wallet?wallettype=${activeWalletTab}`,)
}
export const requestToPay = (paymentRequestPayload:any) => {
  return api.post(`/api/v1/wallet/request-to-pay`,paymentRequestPayload)
}
export const getCouponHistory = (next:any,dtstart:any,dtend:any) => {
  return api.get(`/api/v1/get-employee-applying-coupon-history?limit=5&page=${next}&dtstart=${dtstart}&dtend=${dtend}`);
};
export const getCouponList = () => {
  return api.get(`/api/v1/get-employee-coupon-list`);
};

export const getBlogsData = () => {
  return api.get(`/api/v1/get-blogshome-data-new`)
}

export const getAllBlogSlugs = () => {
  return api.get(`/api/v1/blogslugforssg`)
}

export const getWebStory = () => {
  return api.get(`/api/v1/webstory-list`)
}
export const getMeetingsList = (packageid:any) => {
  return api.get(`/api/v1/meetings-list?filterby=package&query=${packageid}`)
}

export const getBlogCategoryData = (cat:string) => {
  return api.get(`/api/v1/cate-bloglist?filterby=category&query=${cat}`)
}
export const getCategoryMetaData = (cat:string,type:any) => {
  return api.get(`/api/v1/category-meta/${cat}?query=${type}`)
}

export const getBlogData = (querystring:string) => {
  return api.get(`/api/v1/blog?filterby=slug&query=${encodeURIComponent(decodeURIComponent(querystring))}`)
}
export const getBlogRelatedData = (id:string) => {
  return api.get(`/api/v1/blog-related-data?id=${id}`)
}
export const getNewsRelatedData = (id:string) => {
  return api.get(`/api/v1/news-related-data?id=${id}`)
}

export const getPopularBlogs = () => {
  return api.get(`/api/v1/popular-blogs`)
}

export const getNewsData = () => {
  return api.get(`/api/v1/news`)
}

export const getNewsCatData = (cat:string) => {
  return api.get(`/api/v1/news?filterby=category&query=${cat}`)
}

export const getNewsSlugData = (slug:string) => {
  //console.log(`/news/adi-kailash/${encodeURIComponent(slug)}`)
  return api.get(`/api/v1/news?filterby=slug&query=${encodeURIComponent(decodeURIComponent(slug))}`)
}

export const getCollectionsData = () => {
   return api.get(`/api/v1/collection`)
}

export const getCollectionsBySlug = (slug:string) => {
  return api.get(`/api/v1/collection?filterby=slug&query=${encodeURIComponent(decodeURIComponent(slug))}`)
}

export const getDownloadsData = () => {
   return api.get(`/api/v1/package/downloads`)
}
export const getAllDestination = () => {
  return api.get(`/api/v1/categorylist`)
}

export const getFaqsDataByCat = (catslug:string) => {
  return api.get(`/api/v1/faqs-data/${catslug}?questioncategory=${catslug}`)
}

export const getFaqsDataByQuestionCat = (catslug:string,questionslug:string) => {
  return api.get(`/api/v1/faqs-data/${catslug}?questioncategory=${questionslug}`)
}

export const getFaqsGroupData = (catslug:string) => {
  return api.get(`/api/v1/faqs-groups/${catslug}`)
}

export const getVideosData = (type:any) => {
  return api.get(`/api/v1/videogallery?gtype=${type}`)
}

export const getVideosBySlug = (slug:string) => {
  return api.get(`/api/v1/videogallery?filterby=slug&query=${encodeURIComponent(decodeURIComponent(slug))}`)
}

export const getWeatherDataBySlug = (slug:string) => {
  return api.get(`/api/v1/weather?filterby=slug&query=${encodeURIComponent(decodeURIComponent(slug))}`)
}
export const getWeatherDataBySearch = (slug: any) => {
  return api.get(`/api/v1/weather-search?location=${slug}`)
}
export const getWeatherDataByDate = (slug: any, date: string) => {
  return api.get(`/api/v1/weather-search?location=${slug}&givenDate=${date}`)
}
export const getCities = (cities:any) => {
  return api.get(`/api/v1/cities/${cities}`)
}

export const getReviews = () => {
  return api.get(`/api/v1/reviews/list`)
}
export const getNoticeData = () => {
  return api.get(`/api/v1/noticeboard-site`)
}

export const getPaymentOfUser = () => {
  return api.get('/api/v1/onlinepaymentsofuser');
};


export const getPageForFreeKmy = (Pageid:any) => {
  return api.get(`/api/v1/page/kmy-register/${Pageid}`);
};

export const getPackageListForFreeKmy = () => {
  return api.get(`/api/v1/package/kmy-resiger-package-list`);
};

export const getGroupOrderDetails = (id:any) => {
  return api.get(`/api/v1/get-group-order/${id}`);
};


export const GroupOrderAddCart = (id:any,payload:any) => {
  return api.put(`/api/v1/group-order-passenger/update-cart/${id}`,payload);
};

export const GroupOrderGetCart = (id:any) => {
  return api.get(`/api/v1/group-order-passenger/get-cart/${id}`);
};

export const GetGroupOrdersProfile = () => {
  return api.get(`/api/v1/get-group-orders`);
};

export const submitGstDetailsGroupOrder = (gId:any,gstPayload:any) => {
  return api.put(`/api/v1/group-order-passenger/update-gst/${gId}`,gstPayload)
}
export const GroupOrderPamentInitiat = (payload:any) => {
  return api.put(`/api/v1/group-order-passenger/init-payment`,payload);
};
export const getTourGuideDetails = (date:string) => {
  return api.post(`/api/v1/user/get-tour-guides`,date);

}

export default api;