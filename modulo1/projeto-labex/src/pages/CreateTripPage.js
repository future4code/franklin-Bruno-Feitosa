import React from "react";
import { useNavigate } from "react-router-dom";
import { goToLastPage } from "../routes/coordinator";

function CreateTripPage() {
  let navigate = useNavigate();

  return (
    <div>
      <h1>CreateTripPage</h1>
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

export default CreateTripPage;
