// import React from 'react'

import { ThreeDots } from "react-loader-spinner"

const IsLoading = () => {
  return (
    <div style={{width:"100%", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"", flexDirection:"column"}}>

        {/* <img src="" alt="" /> */}

        <ThreeDots 
            visible={true}
            height="80"
            width="80"
            color="#000"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />

        <i style={{fontSize:"17px", color:"#000", marginTop:"30px"}}>Loading...</i>
    </div>
  )
}

export default IsLoading