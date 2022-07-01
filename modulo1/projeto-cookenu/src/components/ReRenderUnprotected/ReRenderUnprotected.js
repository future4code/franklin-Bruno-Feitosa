import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { goToRecipesList } from "../../routes/coordinator";

const ReRenderUnprotected = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) goToRecipesList(navigate);
  }, []);
};

export default ReRenderUnprotected;
