import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToTripListPage } from "../../routes/coordinator";

const ReRenderPublic = () => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) goToTripListPage(navigate);
  }, []);
};

export default ReRenderPublic;
