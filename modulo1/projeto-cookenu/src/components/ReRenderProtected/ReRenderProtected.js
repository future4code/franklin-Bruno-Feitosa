import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { goToLogin } from "../../routes/coordinator";

const ReRenderProtected = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) goToLogin(navigate);
  }, []);
};

export default ReRenderProtected;
