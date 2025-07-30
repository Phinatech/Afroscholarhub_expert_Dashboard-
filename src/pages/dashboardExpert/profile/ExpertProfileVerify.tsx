// import React from 'react'

import { NavLink } from "react-router-dom"
import verify from "../../../assets/dashboardExpertImages/user-verify-icon.png"

const ExpertProfileVerify = () => {
  return (
    <div className="w-full mt-[80px] flex justify-center items-center">
        <div className="w-[100%] h-[calc(100vh-110px)] md:w-full flex flex-col gap-4 mb-[30px] items-center justify-center">
            {/* <li className="font-bold text-[14px] md:text-[16px] text-[#84877d]">Profile/Edit</li> */}

            <div className="w-full md:w-[50%] lg:w-[40%] p-[30px] bg-white flex flex-col items-center justify-cent gap-6">
                <img src={verify} className="w-[50px] lg:w-[100px]" alt="" />

                <h1 className="text-[13px] md:text-[16px] text-center w-[80%] md:w-[70%] lg:w-[55%]">We are currently assessing your profile. We will reach out to you very soon. Thank you.</h1>

                <NavLink to="/dashboard" className="w-full">
                    <button className="w-full bg-[#000] text-white font-bold h-[45px] rounded-bl-lg rounded-tr-lg">Continue</button>
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default ExpertProfileVerify