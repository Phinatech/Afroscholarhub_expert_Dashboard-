// import React from 'react'

import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { VscSend } from "react-icons/vsc";
import { CiClock2 } from "react-icons/ci";

const ExpertChat = () => {
  return (
    <div className="w-full min-h-[100%] mt-[70px] flex flex-col gap-4 font-mon pb-[30px">
        {/* <li className="text-[14px] md:text-[16px] font-bold text-[#84877d]">Messages/Chat</li> */}

        <div className="bg-white w-full min-h-[calc(100vh-90px)] p- md:p- rounded-bl-[20px] rounded-tr-[20px] flex flex-col justify-between gap-4 pb-[20px] pt-0 md:pt-0 pl-0 md:pl-0 fixe">
            <div className="flex flex-col gap-3">
                <div className="w-[90%] md:w-[calc(100%-26%)] lg:w-[calc(100%-21%)] flex flex-col gap-2 fixed bg-white pt-[20px] pl-[20px] pr-[20px]">
                    <NavLink to="/dashboard/messages">
                        <h1 className="text-[#84877d] text-[12px] flex items-center gap-2">
                            <IoIosArrowBack />
                            Back to Message
                        </h1>
                    </NavLink>

                    <h2 className="font-medium text-[18px] lg:text-[25px]">Joy Musk</h2>

                    <hr className="w-full border-[#bfbfbf] border-[1px] mt-[10px mb-[10px" />
                </div>
                
                <div className="w-[100%] h-[100%] flex flex-col gap-4 mt-[100px] lg:mt-[110px] px-[10px] md:px-[20px] pb-[50px]">
                    <div className="flex flex-col gap-2 bg-[#f9ffec] shadow-md w-[200px] md:w-[270px] lg:w-[440px] p-2 rounded-tr-[15px] rounded-tl-[15px] rounded-br-[15px] text-[12px] md:text-[13px] lg:text-[14px]">
                        <h3 className="">What's the application update?</h3>
                        <span className="flex items-center gap-1">
                            <CiClock2 className="text-[14px]" />
                            16:00
                        </span>
                    </div>

                    <div className="flex justify-between gap-2 text-[12px] md:text-[13px] lg:text-[14px] ">
                        <div></div>
                        <div className="bg-[#fff] w-[200px] md:w-[270px] lg:w-[440px] p-2 rounded-tr-[15px] rounded-tl-[15px] rounded-bl-[15px] shadow-md flex flex-col gap-2">
                            <h4 className="">
                                Your Scholarship Application will soon be completed. Have you gathered the necessary documents?
                            </h4>
                            <span className="flex items-center gap-1 text-[">
                                <CiClock2 className="text-[14px]" />
                                16:01
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 bg-[#f9ffec] shadow-md w-[200px] lg:w-[440px] p-2 rounded-tr-[15px] rounded-tl-[15px] rounded-br-[15px] text-[12px] md:text-[13px] lg:text-[14px]">
                        <h3 className="">What's the application update?</h3>
                        <span className="flex items-center gap-1">
                            <CiClock2 className="text-[14px]" />
                            16:00
                        </span>
                    </div>

                    <div className="flex justify-between gap-2 text-[12px] md:text-[13px] lg:text-[14px] ">
                        <div></div>
                        <div className="bg-[#fff] w-[200px] lg:w-[440px] p-2 rounded-tr-[15px] rounded-tl-[15px] rounded-bl-[15px] shadow-md flex flex-col gap-2">
                            <h4 className="">
                                Your Scholarship Application will soon be completed. Have you gathered the necessary documents?
                            </h4>
                            <span className="flex items-center gap-1 text-[">
                                <CiClock2 className="text-[14px]" />
                                16:01
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 bg-[#f9ffec] shadow-md w-[200px] lg:w-[440px] p-2 rounded-tr-[15px] rounded-tl-[15px] rounded-br-[15px] text-[12px] md:text-[13px] lg:text-[14px]">
                        <h3 className="">What's the application update?</h3>
                        <span className="flex items-center gap-1">
                            <CiClock2 className="text-[14px]" />
                            16:00
                        </span>
                    </div>

                    <div className="flex justify-between gap-2 text-[12px] md:text-[13px] lg:text-[14px] ">
                        <div></div>
                        <div className="bg-[#fff] w-[200px] lg:w-[440px] p-2 rounded-tr-[15px] rounded-tl-[15px] rounded-bl-[15px] shadow-md flex flex-col gap-2">
                            <h4 className="">
                                Your Scholarship Application will soon be completed. Have you gathered the necessary documents?
                            </h4>
                            <span className="flex items-center gap-1 text-[">
                                <CiClock2 className="text-[14px]" />
                                16:01
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 bg-[#f9ffec] shadow-md w-[200px] lg:w-[440px] p-2 rounded-tr-[15px] rounded-tl-[15px] rounded-br-[15px] text-[12px] md:text-[13px] lg:text-[14px]">
                        <h3 className="">What's the application update?</h3>
                        <span className="flex items-center gap-1">
                            <CiClock2 className="text-[14px]" />
                            16:00
                        </span>
                    </div>

                    <div className="flex justify-between gap-2 text-[12px] md:text-[13px] lg:text-[14px] ">
                        <div></div>
                        <div className="bg-[#fff] w-[200px] lg:w-[440px] p-2 rounded-tr-[15px] rounded-tl-[15px] rounded-bl-[15px] shadow-md flex flex-col gap-2">
                            <h4 className="">
                                Your Scholarship Application will soon be completed. Have you gathered the necessary documents?
                            </h4>
                            <span className="flex items-center gap-1 text-[">
                                <CiClock2 className="text-[14px]" />
                                16:01
                            </span>
                        </div>
                    </div>
                </div>
            
            </div>

            <div className="w-[90%] md:w-[calc(100%-26%)] lg:w-[calc(100%-21%)] flex justify-between items-center fixed bottom-[0px] bg-white pb-[10px] pl-[20px] pr-[20px]">
                <textarea  className="h-[45px] w-[88%] md:w-[92%] lg:w-[95%] border-[#bfbfbf] p-2 border-[1px] outline-none " placeholder="Say Something..." />

                <VscSend className="text-[25px] lg:text-[30px] w-[5%  flex justify-center items-center" />
            </div>
        </div>
    </div>
  )
}

export default ExpertChat