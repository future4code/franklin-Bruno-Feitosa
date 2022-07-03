import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { goToLoginPage } from "../../routes/coordinator";

const ReRenderProtected = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) goToLoginPage(navigate);
  }, []);
};

export default ReRenderProtected;
