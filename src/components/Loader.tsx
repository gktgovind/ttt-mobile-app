import * as React from 'react';
import { BeatLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useEffect,useState } from 'react';


const Loader:any = () =>  {
  const loadingstate = useSelector((state:any) => state.counter.loading);
  const [showLoader,setShowLoader] = useState(false);

  useEffect(() => {
     setShowLoader(loadingstate);
  },[loadingstate]);

  return (
    <>
    {showLoader && (<>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="">

      <div className="moon-loader">
      <BeatLoader 
         color={"red"}
         loading={true}
        />
      </div>
      </div></div>
    </>)}
    </>
    
  )
}



export default Loader;