import React from "react";
import { useNavigate } from "react-router-dom";
import { goToAdminPage, goToTripListPage } from "../routes/coordinator";

function HomePage() {
  let navigate = useNavigate();

  return (
    <div>
      <h1>HomePage</h1>
      <button
        onClick={() => {
          goToAdminPage(navigate);
        }}
      >
        Admin
      </button>
      <button
        onClick={() => {
          goToTripListPage(navigate);
        }}
      >
        TripList
      </button>
    </div>
  );
}

export default HomePage;
