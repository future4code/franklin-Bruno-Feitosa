import React from "react";
import { useNavigate } from "react-router-dom";
import { goToLastPage, goToTripListPage } from "../../routes/coordinator";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import ApplicationForm from "./ApplicationForm";
import { ScreenContainer } from "./styled";
import { Typography } from "@mui/material";
import { Button } from "@material-ui/core";

function ApplicationFormPage() {
  const tripName = localStorage.getItem("tripName");
  useUnprotectedPage();
  let navigate = useNavigate();

  return (
    <ScreenContainer>
      <Typography
        marginTop={15}
        fontFamily={"Tharlon"}
        variant={"h4"}
        marginBottom={5}
        align={"center"}
        color={"#dcdcdc"}
      >
        {tripName}
      </Typography>
      <Typography
        fontFamily={"Tharlon"}
        variant={"h6"}
        marginBottom={3}
        align={"center"}
        color={"#a89a3b"}
      >
        Formulário de Aplicação
      </Typography>
      <ApplicationForm />
      <Button
        fullWidth
        variant="text"
        color="primary"
        onClick={() => {
          goToTripListPage(navigate);
        }}
      >
        Voltar
      </Button>
    </ScreenContainer>
  );
}

export default ApplicationFormPage;
