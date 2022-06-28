import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { goToLastPage, goToLoginPage } from "../routes/coordinator";

function CreateTripPage() {
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
