import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { goToLastPage } from "../routes/coordinator";

function TripDetailsPage() {
  let navigate = useNavigate();

  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <h1>TripDetailsPage</h1>
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

export default TripDetailsPage;
