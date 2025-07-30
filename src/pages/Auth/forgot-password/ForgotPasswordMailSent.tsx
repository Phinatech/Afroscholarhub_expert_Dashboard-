// import React from 'react'


import logo from "../../../assets/logo/afro-new-logo.png";


const ForgotPasswordMailSent = () => {
  return (
  <div className='bg-[#F3F4FD] w-ful min-h-[100vh] flex items-center justify-center'>
        <div className="w-[90%] md:w-[60%] lg:w-[30%] h-[300px flex flex-col items-center justify-cente gap-5 bg-white rounded-bl-[15px] rounded-tr-[15px] shadow-md p-5 md:p-8 lg">
            <div className="w-[80px]">
                <img src={logo} className="w-full" alt="" />
            </div>

            <p className="text-center font-medium text-[15px] md:text-[17px]">
                A link has been sent your mail. <br />Please, click on the link to <br />reset your password.
            </p>
        </div>
    </div>
  )
}

export default ForgotPasswordMailSent