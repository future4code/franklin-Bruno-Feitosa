import React from "react";
import { useNavigate } from "react-router-dom";
import { goToLastPage } from "../routes/coordinator";

function ApplicationFormPage() {
  let navigate = useNavigate();

  return (
    <div>
      <h1>ApplicationFormPage</h1>
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

export default ApplicationFormPage;
