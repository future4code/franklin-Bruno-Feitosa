import React from "react";
import { useNavigate } from "react-router-dom";
import { goToLastPage } from "../../routes/coordinator";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import ApplicationForm from "./ApplicationForm";
import { ScreenContainer } from "./styled";
import { Typography } from "@mui/material";

function ApplicationFormPage() {
  const tripName = localStorage.getItem("tripName");
  useUnprotectedPage();
  let navigate = useNavigate();

  return (
    <ScreenContainer>
      <Typography
        fontFamily={"Tharlon"}
        variant={"h5"}
        marginBottom={5}
        align={"center"}
        color={"textPrimary"}
      >
        Formulário de Aplicação
      </Typography>
      <Typography
        fontFamily={"Tharlon"}
        variant={"h6"}
        marginBottom={5}
        align={"center"}
        color={"textPrimary"}
      >
        {tripName}
      </Typography>
      <ApplicationForm />
      <button
        onClick={() => {
          goToLastPage(navigate);
        }}
      >
        Voltar
      </button>
    </ScreenContainer>
  );
}

export default ApplicationFormPage;
