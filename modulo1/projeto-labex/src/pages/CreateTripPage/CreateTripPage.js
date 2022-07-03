import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProtectedPage from "../../hooks/useProtectedPage";
import { goToLastPage } from "../../routes/coordinator";
import CreateTripForm from "./CreateTripForm";

function CreateTripPage() {
  useProtectedPage();
  let navigate = useNavigate();

  return (
    <div>
      <Typography
        gutterBottom
        variant={"h4"}
        align={"center"}
        color={"textPrimary"}
      >
        Criar nova viagem
      </Typography>
      <CreateTripForm />
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
