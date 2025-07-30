// import React from 'react'

import { NavLink } from "react-router-dom";
import terms from "../../../assets/authImages/terms2.jpg";
import logo from "../../../assets/logo/afro-new-logo.png";
import { FaArrowLeftLong } from "react-icons/fa6";

const TermsCondition = () => {
  return (
    <div className="w-full min-h-[100%] flex flex-col items-center justify-center gap-5">
        <div className="w-full h-[70px] shadow-lg bg-white flex items-center">
            <img src={logo} alt="" className="w-[60px] ml-[20px]" />
        </div>

        <div className="w-[90%] pb-[30px]">
            <NavLink to="/signup">
                <button className="p-3 bg-[#000] text-white flex gap-2 items-center text-[12px] md:text-[14px] lg:text-[17px] mb-[15px]" > <FaArrowLeftLong /> Back To Signup</button>
            </NavLink>
            
            <div className="w-full h-[)] flex flex-col md:flex-row gap-3 justify-between items-center">
                <img src={terms} alt="" className="w-full md:w-[40%]" />

                <h1 className="text-[40px] md:text-[50px] lg:text-[80px] w-full md:w-[50%] font-bold animate-pulse text-center md:text-left">TERMS & CONDITIONS</h1>
            </div>

            <hr className="w-full border-gray-300 border-[1px] mt-[20px] mb-[20px]" />

            <div className="w-full flex flex-col gap-3">
                {/* <h2 className="text-[13px] md:text-[16px] lg:text-[20px] font-bold text-">Terms and Condition for AfroScholarHub</h2> */}

                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">1. General Use of the Platform</h3>
                    
                    <div className="">
                        <li>Users must register with accurate and verifiable emails.</li>
                        <li>AfroScholarHub reserves the right to suspend or terminate accounts for violating terms.</li>
                        <li>Use of the platform is restricted to lawful activities.</li>
                    </div>
                </p>

                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">2. Payments and Escrow</h3>
                    
                    <div className="">
                        <li>Payments are processed through AfroScholarHub's escrow system.</li>
                        <li>Funds are held until the applicant confirms tash completion.</li>
                        <li>Platform fees/commissions are deducated before funds are released to Expert.</li>
                        <li>No refunds are issues once a task is confimed complets by the Applicant.</li>
                    </div>
                </p>

                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">3. Task Management</h3>
                    
                    <div className="">
                        <li>Applicants must provide clear and detailed requirements.</li>
                        <li>Experts are responsible for delivering quality and timely assistance.</li>
                        <li>AfroScholarHub is not liable for disputes arising from misunderstandings between parties but will mediate if necessary.</li>
                    </div>
                </p>
                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">4. Confidentiality and Intellectual Property </h3>
                    
                    <div className="">
                        <li>Experts must not disclose or misuse applicant-provided data or materials.</li>
                        <li>Applicants retain intellectual property rights for submitted work unless agreed otherwise.</li>
                    </div>
                </p>
                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">5. Account and Payment Security </h3>
                    
                    <div className="">
                        <li>Users are responsible for safeguarding their login credentials.</li>
                        <li>AfroScholarHub is not liable for unauthorized account access resulting from user negligence.</li>
                    </div>
                </p>
                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">6. Prohibited Activities  </h3>
                    
                    <div className="">
                        <li>No fraudulent activities or misrepresentation by applicants or experts.</li>
                        <li>No exchange of personal payment details outside the platform to bypass escrow.</li>
                    </div>
                </p>
                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">7.Dispute Resolution  </h3>
                    
                    <div className="">
                        <li>All disputes must be reported to AfroScholarHub within a specified time (e.g., 7 days).</li>
                        <li>The platform’s decision on disputes is final and binding.</li>
                    </div>
                </p>
                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">8. Platform Liability  </h3>
                    
                    <div className="">
                        <li>AfroScholarHub is a facilitator, not a direct party to agreements between applicants and experts.</li>
                        <li>NThe platform is not liable for losses caused by technical issues, user negligence, or third-party services.</li>
                    </div>
                </p>
                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">9. Modifications </h3>
                    
                    <div className="">
                        <li>AfroScholarHub reserves the right to update terms and conditions at any time. Users will be notified of significant changes</li>
                    </div>
                </p>
                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">6. Prohibited Activities </h3>
                    
                    <div className="">
                        <li>No fraudulent activities or misrepresentation by applicants or experts.</li>
                        <li>No exchange of personal payment details outside the platform to bypass escrow.</li>
                    </div>
                </p>
            </div>

            <hr className="w-full border-gray-300 border-[1px] mt-[20px] mb-[20px]" />

            <div className="w-full flex flex-col gap-3">
                <h2 className="text-[13px] md:text-[16px] lg:text-[20px] font-bold text-">Disclaimers to Protect All Parties</h2>
                
                <h3 className="text-[13px] md:text-[16px] lg:text-[19px] font-bold mb-[10px] text-justify">These disclaimers safeguard both applicants and experts, ensuring transparency and trust:</h3>

                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">1. Platform Role Disclaimer</h3>
                    
                    <div className="">
                        <li>AfroScholarHub is an intermediary and does not guarantee the quality or completeness of expert services.</li>
                        <li>The platform is not responsible for actions or omissions of users.</li>
                    </div>
                </p>

                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">2.  Task and Payment Security Disclaimer</h3>
                    
                    <div className="">
                        <li>Applicants and experts must communicate exclusively through the platform to avoid scams.</li>
                        <li>AfroScholarHub is not liable for losses resulting from transactions conducted outside the platform.</li>
                    </div>
                </p>

                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">3. Service Quality Disclaimer</h3>
                    
                    <div className="">
                        <li>The platform does not guarantee specific outcomes for applicants using expert services.</li>
                        <li>Experts must ensure they have the necessary qualifications and expertise for tasks.</li>
                    </div>
                </p>
                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">4. Confidentiality Disclaimer </h3>
                    
                    <div className="">
                        <li>While the platform promotes secure data handling, it is not liable for breaches caused by user negligence.</li>
                    </div>
                </p>
                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">5. Account Responsibility Disclaimer  </h3>
                    
                    <div className="">
                        <li>Users are solely responsible for the security of their accounts.</li>
                        <li>AfroScholarHub is not liable for unauthorized access due to weak passwords or shared credentials.</li>
                    </div>
                </p>
                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">6. Refund Disclaimer </h3>
                    
                    <div className="">
                        <li>Refunds are not guaranteed once a task is marked as "Complete" by the applicant.</li>
                        <li>Any request for refunds due to dissatisfaction will follow the platform’s dispute resolution process.</li>
                    </div>
                </p>
                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">7. Force Majeure Disclaimer</h3>
                    
                    <div className="">
                        <li>AfroScholarHub is not liable for delays or failures due to events beyond its control, such as technical failures, natural disasters, or governmental restrictions.</li>
                    </div>
                </p>
            </div>

            <hr className="w-full border-gray-300 border-[1px] mt-[20px] mb-[20px]" />

            <div className="w-full flex flex-col gap-3">
                <h2 className="text-[13px] md:text-[16px] lg:text-[20px] font-bold text-">Rules for Effective Use of the Platform</h2>
                
                <h3 className="text-[13px] md:text-[16px] lg:text-[19px] font-bold mb-[10px]">To ensure users follow the platform rules effectively: </h3>

                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">1. Mandatory Use of Escrow: </h3>
                    
                    <div className="">
                        <li>All payments must go through AfroScholarHub's system. Direct payments between applicants and experts are prohibited. </li>
                    </div>
                </p>

                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">2. Clear Communication: </h3>
                    
                    <div className="">
                        <li>Applicants must provide precise task requirements; experts must deliver according to agreed terms. </li>
                    </div>
                </p>

                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">3. Timely Actions: </h3>
                    
                    <div className="">
                        <li>Applicants must confirm task completion within a set time frame to avoid payment delays.</li>
                        <li>Experts must meet deadlines to maintain credibility.</li>
                    </div>
                </p>
                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">4. Adherence to Dispute Policies: </h3>
                    
                    <div className="">
                        <li>Disputes must be submitted within the platform’s timeline, with supporting evidence.</li>
                    </div>
                </p>
                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">5. Avoid External Transactions: </h3>
                    
                    <div className="">
                        <li>Users should report any attempt to bypass the platform to AfroScholarHub’s support team.</li>
                    </div>
                </p>
                <p className="text-[13px] md:text-[16px] lg:text-[19px] text-justify">
                    <h3 className="font-bold mb-[10px]">6. Regular Updates to Terms: </h3>
                    
                    <div className="">
                        <li>Users must review and agree to updated terms and conditions to continue using the platform.</li>
                    </div>
                </p>
            </div>
            
        </div>
    </div>
  )
}

export default TermsCondition