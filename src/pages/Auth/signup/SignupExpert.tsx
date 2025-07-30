import {useState} from 'react'
import "../../../components/block/ButtonAnime.css"
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
// import { FcGoogle } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';
import logo from "../../../assets/logo/afro-new-logo.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { url } from '../../../utils/Api';
// import { useMutation } from '@tanstack/react-query';
import { setUser } from '../../../global/redux/UserSlice';
import { SignupResponse } from '../../../types/Interface';
import { DatasIsaLoading } from '../../isLoading/DataIsLoading';

const SignupExpert = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [isAgreed, setIsAgreed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiUrl = `${url}/expert/register`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !isAgreed) {
      toast.error('Please fill in all fields.', { position: 'top-right' });
      return;
    }

    setIsLoading(true); 

    try {
      const response = await axios.post<SignupResponse>(apiUrl, { email, password, terms_condition: isAgreed });
      dispatch(setUser(response.data)); 
      
      console.log("resp", response)

      toast.success('Signup successful! Please confirm your email.', {
        position: 'top-right',
      });
      

      navigate('/signup/mailsentexpert');

    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message;
        console.log("errorss", errorMessage)
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
            <div className='w-full h-full bg-auth-bg2 bg-center bg-cover lg:hidden'
               ></div>

            <div className='w-[290px] h-[280px md:w-[400px] lg:w-[400px] md:h-[400px bg-white shadow-lg rounded-bl-[20px] rounded-tr-[20px] flex flex-col items-center justify-center gap-5 p-3 py-5 md:p-4 lg:pt-8 absolute bg-opacity-90 md:bg-opacity-90'>
              {/* <p>LOGO</p> */}
              
              <div className="w-[100px]">
                <img src={logo} alt="" className="w-full" />
              </div>

              <p className='text-[#000] text-[18px] md:text-[25px] font-bold'>Sign up, Expert!</p>

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

                <div className="w-full border-[1px] rounded-bl-[15px] rounded-tr-[15px] [6px] px-2 h-[40px] md:h-[50px] flex justify-betweeen items-center border-[#b4b4b4] bg-transparent outline-none">
                    <input className="border-none text-[11px]  md:text-[13px] w-[95%] outline-none bg-transparent" 
                      type={passwordShow ? "text" : "password"} 
                      placeholder="Password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                    />

                    <div onClick={togglePasswordVisibility} className="cursor-pointer text-[#00285e]">
                      {passwordShow ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                </div>

                <div className="w-full flex gap-2 md:gap-3 items-center">
                  <input 
                    type="checkbox" 
                    className='w-[20px] h-[20px] md:w-[25px] md:h-[25px] rounded-sm' 
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    required
                  />

                  <p className='text-[11px] md:text-[13px]'>I agree to the <NavLink to="terms&conditions"><span className='cursor-pointer text-blue-400'>Terms of Condition and Privacy Policy</span></NavLink></p>
                </div>

                { isLoading ? 
                    <div className='w-full flex justify-center items-center'>
                      <DatasIsaLoading />
                    </div>
                  :
                    <button className='w-full  css-button-sliding-to-left--sky' type='submit' >
                      Signup
                    </button>
                }

                {/* <NavLink to="/dashboard" className="w-full"> */}
                
                {/* </NavLink> */}

                <p className='text-[#9d9d9d] text-[12px] md:text-[16px]'>Already have an account? <NavLink to="/"><span className='cursor-pointer text-[#000] font-bold'>Signin</span></NavLink></p>
              </form>
            </div>
        </div>
    </div>
  )
}

export default SignupExpert

