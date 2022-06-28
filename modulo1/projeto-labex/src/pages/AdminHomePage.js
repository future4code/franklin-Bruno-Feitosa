import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  goToTripDetails,
  goToCreateTrip,
  goToLoginPage,
  goToHomePage,
} from "../routes/coordinator";

function AdminHomePage() {
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token === null) {
      console.log("Você precisa logar para acessar essa página");
      goToLoginPage(navigate);
    }
  }, []);

  return (
    <div>
      <h1>AdminHome</h1>
      <button
        onClick={() => {
          goToTripDetails(navigate, 1);
        }}
      >
        TripDetailsPage
      </button>
      <button
        onClick={() => {
          goToCreateTrip(navigate);
        }}
      >
        CreateTripPage
      </button>
      <button
        onClick={() => {
          goToLoginPage(navigate);
          const token = localStorage.getItem("token");
          localStorage.removeItem("token");
        }}
      >
        Logout
      </button>
      <button
        onClick={() => {
          goToHomePage(navigate);
        }}
      >
        Voltar
      </button>
    </div>
  );
}

export default AdminHomePage;
