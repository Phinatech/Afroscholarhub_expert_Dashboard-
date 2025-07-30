
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CheckCircle, XCircle, Loader2 } from "lucide-react"; 
import { url } from "../../../utils/Api";

const MailVerifyExpert = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const verifyUser = async () => {
      const id = searchParams.get("id");
      const token = searchParams.get("token");

      if (!id || !token) {
        toast.error("Invalid verification link.");
        setStatus("error");
        return;
      }

      try {
        const response = await axios.post(`${url}/expert/verify`, {
          id,
          token,
        });

        if (response.status === 200) {
          toast.success("Account successfully verified!");
          setStatus("success");
          console.log("res", response)
          setTimeout(() => navigate("/"), 3000); 
        } else {
          toast.error("Verification failed. Please try again.");
          setStatus("error");
        }
      } catch (error: any) {
        console.error("Verification error:", error);
        toast.error(
          error.response?.data?.message || "An error occurred during verification."
        );
        setStatus("error");
      }
    };

    verifyUser();
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full text-center">
        {status === "loading" && (
          <>
            <Loader2 className="animate-spin mx-auto text-blue-500" size={50} />
            <h2 className="text-lg font-semibold mt-4">Verifying your account...</h2>
            <p className="text-gray-500 text-sm">Please wait while we confirm your details.</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="text-[#000] mx-auto" size={50} />
            <h2 className="text-lg font-semibold mt-4 text-green-600">
              Account Verified!
            </h2>
            <p className="text-gray-500 text-sm">Redirecting to login page...</p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="text-[#000] mx-auto" size={50} />
            <h2 className="text-lg font-semibold mt-4 text-[#000]">
              Verification Failed
            </h2>
            <p className="text-gray-500 text-sm">The link is invalid or expired.</p>
            <button
              onClick={() => navigate("/signup")}
              className="mt-4 bg-[#000] hover:bg-[#000000d9] text-white px-4 py-2 rounded-lg transition"
            >
              Go to Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MailVerifyExpert;