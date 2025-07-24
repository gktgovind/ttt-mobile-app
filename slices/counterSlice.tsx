import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface State {
  wishlist: any[];
  recentlyvisitedpackages:any[];
  navmenus: any[];
  showlogin:boolean;
  mobileToggle:string;
  showgetcall:boolean;
  showyatradates:boolean;
  showNotice:boolean;
  showNoticeDate:string;
  showRequestForPrice:boolean;
  showZoom:boolean;
  showQuickEnquiry:boolean;
  getRequestPackageDetails:{};
  loading:boolean;
  ClickedOnBooking:boolean,
  AddTravellerStatus:boolean,
  upadetUserGetUser:boolean,
  bookPkg:any[],
  getCartAfterTU:boolean
  getRegisterBy:boolean,
  clickOnKMYRegistrationBtn:boolean
  tourPkg:{
    "ID":"",
    "title":"",
    "slug":""
  },
  tourGuideDetails:{
    "mobile":0,
    "name":"",
    "email":"",
  },
  getGuideStatus:boolean,
  searchBox:boolean,
  tourPkgStartDate:"",
  FreeRegister:"",
  PhoneNumberForOTP:""
}

const initialState: State = {
  wishlist: [],
  recentlyvisitedpackages:[],
  navmenus: [],
  showlogin:false,
  mobileToggle:"overview_tab",
  showgetcall:false,
  showyatradates:false,
  showNotice:false,
  showNoticeDate:"",
  upadetUserGetUser:false,
  getRequestPackageDetails:{},
  showRequestForPrice:false,
  showZoom:false,
  showQuickEnquiry:false,
  loading:false,
  ClickedOnBooking:false,
  AddTravellerStatus:false,
  bookPkg:[],
  getRegisterBy:false,
  getCartAfterTU:false,
  clickOnKMYRegistrationBtn:false,
  tourPkg:{
    "ID":"",
    "title":"",
    "slug":"",
  },
  tourGuideDetails:{
    "mobile":0,
    "name":"",
    "email":"",
  },
  getGuideStatus:false,
  searchBox:false,
  tourPkgStartDate:"",
  FreeRegister:"",
  PhoneNumberForOTP:""
};

const slice = createSlice({
  name: 'globalstates',
  initialState,
  reducers: {
    
    PhoneNumberForOTPState: (state, action: PayloadAction<any>) => {
      state.PhoneNumberForOTP=action.payload;
    },
    FreeRegisterPkg: (state, action: PayloadAction<any>) => {
      state.FreeRegister=action.payload;
    },
    selectTourPkg: (state, action: PayloadAction<any>) => {
      state.tourPkg=action.payload;
    },
    selecttourGuideDetails: (state, action: PayloadAction<any>) => {
      state.tourGuideDetails=action.payload;
    },
    
    selectTourPkgData: (state, action: PayloadAction<any>) => {
      state.tourPkgStartDate=action.payload;
    },

    getRegisterByData: (state, action: PayloadAction<any>) => {
      state.getRegisterBy=action.payload;
    },
    getGuideStatusData: (state, action: PayloadAction<any>) => {
      state.getGuideStatus=action.payload;
    },
    getsearchBoxData: (state, action: PayloadAction<any>) => {
      state.searchBox=action.payload;
    },
    
    getUserAfterUpdated: (state, action: PayloadAction<any>) => {
      state.upadetUserGetUser=action.payload;
    },
    getTravellerList: (state, action: PayloadAction<any>) => {
      state.AddTravellerStatus=action.payload;
    },
    addtowishlist: (state, action: PayloadAction<any>) => {
      state.wishlist.push(action.payload);
    },
    confirmToClickedOnBookingBtn: (state, action: PayloadAction<any>) => {
      state.ClickedOnBooking = action.payload;
    },
    clickOnKMYRBtn: (state, action: PayloadAction<any>) => {
      state.clickOnKMYRegistrationBtn = action.payload;
    },
    
    confirmToPkgId: (state, action: PayloadAction<any>) => {
      state.bookPkg[0]=action.payload
    },
    setwishlist: (state, action: PayloadAction<any>) => {
      state.wishlist = action.payload;
    },
    setnavmenus: (state, action: PayloadAction<any>) => {
      state.navmenus = action.payload;
    },
    updateloading : (state, action: PayloadAction<any>) => {
      state.loading = action.payload;
    },
    updateShowLogin : (state, action: PayloadAction<any>) => {
      state.showlogin = action.payload;
    },
    updateMobileToggle : (state, action: PayloadAction<any>) => {
      if(action.payload==state.mobileToggle){
        state.mobileToggle = "overview_tab";
      }else {
      state.mobileToggle = action.payload;
    }
    },
    updateGetCall : (state, action: PayloadAction<any>) => {
      state.showgetcall = action.payload;
    },
    updateYatraDates : (state, action: PayloadAction<any>) => {
      state.showyatradates = action.payload;
    },
    updateNotice : (state, action: PayloadAction<any>) => {
      state.showNotice = action.payload;
    },
    updateNoticeDate : (state, action: PayloadAction<any>) => {
      state.showNoticeDate = action.payload;
    },
    
    updateRequestForPrice : (state, action: PayloadAction<any>) => {
      state.showRequestForPrice = action.payload;
    },
    updateZoom : (state, action: PayloadAction<any>) => {
      state.showZoom = action.payload;
    },
    updateQuickEnquiry : (state, action: PayloadAction<any>) => {
      state.showQuickEnquiry = action.payload;
    },
    getRequestPackageDetails : (state, action: PayloadAction<any>) => {
      state.getRequestPackageDetails = action.payload;
    },
    getCartAfterTravellerUpdate : (state, action: PayloadAction<any>) => {
      state.getCartAfterTU = action.payload;
    },
    updaterecentlyvisited: (state, action: PayloadAction<any>) => {
      const index = state.recentlyvisitedpackages.indexOf(action.payload);
      if (index !== -1) {
        state.recentlyvisitedpackages.splice(index, 1);
        state.recentlyvisitedpackages.push(action.payload);
      } else {
        state.recentlyvisitedpackages.push(action.payload);
      }
      if (state.recentlyvisitedpackages.length > 8) {
        state.recentlyvisitedpackages = state.recentlyvisitedpackages.slice(-8);
      }
    }
  },
});

export const { addtowishlist,getRegisterByData,getGuideStatusData,getsearchBoxData,FreeRegisterPkg,PhoneNumberForOTPState,selectTourPkg,selectTourPkgData,selecttourGuideDetails, setwishlist,updaterecentlyvisited,setnavmenus,updateloading,updateShowLogin,updateMobileToggle,updateNotice,updateNoticeDate,updateGetCall,updateYatraDates,updateRequestForPrice,updateZoom,updateQuickEnquiry,getRequestPackageDetails,confirmToClickedOnBookingBtn,clickOnKMYRBtn,confirmToPkgId,getTravellerList,getUserAfterUpdated} = slice.actions;
export default slice.reducer;