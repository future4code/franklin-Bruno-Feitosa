import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { goToLoginPage, goToTripListPage } from "../../routes/coordinator";
import {
  ButtonContainerDiv,
  HomePageContainer,
  TypographyGlow,
} from "./styled";

function HomePage() {
  let navigate = useNavigate();

  return (
    <HomePageContainer>
      <TypographyGlow
        marginTop={20}
        marginBottom={15}
        variant="h3"
        fontFamily={"Volkorn"}
        color={"#dcdcdc"}
        align={"center"}
      >
        LabeX
      </TypographyGlow>
      <ButtonContainerDiv>
        <Button
          onClick={() => {
            goToLoginPage(navigate);
          }}
        >
          <Typography
            padding={1.5}
            variant="h6"
            fontSize={17}
            color={"#a89a3b"}
            align={"center"}
            boxShadow={"0 0 10px 1px #a89a3b"}
            minWidth={250}
            borderRadius={15}
          >
            Login
          </Typography>
        </Button>
        <Button
          onClick={() => {
            goToTripListPage(navigate);
          }}
        >
          <Typography
            padding={1.5}
            variant="h6"
            fontSize={18}
            color={"#a89a3b"}
            align={"center"}
            boxShadow={"0 0 10px 1px #a89a3b"}
            minWidth={250}
            borderRadius={15}
          >
            Lista de Viagens
          </Typography>
        </Button>
      </ButtonContainerDiv>
    </HomePageContainer>
  );
}

export default HomePage;
