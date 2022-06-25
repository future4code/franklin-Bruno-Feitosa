import React from "react";
import { useNavigate } from "react-router-dom";
import {
  goToTripDetails,
  goToCreateTrip,
  goToLoginPage,
  goToLastPage,
} from "../routes/coordinator";

function AdminHomePage() {
  let navigate = useNavigate();

  return (
    <div>
      <h1>AdminHome</h1>
      <button
        onClick={() => {
          goToTripDetails(navigate);
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
        }}
      >
        Logout
      </button>
      <button
        onClick={() => {
          goToLastPage(navigate);
        }}
      >
        Voltar
      </button>
    </div>
  );
}

export default AdminHomePage;
