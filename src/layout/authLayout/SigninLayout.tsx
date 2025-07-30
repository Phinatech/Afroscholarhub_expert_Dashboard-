// import React from 'react'

import { Outlet } from "react-router-dom"

const SigninLayout = () => {
  return (
    <div className="font-mont">
        {/* <Header /> */}

        <Outlet />
    </div>
  )
}

export default SigninLayout