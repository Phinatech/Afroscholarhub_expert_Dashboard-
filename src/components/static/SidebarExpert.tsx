 import React, { useState } from 'react'
import { NavLink, 
          useLocation, 
          useNavigate 
        } from 'react-router-dom';
import { useDispatch, 
          // useSelector 
        } from 'react-redux';
import { persistor, 
          // RootState 
        } from '../../global/redux/Store'; 
import axios from 'axios';
import { url } from '../../utils/Api';
import { toast } from 'react-toastify';
import { clearUser } from '../../global/redux/UserSlice';
import { clearProfile } from '../../global/redux/ProfileSlice';

const SidebarExpert = () => {

  const location = useLocation();

  const getActiveClass = (path: any) => {
    return location.pathname.includes(path) ? "text-[#000]" : "text-[#797b72]";
  };

  const [activeItem, setActiveItem] = React.useState("home");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  // const user  = useSelector((state: RootState) => state.user); 
  // const accessToken  = useSelector((state: RootState) => state.user.user.accessToken); 
  // const refreshToken2 = useSelector((state: RootState) => state.user.user.refreshToken )

  // console.log("user", user)
  const storedToken  = localStorage.getItem("refreshToken");
  const token1  = localStorage.getItem("accessToken");

      let refreshToken = null;
      let token = null;

    if (storedToken && token1) {
      try {
        refreshToken = JSON.parse(storedToken);
        token = JSON.parse(token1);
        // console.log("refe", refreshToken); 
        // console.log("acc", token); 
      } catch (error) {
        console.error("Failed to parse refreshToken:", error);
      }
    } else {
      console.log("No refreshToken or accessToken found in localStorage");
    }

  
  const handleLogout = async () => {
    
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
  
      if (!refreshToken) {
        console.error('No refresh token found. Cannot logout.');
        return;
      }
  
      const response = await axios.post(
        `${url}/expert/logout`,
        { refreshToken },
        {
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log('Logout successful:', response.data);
        toast.success("Logout successful")
        dispatch(clearUser());
        dispatch(clearProfile())

        await persistor.purge()

      // localStorage.removeItem("expertProfile");  
      // localStorage.removeItem("accessToken");    
      // localStorage.removeItem("refreshToken");
      localStorage.clear() 


      window.location.reload();

        navigate("/")
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`Server error during logout (status ${error.response.status}):`, error.response.data);
        toast.success("server error during logout")
      } else {
        console.error('Unexpected error during logout:', error);
        toast.success("Unexpected error during logout")
      }
    } finally {
      setIsLoggingOut(false)
    }
  };

  
  const handleSetActive = (item: string) => {
    setActiveItem(item);
  };



    const icons = {
      home: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H8C7.46957 18 6.96086 17.7893 6.58579 17.4142C6.21071 17.0391 6 16.5304 6 16V4C6 2.89 6.89 2 8 2H20C20.5304 2 21.0391 2.21071 21.4142 2.58579C21.7893 2.96086 22 3.46957 22 4V16ZM16 20V22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V7H4V20H16Z"
            fill={activeItem === "home" ? "black" : "#797b72"}
            fillOpacity="0.68"
          />
        </svg>
      ),
      applications: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 20V22H3C1.9 22 1 21.1 1 20V4C1 2.9 1.9 2 3 2H21C22.1 2 23 2.9 23 4V12.1L22.8 11.9C22.3 11.4 21.7 11.1 21 11.1V6H3V20H11ZM21.4 13.3L22.7 14.6C22.9 14.8 22.9 15.2 22.7 15.4L21.7 16.4L19.6 14.3L20.6 13.3C20.7 13.2 20.8 13.1 21 13.1C21.2 13.1 21.3 13.2 21.4 13.3ZM21.1 16.9L15.1 23H13V20.9L19.1 14.8L21.1 16.9Z"
            fill={activeItem === "applications" ? "#000" : "#797b72"}
            fillOpacity="0.68"
          />
        </svg>
      ),
      upload: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.3234 13.9922C18.3234 13.9922 18.3234 13.9969 18.3281 13.9969C18.7594 14.9062 19.0031 15.9234 19.0031 16.9969C18.9984 20.8641 15.8672 24 12 24C8.13281 24 5.00156 20.8641 5.00156 17.0016C5.00156 15.9281 5.24531 14.9109 5.67656 14.0016C5.75625 13.8328 5.84531 13.6641 5.93906 13.5C6.14531 13.1438 6.37969 12.8109 6.64219 12.5016C7.92656 10.9734 9.85313 10.0031 12.0047 10.0031C13.5797 10.0031 15.0328 10.5234 16.2047 11.4047C16.6313 11.7281 17.0203 12.0937 17.3672 12.5062C17.6297 12.8156 17.8641 13.1531 18.0703 13.5047C18.1641 13.6641 18.2484 13.8328 18.3281 13.9969L18.3234 13.9922ZM19.5609 13.1109C18.15 10.3734 15.2953 8.49844 12 8.49844C8.70469 8.49844 5.85 10.3734 4.43906 13.1109L0 9.50156L12 0L24 9.50156L19.5609 13.1156V13.1109Z"
            fill={activeItem === "upload" ? "#000" : "#797b72"}
            fillOpacity="0.68"
          />
        </svg>
      ),
      messages: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.656 20.479C5.51242 20.6038 5.3362 20.6851 5.14803 20.7133C4.95987 20.7415 4.76756 20.7155 4.59369 20.6382C4.41982 20.5609 4.2716 20.4356 4.16644 20.2771C4.06128 20.1185 4.00354 19.9332 4 19.743V17.5C3.46957 17.5 2.96086 17.2893 2.58579 16.9142C2.21071 16.5391 2 16.0304 2 15.5V8.5C2 7.96957 2.21071 7.46086 2.58579 7.08579C2.96086 6.71071 3.46957 6.5 4 6.5H15C15.5304 6.5 16.0391 6.71071 16.4142 7.08579C16.7893 7.46086 17 7.96957 17 8.5V15.5C17 16.0304 16.7893 16.5391 16.4142 16.9142C16.0391 17.2893 15.5304 17.5 15 17.5H10.003L5.656 20.479ZM6.5 17.386C6.5911 17.3853 6.68054 17.3616 6.76 17.317L9.115 15.679C9.2826 15.5624 9.48186 15.5 9.686 15.5H14C14.2652 15.5 14.5196 15.3946 14.7071 15.2071C14.8946 15.0196 15 14.7652 15 14.5V9.5C15 9.23478 14.8946 8.98043 14.7071 8.79289C14.5196 8.60536 14.2652 8.5 14 8.5H5C4.73478 8.5 4.48043 8.60536 4.29289 8.79289C4.10536 8.98043 4 9.23478 4 9.5V14.5C4 15.04 4.429 15.482 5 15.5C5.41 15.516 5.707 15.583 5.844 15.726C5.972 15.86 5.979 16.086 6 16.516C6.003 16.579 6.003 16.693 6 16.886C6 17.0186 6.05268 17.1458 6.14645 17.2396C6.24021 17.3333 6.36739 17.386 6.5 17.386ZM18 12.516C17.9967 12.6393 17.9967 12.7627 18 12.886V12.516ZM18 12.516C18.02 12.086 18.028 11.86 18.156 11.726C18.293 11.583 18.59 11.516 19 11.5C19.571 11.482 20 11.04 20 10.5V5.5C20 5.23478 19.8946 4.98043 19.7071 4.79289C19.5196 4.60536 19.2652 4.5 19 4.5H10C9.73478 4.5 9.48043 4.60536 9.29289 4.79289C9.10536 4.98043 9 5.23478 9 5.5H7V4.5C7 3.96957 7.21071 3.46086 7.58579 3.08579C7.96086 2.71071 8.46957 2.5 9 2.5H20C20.5304 2.5 21.0391 2.71071 21.4142 3.08579C21.7893 3.46086 22 3.96957 22 4.5V11.5C22 12.0304 21.7893 12.5391 21.4142 12.9142C21.0391 13.2893 20.5304 13.5 20 13.5V15.743C19.9965 15.9332 19.9387 16.1185 19.8336 16.2771C19.7284 16.4356 19.5802 16.5609 19.4063 16.6382C19.2324 16.7155 19.0401 16.7415 18.852 16.7133C18.6638 16.6851 18.4876 16.6038 18.344 16.479L18 16.243V12.516Z"
            fill={activeItem === "messages" ? "#000" : "#797b72"}
            fillOpacity="0.68"
          />
        </svg>
      ),
      transactions: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 2H10C9.20435 2 8.44129 2.31607 7.87868 2.87868C7.31607 3.44129 7 4.20435 7 5V12C7 12.7956 7.31607 13.5587 7.87868 14.1213C8.44129 14.6839 9.20435 15 10 15H20C20.7956 15 21.5587 14.6839 22.1213 14.1213C22.6839 13.5587 23 12.7956 23 12V5C23 4.20435 22.6839 3.44129 22.1213 2.87868C21.5587 2.31607 20.7956 2 20 2ZM21 12C21 12.2652 20.8946 12.5196 20.7071 12.7071C20.5196 12.8946 20.2652 13 20 13H10C9.73478 13 9.48043 12.8946 9.29289 12.7071C9.10536 12.5196 9 12.2652 9 12V5C9 4.73478 9.10536 4.48043 9.29289 4.29289C9.48043 4.10536 9.73478 4 10 4H20C20.2652 4 20.5196 4.10536 20.7071 4.29289C20.8946 4.48043 21 4.73478 21 5V12ZM17.5 8C17.13 8.00221 16.7738 8.14111 16.5 8.39C16.285 8.19455 16.0178 8.06577 15.7309 8.0193C15.4441 7.97284 15.1499 8.01069 14.8842 8.12826C14.6185 8.24582 14.3926 8.43805 14.234 8.68157C14.0755 8.92509 13.9911 9.20942 13.9911 9.5C13.9911 9.79058 14.0755 10.0749 14.234 10.3184C14.3926 10.562 14.6185 10.7542 14.8842 10.8717C15.1499 10.9893 15.4441 11.0272 15.7309 10.9807C16.0178 10.9342 16.285 10.8054 16.5 10.61C16.6806 10.7741 16.8985 10.8917 17.1348 10.9526C17.3711 11.0134 17.6187 11.0157 17.8561 10.9592C18.0935 10.9027 18.3135 10.7892 18.4971 10.6284C18.6807 10.4676 18.8223 10.2645 18.9096 10.0366C18.9969 9.80877 19.0273 9.56304 18.9981 9.32076C18.969 9.07848 18.8812 8.84697 18.7423 8.64632C18.6034 8.44567 18.4177 8.28192 18.2012 8.1693C17.9847 8.05667 17.744 7.99856 17.5 8ZM16 17C15.7348 17 15.4804 17.1054 15.2929 17.2929C15.1054 17.4804 15 17.7348 15 18V19C15 19.2652 14.8946 19.5196 14.7071 19.7071C14.5196 19.8946 14.2652 20 14 20H4C3.73478 20 3.48043 19.8946 3.29289 19.7071C3.10536 19.5196 3 19.2652 3 19V15H4C4.26522 15 4.51957 14.8946 4.70711 14.7071C4.89464 14.5196 5 14.2652 5 14C5 13.7348 4.89464 13.4804 4.70711 13.2929C4.51957 13.1054 4.26522 13 4 13H3V12C3 11.7348 3.10536 11.4804 3.29289 11.2929C3.48043 11.1054 3.73478 11 4 11C4.26522 11 4.51957 10.8946 4.70711 10.7071C4.89464 10.5196 5 10.2652 5 10C5 9.73478 4.89464 9.48043 4.70711 9.29289C4.51957 9.10536 4.26522 9 4 9C3.20435 9 2.44129 9.31607 1.87868 9.87868C1.31607 10.4413 1 11.2044 1 12V19C1 19.7956 1.31607 20.5587 1.87868 21.1213C2.44129 21.6839 3.20435 22 4 22H14C14.7956 22 15.5587 21.6839 16.1213 21.1213C16.6839 20.5587 17 19.7956 17 19V18C17 17.7348 16.8946 17.4804 16.7071 17.2929C16.5196 17.1054 16.2652 17 16 17ZM6 18H7C7.26522 18 7.51957 17.8946 7.70711 17.7071C7.89464 17.5196 8 17.2652 8 17C8 16.7348 7.89464 16.4804 7.70711 16.2929C7.51957 16.1054 7.26522 16 7 16H6C5.73478 16 5.48043 16.1054 5.29289 16.2929C5.10536 16.4804 5 16.7348 5 17C5 17.2652 5.10536 17.5196 5.29289 17.7071C5.48043 17.8946 5.73478 18 6 18Z"
            fill={activeItem === "transactions" ? "#000" : "#797b72"}
            fillOpacity="0.68"
          />
        </svg>
      ),
      profile: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 1.6C8.79113 1.6 9.56448 1.8346 10.2223 2.27412C10.8801 2.71365 11.3928 3.33836 11.6955 4.06927C11.9983 4.80017 12.0775 5.60444 11.9231 6.38036C11.7688 7.15629 11.3878 7.86902 10.8284 8.42843C10.269 8.98784 9.55629 9.3688 8.78036 9.52314C8.00444 9.67748 7.20017 9.59827 6.46927 9.29552C5.73836 8.99277 5.11365 8.48008 4.67412 7.82228C4.2346 7.16448 4 6.39113 4 5.6C4 4.53913 4.42143 3.52172 5.17157 2.77157C5.92172 2.02143 6.93913 1.6 8 1.6ZM8 0C6.89242 0 5.80972 0.328434 4.88881 0.94377C3.96789 1.55911 3.25013 2.43371 2.82627 3.45697C2.40242 4.48024 2.29153 5.60621 2.5076 6.69251C2.72368 7.7788 3.25703 8.77662 4.0402 9.5598C4.82338 10.343 5.8212 10.8763 6.90749 11.0924C7.99379 11.3085 9.11976 11.1976 10.143 10.7737C11.1663 10.3499 12.0409 9.63211 12.6562 8.71119C13.2716 7.79028 13.6 6.70758 13.6 5.6C13.6 4.11479 13.01 2.69041 11.9598 1.6402C10.9096 0.589998 9.48521 0 8 0ZM16 22.4H14.4V18.4C14.4 17.3391 13.9786 16.3217 13.2284 15.5716C12.4783 14.8214 11.4609 14.4 10.4 14.4H5.6C4.53913 14.4 3.52172 14.8214 2.77157 15.5716C2.02143 16.3217 1.6 17.3391 1.6 18.4V22.4H0V18.4C0 16.9148 0.589998 15.4904 1.6402 14.4402C2.69041 13.39 4.11479 12.8 5.6 12.8H10.4C11.8852 12.8 13.3096 13.39 14.3598 14.4402C15.41 15.4904 16 16.9148 16 18.4V22.4ZM16 1.6H24V3.2H16V1.6ZM16 5.6H24V7.2H16V5.6ZM16 9.6H21.6V11.2H16V9.6Z"
            fill={activeItem === "profile" ? "#000" : "#797b72"}
            fillOpacity="0.68"
          />
        </svg>
      ),
      logout: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H11C11.2833 3 11.521 3.096 11.713 3.288C11.905 3.48 12.0007 3.71733 12 4C11.9993 4.28267 11.9033 4.52033 11.712 4.713C11.5207 4.90567 11.2833 5.00133 11 5H5V19H11C11.2833 19 11.521 19.096 11.713 19.288C11.905 19.48 12.0007 19.7173 12 20C11.9993 20.2827 11.9033 20.5203 11.712 20.713C11.5207 20.9057 11.2833 21.0013 11 21H5ZM17.175 13H10C9.71667 13 9.47933 12.904 9.288 12.712C9.09667 12.52 9.00067 12.2827 9 12C8.99933 11.7173 9.09533 11.48 9.288 11.288C9.48067 11.096 9.718 11 10 11H17.175L15.3 9.125C15.1167 8.94167 15.025 8.71667 15.025 8.45C15.025 8.18333 15.1167 7.95 15.3 7.75C15.4833 7.55 15.7167 7.44567 16 7.437C16.2833 7.42833 16.525 7.52433 16.725 7.725L20.3 11.3C20.5 11.5 20.6 11.7333 20.6 12C20.6 12.2667 20.5 12.5 20.3 12.7L16.725 16.275C16.525 16.475 16.2877 16.571 16.013 16.563C15.7383 16.555 15.5007 16.4507 15.3 16.25C15.1167 16.05 15.0293 15.8127 15.038 15.538C15.0467 15.2633 15.1423 15.034 15.325 14.85L17.175 13Z"
            fill={activeItem === "logout" ? "#000" : "#797b72"}
            fillOpacity="0.68"
          />
        </svg>
      ),
    };


  return (
    <div className="w-ful lg:w-[19%] md:w-[24%] h-screen fixed flex flex-col items-center justify-between p-[16px] py-[35px] lg:pb-[40px] bg-white">
      <div className="bg-[#f9ffec] w-[96%] lg:w-[95%] text-[13px] lg:text-[15px] p-[10px] md:px-[6px] lg:p-[16px] py-[30px] lg:py-[40px] lg:pl-[23px] flex flex-col gap-4 lg:gap-8 rounded-[10px] mt-[70px]">
        <NavLink to="/dashboard">
          <ol 
            onClick={() => handleSetActive("home")}
            className={`text-[#000] flex gap-3 items-center font-bold cursor-pointer ${getActiveClass("/dashboard")}`}>
            {/* <img src={home} className="" alt="" /> */}
            {icons.home}
            Home
          </ol>
        </NavLink>

        <NavLink to="application">
          <ol 
           onClick={() => handleSetActive("applications")}
           className={`text-[#000] flex gap-3 items-center font-bold cursor-pointer  ${getActiveClass("/dashboard/application")}`}>
            {/* <img src={app} className="" alt="" /> */}
            {icons.applications}
            Application(s)
          </ol>
        </NavLink>

        <NavLink to="uploadscholarship">
          <ol  
          onClick={() => handleSetActive("upload")}
          className={`text-[#000] flex gap-3 items-center font-bold cursor-pointer ${getActiveClass("upload")}`}>
          {/* <img src={upload} className="" alt="" /> */}
          {icons.upload}
            Upload Scholarship(s)
          </ol>
        </NavLink>

        <NavLink to="messages">
          <ol  
          onClick={() => handleSetActive("messages")}
          className={`text-[#000] flex gap-3 items-center font-bold cursor-pointer ${getActiveClass("messages")}`}>
          {/* <img src={upload} className="" alt="" /> */}
          {icons.messages}
            Messages
          </ol>
        </NavLink>

        <NavLink to="/dashboard/transactionexpert">
          <ol  
          onClick={() => handleSetActive("transactions")}
          className={`text-[#000] flex gap-3 items-center font-bold cursor-pointer ${getActiveClass("/dashboard/transactionexpert")}`}>
          {/* <img src={upload} className="" alt="" /> */}
          {icons.transactions}
            Transactions
          </ol>
        </NavLink>

      </div>
      
      <div className="bg-[#f9ffec] w-[96%] lg:w-[95%] text-[14px] lg:text-[15px] p-[10px] lg:p-[20px] py-[30px] lg:py-[40px] lg:pl-[23px] flex flex-col gap-4 lg:gap-8 rounded-[10px]">
        <NavLink to="profile">
        <ol 
          onClick={() => handleSetActive("profile")}
          className={`text-[#000] flex gap-3 items-center font-bold cursor-pointer ${getActiveClass("profile")}`}>
          {/* <img src={home} className="" alt="" /> */}
          {icons.profile}
            Profile
          </ol>
        </NavLink>

        {/* <NavLink to="/signin/expert"> */}
          <ol 
          //  onClick={() => handleSetActive("logout")}
           onClick={handleLogout}
           className={`text-[#000] flex gap-3 items-center font-bold cursor-pointer ${
            activeItem === "logout" ? "text-[#000]" : "text-[#797b72]"
          }`}>
          {/* <img src={app} className="" alt="" /> */}
            {icons.logout}
            {isLoggingOut ? "Logging out..." : "Logout"}
          </ol>
        {/* </NavLink> */}
      </div>
    </div>
  )
}

export default SidebarExpert