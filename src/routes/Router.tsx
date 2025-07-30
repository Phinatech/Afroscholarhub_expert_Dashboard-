import { createBrowserRouter } from "react-router-dom";
// import HomePageLayout from "../layout/homeLayout/HomePageLayout";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import SignUpLayout from "../layout/authLayout/SignUpLayout";
import SigninLayout from "../layout/authLayout/SigninLayout";
import DashboardExpertLayout from "../layout/dashboardLayout/DashboardExxpert";
import ForgotPasswordLayout from "../layout/forgot-PasswordLayout/ForgotPasswordLayout";
import VerifyLayout from "../layout/authLayout/VerifyLayout";
import VerifyRedirectLayout from "../layout/authLayout/VerifyRedirectLayout";
import VerifyRedirect from "../pages/Auth/MailAuth/VerifyRedirect";
import ResetPasswordLayout from "../layout/forgot-PasswordLayout/ResetPasswordLayout";


const SigninExpert = lazy(() => import("../pages/Auth/signin/SigninExpert"))
const SignupExpert = lazy(() => import("../pages/Auth/signup/SignupExpert"))
// const MailSent = lazy(() => import("../pages/Auth/MailAuth/MailSent"))
const MailSentExpert = lazy(() => import("../pages/Auth/MailAuth/MailSentExpert"))
const MailVerifyExpert = lazy(() => import("../pages/Auth/MailAuth/MailVerifyExpert"))
const TermsCondition = lazy(() => import("../pages/Auth/terms&Comdition/TermsCondition"))


const ForgotPassword = lazy(() => import("../pages/Auth/forgot-password/ForgotPassword"))
const ForgotPasswordMailSent = lazy(() => import("../pages/Auth/forgot-password/ForgotPasswordMailSent"))
const ResetPassword = lazy(() => import("../pages/Auth/forgot-password/ResetPassword"))


// Expert dashboard pages
const HomeExpert = lazy(() => import("../pages/dashboardExpert/HomeExpert"))
const ProfileEditExpert = lazy(() => import("../pages/dashboardExpert/profile/ProfileEditExpert"))
const ExpertProfileVerify = lazy(() => import("../pages/dashboardExpert/profile/ExpertProfileVerify"))
const DashExpertApp = lazy(() => import("../pages/dashboardExpert/application/DashExpertApp"))
const UploadScholarship = lazy(() => import("../pages/dashboardExpert/scholarshipUpload/UploadScholarship"))
const UploadSuccess = lazy(() => import("../pages/dashboardExpert/scholarshipUpload/UploadSuccess"))
const ExpertTransactions = lazy(() => import("../pages/dashboardExpert/transaction/ExpertTransactions"))
const ExpertMessages = lazy(() => import("../pages/dashboardExpert/messageChat/ExpertMessages"))
const ExpertChat = lazy(() => import("../pages/dashboardExpert/messageChat/ExpertChat"))
const ProfileExpert = lazy(() => import("../pages/dashboardExpert/profile/ProfileExpert"))




export const element = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <HomePageLayout />,
    //     children: [
    //         {
    //             index: true,
    //             element: <HomeComp />
    //         }
    //     ]
    // },
    {
        path: "/",
        element: <SigninLayout />,
        children: [
            {
                index: true,
                element: <SigninExpert />
            },
        ]
    },
    {
        path: "/signup",
        element: <SignUpLayout />,
        children: [
            {
                index: true,
                element: <SignupExpert />
            },
            {
                path: "mailsentexpert",
                element: <MailSentExpert />
            },
            // {
            //     path: "verify",
            //     element: <MailVerifyExpert />
            // },
            {
                path: "terms&conditions",
                element: <TermsCondition />
            }
        ]
    },
    {
        path: "/verify",
        element: <VerifyLayout />,
        children: [
            {
                index: true,
                element: <MailVerifyExpert />
            }
        ]
    },
    {
        path: "/verify.html",
        element: <VerifyRedirectLayout />,
        children: [
            {
                index: true,
                element: <VerifyRedirect />
            }
        ]
    },
    {
        path: "/reset-password",
        element: <ForgotPasswordLayout />,
        children: [
            {
                index: true,
                element: <ForgotPassword />,
            },
            {
                path:"mailsent",
                element: <ForgotPasswordMailSent />
            },
        ]
    },
    {
        path: "/forgot-password.html",
        element: <ResetPasswordLayout />,
        children: [
            {
                index: true,
                element: <ResetPassword />,
            },
        ]
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute />,
        children: [
            {
                element: <DashboardExpertLayout />,
                children: [
                    {
                        index: true,
                        element: <HomeExpert />
                    },
                    {
                        path: "profile/edit",
                        element: <ProfileEditExpert />
                    },
                    {
                        path: "application",
                        element: <DashExpertApp />
                    },
                    {
                        path: "profile/edit/verify",
                        element: <ExpertProfileVerify />
                    },
                    {
                        path: "uploadscholarship",
                        element: <UploadScholarship />
                    },
                    {
                        path: "uploadscholarship/uploadsuccess",
                        element: <UploadSuccess />
                    },
                    {
                        path: "transactionexpert",
                        element: <ExpertTransactions />
                    },
                    {
                        path: "messages",
                        element: <ExpertMessages />
                    },
                    {
                        path: "messages/chat",
                        element: <ExpertChat />
                    },
                    {
                        path: "profile",
                        element: <ProfileExpert />
                    },
                ]
            }
        ]
    },
])