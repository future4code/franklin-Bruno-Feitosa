import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import { goToLogin } from "../routes/coordinator";
import ReRenderProtected from "../components/ReRenderProtected/ReRenderProtected";

const useProtectedPage = () => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      goToLogin(navigate);
    }
  }, [navigate]);
  ReRenderProtected();
};

export default useProtectedPage;
