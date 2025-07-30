import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { url } from "../../../utils/Api";
import logo from "../../../assets/logo/afro-new-logo.png";
import "../../../components/block/ButtonAnime.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract `id` and `token` from URL
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  // State for password fields and loading
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [passwordShow, setPasswordShow] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShow(!passwordShow);
  };

  useEffect(() => {
    if (!id || !token) {
      toast.error("Invalid or expired reset link.");
      navigate("/"); // Redirect if the link is invalid
    }
  }, [id, token, navigate]);

  const handleResetPassword = async (e: any) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please enter both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${url}/expert/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }), 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password.");
      }

      toast.success("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/"), 3000);
    } catch (err: any) {
      toast.error(err.message || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F3F4FD] w-full min-h-[100vh] flex items-center justify-center">
      <div className="w-[90%] md:w-[60%] lg:w-[30%] flex flex-col items-center justify-center gap-5 bg-white rounded-bl-[15px] rounded-tr-[15px] shadow-md p-5 md:p-8">
        <div className="w-[80px]">
          <img src={logo} className="w-full" alt="Logo" />
        </div>

        <h1 className="font-bold text-[23px]">Reset Password</h1>

        <form onSubmit={handleResetPassword} className="w-full flex flex-col gap-4">
          {/* <input
            className="w-full h-[45px] p-3 text-[12px] md:text-[16px] border border-[#b4b4b4] rounded-bl-[15px] rounded-tr-[15px] bg-transparent outline-none"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /> */}
            <div className="w-full border-[1px] rounded-bl-[15px] rounded-tr-[15px] [6px] px-2 h-[40px] md:h-[50px] flex justify-betweeen items-center border-[#b4b4b4] bg-transparent outline-none">
                <input className="border-none text-[12px]  md:text-[14px] w-[95%] outline-none bg-transparent" 
                    type={passwordShow ? "text" : "password"} 
                    placeholder="New Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            
                <div onClick={togglePasswordVisibility} className='cursor-pointer text-[#00285e]'>
                    {passwordShow ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
            </div>

          <input
            className="w-full h-[45px] p-3 text-[12px] md:text-[14px] border border-[#b4b4b4] rounded-bl-[15px] rounded-tr-[15px] bg-transparent outline-none"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button className="w-full css-button-sliding-to-left--sky" type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
