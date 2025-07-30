// import React from 'react'

import stop from "../../assets/dashboardExpertImages/23F1 FE0F_Stopwatch_B 1.png";
import processed from "../../assets/dashboardExpertImages/Rectangle 152.png";
import complete from "../../assets/dashboardExpertImages/Rectangle 153.png";
import pending from "../../assets/dashboardExpertImages/Rectangle 155.png";
import canceled from "../../assets/dashboardExpertImages/Rectangle 157.png";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import HomeAllApplications from "./HomeAllApplications";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../global/redux/Store";
import { jwtDecode } from "jwt-decode";
import { DecodedUser } from "../../types/Interface";
import { useEffect } from "react";
import { setExpertId, setProfile, setProfileLoading } from "../../global/redux/ProfileSlice";
import axios from "axios";
import { url } from "../../utils/Api";
import { toast } from "react-toastify";
import { setUser } from "../../global/redux/UserSlice";
// import { setUser } from "../../global/redux/UserSlice";


const HomeExpert = () => {

  const profile = useSelector((state: RootState) => state.profile.profile);
  const user = useSelector((state: RootState) => state.user.user);
  // const user2 = useSelector((state: RootState) => state.user);
  const token = user?.accessToken;
  // const user = useSelector((state: RootState) => state.user.user);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const refreshToken = useSelector((state: RootState) => state.user.refreshToken);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const decoded = token ? jwtDecode<DecodedUser>(token) : null;
  const expertId = decoded?._id;

  console.log("user", user)
  // console.log("user2", user2)
  // console.log("user-token", token)
  // console.log("expertID", expertId)

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    
    // console.log("local-access", storedAccessToken)
    // console.log("local-refresh", storedRefreshToken)

    if (storedAccessToken && storedRefreshToken) { // Check for both tokens
      try {
        const parsedAccessToken = JSON.parse(storedAccessToken);
        const parsedRefreshToken = JSON.parse(storedRefreshToken);

        // Construct userData object.  Crucially, check if user data exists.
        const userDataFromStorage = {
          accessToken: parsedAccessToken,
          refreshToken: parsedRefreshToken,
          user: user || {} // Use existing user from state or empty object
        };

        dispatch(setUser(userDataFromStorage));
      } catch (error) {
        console.error("Error parsing tokens from localStorage:", error);
        // Handle the error appropriately, e.g., clear localStorage or set default values
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
  }, [dispatch]); 

  
  useEffect(() => {
    if (accessToken && refreshToken) {
  
      fetchExpertProfile();
    }
  }, [accessToken, refreshToken]);

// fetch profile
  const fetchExpertProfile = async () => {
    try {
      dispatch(setProfileLoading(true));
      const response = await axios.get(`${url}/expert/profile/${expertId}`, {
        headers: {
          Authorization: `Bearer ${user.refreshToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // setProfileLocally(response.data.data);

        // console.log("dispatch-data", 
          dispatch(setProfile(response.data.data))
        // )

        // dispatch(setProfile(updatedProfile));
        dispatch(setExpertId(expertId as string));

        // console.log("profile-data", response.data.data);s

        localStorage.setItem("expertProfile", JSON.stringify(response.data));

      } else {
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Server Error Response:", error.response.data);
        toast.error("Your Account is under review. Please, complete your profile, if you have not, to enjoy the platform, sooner.", {autoClose: 15000});
      } else if (error.request) {
        console.error("No Response Received:", error.request);
        toast.error("No response from server. Please try again later.");
      } else {
        console.error("Request Error:", error.message);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  if (!profile) {
    return <p>Your profile is under review. Please complete your profile to access all features.</p>;
  }

  if (profile.status === "pending") {
    navigate("/dashboard/profile/edit");
    return null;
  }


  // useEffect(() => {
  //   if (user.accessToken) {
  //     fetchExpertProfile();
  //   }
  // }, [user.accessToken]);

  console.log("profile", profile)


  // ratings calculation
  if (!profile) {
    return <p>Loading profile...</p>;
  }
  
  if (!profile.ratingsCategories) {
    return <p>No ratings</p>;
  }
  
  if (!profile.application_status_count) {
    return <p>No data</p>;
  }

  // Extract ratings from the database response
  const { one, two, three, four, five } = profile.ratingsCategories;

  // Calculate total rating value & total number of ratings
  const totalRatings =
    one.count + two.count + three.count + four.count + five.count;
  const totalScore =
    one.value * 1 +
    two.value * 2 +
    three.value * 3 +
    four.value * 4 +
    five.value * 5;

  // Compute the average rating
  const averageRating = totalRatings > 0 ? totalScore / totalRatings : 0;

  // Function to render stars dynamically
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />); // Full star
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />); // Half star
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-400" />); // Empty star
      }
    }
    return stars;
  };

  const process = profile.application_status_count?.processed || 0;
const completed = profile.application_status_count?.completed || 0;
const pend = profile.application_status_count?.pending || 0;
const cancel = profile.application_status_count?.canceled || 0;


  return (
    <div className="w-full min-h-[100%] mt-[80px] flex flex-col gap-4 font-mon pb-[30px] ">
      <li className="text-[14px] md:text-[16px] font-bold text-[#84877d]">Home</li>

      {/* <div className="flex flex-col gap-4"> */}
        
          <div className="flex flex-col gap-4">
            <div className="bg-white w-full p-4 md:p-6 rounded-bl-[20px] rounded-tr-[20px] flex justify-between md:items-center gap-5 md:gap-7">
              <div className="flex flex-col gap-1">
                <h1 className="text-[#000] font-bold text-[14px] md:text-[17px] lg:text-[20px]">Hello, Expert 
                  <>{ profile.status === "approved" ? <>
                  {' ' + profile.first_name}
                  </>  : null }</> 
                  👋</h1>
                <h2 className="text-[#000] font-bold text-[14px] md:text-[17px] lg:text-[20px]">Welcome!</h2>
                
                  {profile.status === "approved" ?
                    null
                  :
                    <><NavLink to="/dashboard/profile/edit"><h3 className="text-[#696868] text-[11px] md:text-[12px] font-bold">*Please, click to complete and verify your profile to have access to our services.</h3></NavLink></>
                  } 
              </div>

              <img src={stop} className="w-[60px] h-[60px] md:w-[100px] md:h-[100px]" alt="" />
            </div>

            <div className=" w-full flex items-center justify-between gap-3 flex-col md:flex-row flex-wrap">

              <div className="p-4 md:p-6 rounded-bl-[20px] rounded-tr-[20px] w-full md:w-[47%] lg:w-[32%] h-[100px] md:h-[125px] lg:h-[150px] bg-white flex flex-col justify-betwee gap-2 md:gap-3">
                <p className="text-[17px] lg:text-[20px] text-[#696868]  font-bold">Application(s) Processed</p>

                <div className="flex justify-between items-center">
                  <p className="text-[30px] md:text-[35px] lg:text-[45px] font-bold">
                    {/* { profile.status === "approved" ? <> */}
                  {process}
                  {/* </>  : 0 } */}
                  </p>
                  <img src={processed} className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]" alt="" />
                </div>
              </div>

              <div className="p-4 md:p-6 rounded-bl-[20px] rounded-tr-[20px] w-full md:w-[47%] lg:w-[32%] h-[100px] md:h-[125px] lg:h-[150px] bg-[#e0e5d3] flex flex-col justify-betwee gap-2 md:gap-3">
                <p className="text-[17px] lg:text-[20px] text-[#696868]  font-bold">Completed Application(s)</p>

                <div className="flex justify-between items-center">
                  <p className="text-[30px] md:text-[35px] lg:text-[45px] font-bold">
                    {/* { profile.status === "approved" ? <> */}
                  {completed }
                  {/* </>  : 0 } */}
                  </p>
                  <img src={complete} className="w-[45px] h-[40px] md:w-[55px] md:h-[50px]" alt="" />
                </div>
              </div>

              <div className="p-4 md:p-6 rounded-bl-[20px] rounded-tr-[20px] w-full md:w-[47%] lg:w-[32%] h-[100px] md:h-[125px] lg:h-[150px] bg-[#fff] flex flex-col gap-2 md:gap-3">
                <p className="text-[17px] lg:text-[20px] text-[#696868]  font-bold">Pending Application(s)</p>

                <div className="flex justify-between items-center">
                  <p className="text-[30px] md:text-[35px] lg:text-[45px] font-bold">
                    {/* { profile.status === "approved" ? <> */}
                  {pend}
                  {/* </>  : 0 } */}
                  </p>
                  <img src={pending} className="w-[45px] h-[40px] md:w-[55px] md:h-[50px]" alt="" />
                </div>
              </div>

              <div className="p-4 md:p-6 rounded-bl-[20px] rounded-tr-[20px] w-full md:w-[47%] lg:w-[32%] h-[100px] md:h-[125px] lg:h-[150px] bg-[#e0e5d3] flex flex-col gap-2 md:gap-3">
                <p className="text-[17px] lg:text-[20px] text-[#696868]  font-bold">Canceled Application(s)</p>

                <div className="flex justify-between items-center">
                  <p className="text-[30px] md:text-[35px] lg:text-[45px] font-bold">
                    {/* { profile.status === "approved" ? <> */}
                  {cancel}
                  {/* </>  : 0 } */}
                  </p>
                  <img src={canceled} className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]" alt="" />
                </div>
              </div>

              <div className="p-4 md:p-6 rounded-bl-[20px] rounded-tr-[20px] w-full md:w-[47%] lg:w-[32%] h-[100px] md:h-[125px] lg:h-[150px] bg-white flex flex-col justify-between gap-2 md:gap-3">
                <p className="text-[17px] lg:text-[20px] text-[#696868]  font-bold">Rating</p>

                <div className="flex gap-1 md:gap-2 items-center text-[20px] lg:text-[30px] ">
                  {/* <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar /> */}
                    {renderStars(averageRating)}

                  <span className="text-gray-600 text-[16px] lg:text-[18px]">
                      ({averageRating.toFixed(1)})
                  </span>
                </div>
              </div>

              <div className="hidden lg:block lg:w-[32%]"></div>

            </div>

            <HomeAllApplications />
          </div>
      {/* </div> */}
    </div> 
  )
}

export default HomeExpert;