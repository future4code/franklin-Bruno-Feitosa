import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { goToLoginPage, goToTripListPage } from "../../routes/coordinator";
import { ButtonContainerDiv, HomePageContainer, LogoImage } from "./styled";
import logo from "../../assets/logo.png";
import { Button } from "@material-ui/core";

function HomePage() {
  let navigate = useNavigate();

  return (
    <HomePageContainer>
      <LogoImage src={logo} />
      <ButtonContainerDiv>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={() => {
            goToLoginPage(navigate);
          }}
        >
          <Typography
            variant="h6"
            fontSize={17}
            color={"white"}
            align={"center"}
            minWidth={250}
          >
            Login
          </Typography>
        </Button>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={() => {
            goToTripListPage(navigate);
          }}
        >
          <Typography
            variant="h6"
            fontSize={17}
            color={"white"}
            align={"center"}
            minWidth={250}
          >
            Lista de Viagens
          </Typography>
        </Button>
      </ButtonContainerDiv>
    </HomePageContainer>
  );
}

export default HomePage;
