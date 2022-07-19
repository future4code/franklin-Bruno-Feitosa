import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { goToAdminPage } from "../../routes/coordinator";

const ReRenderUnprotected = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) goToAdminPage(navigate);
  }, []);
};

export default ReRenderUnprotected;
