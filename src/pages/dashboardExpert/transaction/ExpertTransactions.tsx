// // import React from 'react'

// import { useEffect } from "react";
// import { LiaWalletSolid } from "react-icons/lia";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../global/redux/Store";
// import { getWallet } from "../../../utils/Api";


// const ExpertTransactions = () => {

//   const dispatch = useDispatch();

//   const userId = useSelector((state: RootState) => state.profile.expertId)
//   const wallet = useSelector((state: RootState) => state.profile.wallet)
//   const storedToken  = localStorage.getItem("refreshToken");
//   const token1  = localStorage.getItem("accessToken");

//       // let refreshToken = null;
//       let accessToken = null;

//     if (storedToken && token1) {
//       try {
//         // refreshToken = JSON.parse(storedToken);
//         accessToken = JSON.parse(token1);
//         // console.log("trans-refe", refreshToken); 
//         // console.log("trans-acc", token); 
//       } catch (error) {
//         console.error("Failed to parse refreshToken:", error);
//       }
//     } else {
//       console.log("No refreshToken or accessToken found in localStorage");
//     }

//   console.log("trans-userID", userId)
//   console.log("trans-token", accessToken)

//   useEffect(() => {
//     if (userId && accessToken) {
//         getWallet(userId, accessToken, dispatch);
//     }
//   }, [userId, accessToken, dispatch]);




//   return (
//     <div className="w-full min-h-[100%] mt-[80px] flex flex-col gap-4 font-mon pb-[30px] ">
//       <li className="text-[14px] md:text-[16px] font-bold text-[#84877d]">Transactions</li>

//        <div className="bg-white w-full min-h-[100vh] p-4 md:p-6 rounded-bl-[20px] rounded-tr-[20px] flex flex-col justify-betwee gap-4 pb-[20px]">
//             <div className="w-full md:w-[50%] lg:w-[30%] bg-[#000] h-[180px] rounded-tr-[15px] rounded-bl-[15px] p-3 py-4 flex flex-col justify-between">
//                 <h1 className="text-[#DFE702] font-bol text-[25px] lg:text-[30px]">WALLET</h1>
                
//                 {wallet ? (
//                 <div className="w-full flex justify-between items-center">
//                     <p className="text-[60px] lg:text-[70px] font-bold text-[#fff]">${wallet?.balance}</p>

//                     <LiaWalletSolid className="text-[#fff] text-[70px] lg:text-[90px]" />
//                 </div>
//                 ) : (
//                     <p className="text-[13px] text-[#fff]">No wallet data found.</p>
//                 )}
//             </div>

//             <div className="flex flex-col md:flex-row md:items-center justify-between text-[12px] md:text-[11px] lg:text-[14px] w-full text-[#696868 bg-[#000] text-white p-2 gap-2">
//                 <h1 className="md:w-[33%]">Scholarship Title</h1>
//                 <h1 className="md:w-[22%]">Student</h1>
//                 <h1 className="md:w-[15%]">Transaction (Student)</h1>
//                 <h1 className="md:w-[15%]">Transaction (Expert)</h1>
//                 <h1 className="md:w-[11%]">Status</h1>
//             </div>

//             <div className='w-full flex flex-col md:flex-row md:items-cente justify-between text-[12px] md:text-[12px] lg:text-[16px] gap-2'>
//                 <div className="md:w-[33%]">
//                     <h1>Annual Oxford STEM Graduates Scholarship ($10,000)</h1>
//                     <h2 className='flex items-center flex-wrap gap-1 mt-[4px]'><span className='text-white bg-[#9ba3b1] p-1 rounded-full text-[10px]'>STEM</span> <span className='text-white bg-[#9ba3b1] p-1 rounded-full text-[10px]'>Graduates</span> <span className='text-white bg-[#9ba3b1] p-1 rounded-full text-[10px]'>MSc</span><span className='text-white bg-[#9ba3b1] p-1 rounded-full text-[10px]'>African</span></h2>
//                 </div>

//                 <h1 className="md:w-[22%]">Joy Musk</h1>
//                 <h1 className="md:w-[15%]">Paid</h1>
//                 <h1 className="md:w-[15%] text-[#e7ed41]">Not Received</h1>
//                 <h1 className="md:w-[11%] text-[#e7ed41]">Pending</h1>
//             </div>

//             <hr className='w-full border-[#bfbfbf] border-[1px] mt-[10px] mb-[10px]' />
//         </div>
//     </div>
//   )
// }

// export default ExpertTransactions



import { useEffect, useMemo, useState } from "react";
import { LiaWalletSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../global/redux/Store";
import { getWallet } from "../../../utils/Api";

const ExpertTransactions = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.profile.expertId);
  const wallet = useSelector((state: RootState) => state.profile.wallet);
  // const storedToken = localStorage.getItem("refreshToken");
  const token1 = localStorage.getItem("accessToken");

  // let accessToken = null;
  // if (storedToken && token1) {
  //   try {
  //     accessToken = JSON.parse(token1);
  //   } catch (error) {
  //     console.error("Failed to parse accessToken:", error);
  //   }
  // }

  const accessToken = useMemo(() => {
    if (token1) {
      try {
        return JSON.parse(token1);
      } catch (error) {
        console.error("Failed to parse accessToken:", error);
        return null;
      }
    }
    return null;
  }, [token1]);

  useEffect(() => {
    if (userId && accessToken) {
      getWallet(userId, accessToken, dispatch);
    }
  }, [userId, accessToken, dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  // Sorting transactions (latest first)
  const sortedTransactions = useMemo(() => {
    return wallet?.transactions
      ? [...wallet.transactions].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      : [];
  }, [wallet?.transactions]);

  // Ensure transactions are defined
  // const transactions = wallet?.transactions || [];

  // // Calculate pagination
  // const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  // const startIndex = (currentPage - 1) * transactionsPerPage;
  // const paginatedTransactions = transactions.slice(startIndex, startIndex + transactionsPerPage);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = sortedTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <div className="w-full min-h-screen mt-20 flex flex-col gap-4 font-mon pb-8 px-4">
      <h1 className="text-lg md:text-xl font-bold text-gray-700">Transactions</h1>

      <div className="bg-white w-full min-h-screen p-6 rounded-lg shadow-lg flex flex-col gap-4">
        <div className="w-full md:w-1/2 lg:w-1/3 bg-black h-44 rounded-lg p-4 flex flex-col justify-between">
          <h1 className="text-yellow-400 font-bold text-xl lg:text-2xl">WALLET</h1>
          {wallet ? (
            <div className="w-full flex justify-between items-center">
              <p className="text-4xl lg:text-5xl font-bold text-white">${wallet?.balance}</p>
              <LiaWalletSolid className="text-white text-6xl lg:text-7xl" />
            </div>
          ) : (
            <p className="text-sm text-white">No wallet data found.</p>
          )}
        </div>

        <div className="overflow-x-auto w-full">
          <div className="flex flex-col text-xs sm:text-sm md:text-base bg-[#e5e5e5] text-[#000] p-3 rounded-lg">
            <div className="hidden lg:grid grid-cols-7 gap-2 font-semibold border-b pb-2">
              <h1>Scholarship Title</h1>
              <h1>Scholar</h1>
              <h1>Transaction ID</h1>
              <h1 className="ml-[40px]">Amount</h1>
              <h1>Status</h1>
              <h1>Type</h1>
              <h1>Date</h1>
            </div>

            {/* Mobile & Tablet view */}
            <div className="lg:hidden flex flex-col gap-3">
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction) => (
                  <div key={transaction.transactionId} className="p-3 border rounded-lg bg-[#fff] shadow-sm w-full">
                    <p><strong>Scholarship:</strong> {transaction.scholarship_title}</p>
                    <p><strong>Scholar:</strong> {transaction.scholar_name}</p>
                    <p><strong>Transaction ID:</strong> {transaction.transactionId}</p>
                    <p className="text-[#2d2d2d]"><strong>Amount:</strong> ${transaction.amount}</p>
                    <p className="text-[#2d2d2d]"><strong>Status:</strong> {transaction.status}</p>
                    <p><strong>Type:</strong> {transaction.type}</p>
                    <p><strong>Date:</strong> {transaction.createdAt.slice(0, 10)}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No transactions found.</p>
              )}
            </div>

              {/* Desktop view */}
            <div className="hidden lg:block">
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction) => (
                  <div key={transaction.transactionId} className="grid grid-cols-7 gap-2 py-2 border-b text-xs sm:text-sm md:text-base">
                    <p>{transaction.scholarship_title}</p>
                    <p>{transaction.scholar_name}</p>
                    <p>{transaction.transactionId}</p>
                    <p className="text-[#2d2d2d] ml-[40px]">${transaction.amount}</p>
                    <p className="text-[#2d2d2d]">{transaction.status}</p>
                    <p>{transaction.type}</p>
                    <p>{transaction.createdAt.slice(0, 10)}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No transactions found.</p>
              )}
            </div>
          </div>

          {/* Pagination Controls */}
          {sortedTransactions.length > transactionsPerPage && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(sortedTransactions.length / transactionsPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === index + 1 ? "bg-[#000] text-white" : "bg-[#d1d5db]"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ExpertTransactions;