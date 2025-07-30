import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyRedirect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    const token = searchParams.get("token");

    if (id && token) {
      navigate(`/verify?id=${id}&token=${token}`, { replace: true }); // Redirect to proper route
    } else {
      navigate("/", { replace: true }); // Redirect home if invalid
    }
  }, [navigate, searchParams]);

  return null; // No UI, just redirects
};

export default VerifyRedirect;
