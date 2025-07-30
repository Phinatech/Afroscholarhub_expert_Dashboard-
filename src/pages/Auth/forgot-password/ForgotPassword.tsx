// import React from 'react'

import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/afro-new-logo.png";
import "../../../components/block/ButtonAnime.css";
import { url } from "../../../utils/Api";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { DatasIsaLoading } from "../../isLoading/DataIsLoading";

const ForgotPassword = () => {

    const [email, setEmail] = useState<string>(""); 
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); 
//   const dispatch = useDispatch(); // Redux dispatch function

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate the email input
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      // API call to forgot password endpoint
      setIsLoading(true)

      const response = await axios.post(`${url}/expert/forgot-password`, {
        email,
      });

      // console.log("pass-data", response)

      if (response.status === 200) {
        // Handle success response
        toast.success("Password reset link sent to your email!");

        navigate("/reset-password/mailsent"); 
      }

      setIsLoading(false)

    } catch (error: any) {
      // Handle errors
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          toast.error(data.message || "Email not found!");
        } else {
          toast.error(data.message || "An error occurred. Please try again.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    }
    setIsLoading(false)
  };
  
  return (
      <div className='bg-[#F3F4FD] w-ful min-h-[100vh] flex items-center justify-center'>
          <div className="w-[90%] md:w-[60%] lg:w-[30%] h-[300px flex flex-col items-center justify-cente gap-5 bg-white rounded-bl-[15px] rounded-tr-[15px] shadow-md p-5 md:p-8 lg">
              <div className="w-[80px]">
                  <img src={logo} className="w-full" alt="" />
              </div>

              <h1 className="font-bold text-[23px]">Forgot Password</h1>

              <form onSubmit={handleSubmit} action="" className="w-full flex flex-col gap-4">

                <input className="w-full h-[45px] flex items-center gap-3 p-3 text-[11px] md:text-[13px] border-[1px] border-[#b4b4b4] rounded-bl-[15px] rounded-tr-[15px] bg-transparent  outline-none" 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                
                { isLoading ? 
                    <div className='w-full flex justify-center items-center'>
                        <DatasIsaLoading />
                    </div>
                :
                    <button className='w-full  css-button-sliding-to-left--sky' type='submit' >
                        Continue
                    </button>
                }

              </form>
              
              <p className="text-[14px] md:text-[16px] lg:text-[18px]">Back to <NavLink to="/"><span className="font-medium cursor-pointer hover:text-blue-600">Signin</span></NavLink></p>

          </div>
      </div>
  )
}

export default ForgotPassword