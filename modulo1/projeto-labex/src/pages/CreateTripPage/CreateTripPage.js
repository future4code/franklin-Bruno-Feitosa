import { Button } from "@material-ui/core";
import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProtectedPage from "../../hooks/useProtectedPage";
import { goToTripListPage } from "../../routes/coordinator";
import CreateTripForm from "./CreateTripForm";
import { ScreenContainer } from "./styled";

function CreateTripPage() {
  useProtectedPage();
  let navigate = useNavigate();

  return (
    <ScreenContainer>
      <Typography
        marginTop={15}
        marginBottom={5}
        variant={"h4"}
        align={"center"}
        color={"white"}
      >
        Criar nova viagem
      </Typography>
      <CreateTripForm />
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

export default CreateTripPage;
