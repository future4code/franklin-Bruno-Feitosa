import React from "react";
import { useNavigate } from "react-router-dom";
import { goToLastPage, goToApplicationForm } from "../routes/coordinator";

function ListTripsPage() {
  let navigate = useNavigate();

  return (
    <div>
      <h1>ListTripsPage</h1>
      <button
        onClick={() => {
          goToApplicationForm(navigate);
        }}
      >
        ApplicationFormPage
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

export default ListTripsPage;
