// import React from 'react'

import { Outlet } from "react-router-dom"
import { HeaderDashboard, SidebarExpert } from "../../components"
import ScrollToTop from "../../components/block/ScrollTotop"


const DashboardExpertLayout = () => {
  return (<>
    <ScrollToTop />
    <div className="w-full min-h-screen flex flex-col bg-[#f9ffec] font-mont">
      <div className='w-full shadow-md fixed z-40'>
          <HeaderDashboard />
      </div>

      <div className='w-full min-h-screen flex flex-col md:block md:flex-row justify-betwee items-center'>
          <div className='fixed hidden md:block h-screen w-[300px md:w-[24%] lg:w-[19%] shadow-md bg-white'>
              <SidebarExpert />
          </div>

          <div className='w-[95%] md:w-[calc(100%-26%)] lg:w-[calc(100%-21%)]  md:ml-[25%] lg:ml-[20%] md:mr-[1%] min-h-screen  overflow-y-auto'>
              {/* {children} */}
              <Outlet />
          </div>
      </div>
    </div>
    </>
  )
}

export default DashboardExpertLayout