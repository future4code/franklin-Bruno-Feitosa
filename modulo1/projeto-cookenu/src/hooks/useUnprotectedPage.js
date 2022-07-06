import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReRenderUnprotected from "../components/ReRenderUnprotected/ReRenderUnprotected";
import { goToRecipesList } from "../routes/coordinator";

const useUnprotectedPage = () => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      goToRecipesList(navigate);
    }
  }, [navigate]);
  ReRenderUnprotected();
};

export default useUnprotectedPage;
