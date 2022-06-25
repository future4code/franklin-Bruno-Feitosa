import React from "react";
import { useNavigate } from "react-router-dom";
import { goFromLoginToHome } from "../routes/coordinator";

function LoginPage() {
  let navigate = useNavigate();

  return (
    <div>
      <h1>LoginPage</h1>
      <button
        onClick={() => {
          goFromLoginToHome(navigate);
        }}
      >
        Voltar
      </button>
    </div>
  );
}

export default LoginPage;
