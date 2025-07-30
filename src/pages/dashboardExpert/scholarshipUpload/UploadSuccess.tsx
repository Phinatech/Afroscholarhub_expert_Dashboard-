// import React from 'react'

import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const UploadSuccess = () => {
  return (
    <div className="w-full mt-[80px] flex justify-center items-center">
        <div className="w-[100%] h-[calc(100vh-110px)] md:w-full flex flex-col gap-4 mb-[30px] items-center justify-center">
            {/* <li className="font-bold text-[14px] md:text-[16px] text-[#84877d]">Profile/Edit</li> */}

            <div className="w-full md:w-[60%] lg:w-[40%] p-[30px] bg-white rounded-bl-[20px] rounded-tr-[20px] flex flex-col items-center justify-cent gap-3">
                {/* <img src={verify} className="w-[50px] lg:w-[100px]" alt="" /> */}

                <IoCheckmarkDoneCircle className="text-[120px] md:text-[140px]" />

                <h1 className="text-[18px] md:text-[22px] text-center w-[90%] md:w-[85%] lg:w-[55%] font-bold">Application Uploaded Successfully</h1>

                <h1 className="text-[13px] md:text-[16px] text-center w-[80%] md:w-[80%] lg:w-[65%]">Admin will verify the uploaded Scolarship, before approval.</h1>

                <NavLink to="/dashboard" className="w-full">
                    <button className="w-full bg-[#000] text-white font-bold h-[45px] rounded-bl-lg rounded-tr-lg">Go To Home</button>
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default UploadSuccess