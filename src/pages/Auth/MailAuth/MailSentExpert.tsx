// import React from 'react'
import { CiMail } from "react-icons/ci";

const MailSentExpert = () => {
  return (
    <div className='bg-[#f9ffec] w-ful min-h-[100vh] flex items-center justify-center'>
        <div className="w-[90%] md:w-[60%] lg:w-[30%] h-[300px] flex flex-col items-center justify-center gap-5 bg-white rounded-bl-[15px] rounded-tr-[15px] shadow-md">
            <span className="text-[80px]">
                <CiMail />
            </span>

            <p className="text-center font-bold text-[15px] md:text-[17px]">
                A link has been sent your mail. <br />Please, click on the link to <br />verify your account.
            </p>
        </div>
    </div>
  )
}

export default MailSentExpert;