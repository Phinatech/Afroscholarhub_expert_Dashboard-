// import React from 'react'

import { NavLink } from "react-router-dom"

const ExpertMessages = () => {
    return (
      <div className="w-full min-h-[100%] mt-[80px] flex flex-col gap-4 font-mon pb-[30px] ">
          <li className="text-[14px] md:text-[16px] font-bold text-[#84877d]">Messages</li>
  
          
            <div className="bg-white w-full min-h-screen p-4 md:p-6 rounded-bl-[20px] rounded-tr-[20px] flex flex-col justify-betwee gap-4 pb-[20px] ">
                <NavLink to="/dashboard/messages/chat">
                    <div className="flex flex-col gap-2 hover:bg-[#6a6c66] hover:text-white p-2 transition-all duration-700 ease-in-out">
                        <h1 className="text-[15px] font-medium md:text-[16px] lg:text-[19px]">Tim Baku</h1>
        
                        <p className="text-[#bfbfbf] text-[13px] lg:text-[15px]">Your Scholarship Application is... </p>
                    </div>  
                </NavLink>
    
                <hr className="w-full border-[#bfbfbf] border-[1px] mt-[10px] mb-[10px]" />

                <div className="flex flex-col gap-2 hover:bg-[#6a6c66] hover:text-white p-2 transition-all duration-700 ease-in-out">
                    <h1 className="text-[15px] font-medium md:text-[16px] lg:text-[19px]">Joy Musk</h1>
        
                    <p className="text-[#bfbfbf] text-[13px] lg:text-[15px]">Your Scholarship Application will... </p>
                </div>
        
                <hr className="w-full border-[#bfbfbf] border-[1px] mt-[10px] mb-[10px]" />

                <div className="flex flex-col gap-2 hover:bg-[#6a6c66] hover:text-white p-2 transition-all duration-700 ease-in-out">
                    <h1 className="text-[15px] font-medium md:text-[16px] lg:text-[19px]">Aderemi Jade</h1>
        
                    <p className="text-[#bfbfbf] text-[13px] lg:text-[15px]">Your Scholarship Application is... </p>
                </div>
        
                <hr className="w-full border-[#bfbfbf] border-[1px] mt-[10px] mb-[10px]" />
            </div>
      </div>
    )
  }

export default ExpertMessages