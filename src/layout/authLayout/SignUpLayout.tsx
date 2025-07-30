// import React from 'react'

import { Outlet } from "react-router-dom"

const SignUpLayout = () => {
  return (
    <div className="font-mont">
        {/* <Header /> */}

        <Outlet />
    </div>
  )
}

export default SignUpLayout