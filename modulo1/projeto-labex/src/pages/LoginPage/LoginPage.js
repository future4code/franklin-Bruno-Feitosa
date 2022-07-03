import React from "react";
import { ScreenContainer, LogoImage, GoToHomePageButtonDiv } from "./styled";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import { goToHomePage } from "../../routes/coordinator";
import { Button } from "@mui/material";
import logo from "../../assets/logo.png";

const LoginPage = (props) => {
  const { setRightButtonText } = props;
  const navigate = useNavigate();
  useUnprotectedPage();
  return (
    <ScreenContainer>
      <LogoImage src={logo} />
      <LoginForm setRightButtonText={setRightButtonText} />
      <GoToHomePageButtonDiv>
        <Button
          fullWidth
          variant="text"
          color="primary"
          onClick={() => {
            goToHomePage(navigate);
          }}
        >
          Voltar para a página inicial
        </Button>
      </GoToHomePageButtonDiv>
    </ScreenContainer>
  );
};

export default LoginPage;
