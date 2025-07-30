import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
// import { FcGoogle } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';
import "../../../components/block/ButtonAnime.css"
import logo from "../../../assets/logo/afro-new-logo.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { url } from '../../../utils/Api';
import { setUser } from '../../../global/redux/UserSlice';
import { DatasIsaLoading } from '../../isLoading/DataIsLoading';
import { SignupResponse } from '../../../types/Interface';



const SigninExpert = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const apiUrl = `${url}/expert/login`;
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
          toast.error('Please fill in all fields.', { position: 'top-right' });
          return;
        }
    
        setIsLoading(true);
    
        try {
          const response = await axios.post<SignupResponse>(apiUrl, { email, password }); 
    
          if (response.data.success) { 

            dispatch(setUser(response.data));

            if (response.data.accessToken && response.data.refreshToken) {
              localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
              localStorage.setItem("refreshToken", JSON.stringify(response.data.refreshToken));
      
              // console.log("Stored accessToken:", localStorage.getItem("accessToken"));
              // console.log("Stored refreshToken:", localStorage.getItem("refreshToken"));
            } else {
              console.error("Tokens are missing in API response:", response.data);
            }
      
            // console.log("User Data:", response);
              // console.log(localStorage.getItem('refreshToken'))
        
              toast.success("Login successful!", { position: "top-right" });
              navigate("/dashboard");
          } else {
            console.log("in-error", response);
            toast.error('Login failed. Please try again.', {
              position: 'top-right',
            });
          }
    
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || 'Login failed. Try again.';
            console.log(error.response?.data?.message )
          toast.error(errorMessage, {
            position: 'top-right',
          });
        } finally {
          setIsLoading(false);
        }
      };
    
      const togglePasswordVisibility = () => {
        setPasswordShow(!passwordShow);
      };


  return (
    <div className="w-full min-h-[100vh] flex bg-[#f9ffec] ">
        <div className="w-full hidden lg:flex flex-col justify-between items-cente bg-auth-bg3 bg-center bg-cover md:w-[50% lg:w-[45%] p-[20px]"
        >
            <p></p>

            <p className='text-[30px] text-white font-bold leading-[40px] mb-[20px] ml-[50px]'>
                Help Unlock <br/>Opportunities!<br /><span className='text-[#F4FC03] text-[35px]'>INSPIRE & EARN!</span> 
            </p>
        </div>

        <div className='w-full md:w-[50% lg:w-[55%] flex items-center justify-center bg-transparent  relative'>
            <div className='w-full h-full bg-auth-bg3 bg-center bg-cover lg:hidden'
               ></div>

            <div className='w-[290px] h-[280px md:w-[400px] lg:w-[400px] md:h-[400px bg-white shadow-lg rounded-bl-[20px] rounded-tr-[20px] flex flex-col items-center justify-center gap-5 p-3 py-5 md:p-4 absolute bg-opacity-90 md:bg-opacity-90'>
              {/* <p>LOGO</p> */}
              
              <div className="w-[100px]">
                <img src={logo} alt="" className="w-full" />
              </div>

              <p className='text-[#000] text-[18px] md:text-[25px] font-bold'>Welcome Back, Expert!</p>

              <form className='flex flex-col items-center w-[80%] gap-[15px] md:gap-[25px]' onSubmit={handleSubmit}>

                {/* <button className="w-full h-[45px] flex items-center gap-3 p-3 text-[14px] md:text-[16px border-[1px] border-[#000] rounded-bl-[15px] rounded-tr-[15px] hover:bg-[#000] hover:text-[#fff]">
                    <FcGoogle />
                    Continue with Google
                </button>

                <h1 className="text-[14px] md:text-[17px] font-bold">OR</h1> */}

                <input className="w-full h-[45px] flex items-center gap-3 p-3 text-[11px] md:text-[13px] border-[1px] border-[#b4b4b4] rounded-bl-[15px] rounded-tr-[15px] bg-transparent  outline-none" 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />

                {/* <input className="w-full h-[45px] flex items-center gap-3 p-3 text-[14px] md:text-[16px] border-[1px] border-[#000] rounded-bl-[15px] rounded-tr-[15px]" type="password" placeholder="Password" /> */}

                <div className="w-full border-[1px] rounded-bl-[15px] rounded-tr-[15px] [6px] px-2 h-[40px] md:h-[50px] flex justify-betweeen items-center border-[#b4b4b4] bg-transparent outline-none">
                    <input className="border-none text-[11px]  md:text-[13px] w-[95%] outline-none bg-transparent" 
                        type={passwordShow ? "text" : "password"} 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />

                    <div onClick={togglePasswordVisibility} className='cursor-pointer text-[#00285e]'>
                        {passwordShow ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                </div>

                <div className='w-full flex items-center justify-between'>
                    <div></div>

                    <NavLink to="/reset-password">
                        <h2 className='text-[13px] md:text-[16px] text-[#8a8888] mt-[-8px]'>Forgot Password</h2>
                    </NavLink>
                </div>

                { isLoading ? 
                    <div className='w-full flex justify-center items-center'>
                        <DatasIsaLoading />
                    </div>
                :
                    <button className='w-full  css-button-sliding-to-left--sky' type='submit' >
                        Signin
                    </button>
                }

                <p className='text-[#9d9d9d] text-[13px] md:text-[16px]'>Don't have an account? <NavLink to="/signup"><span className='cursor-pointer text-[#000] font-bold'>Signup</span></NavLink></p>
              </form>
            </div>
        </div>
    </div>
  )
}

export default SigninExpert