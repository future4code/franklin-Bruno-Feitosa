import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import { goToAdminPage } from "../routes/coordinator";
import ReRenderUnprotected from "../components/ReRenderUnprotected/ReRenderUnprotected";

const useUnprotectedPage = () => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      goToAdminPage(navigate);
    }
  }, [navigate]);
  ReRenderUnprotected();
};

export default useUnprotectedPage;
