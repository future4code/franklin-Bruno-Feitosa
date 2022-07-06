import React from "react";
import { ScreenContainer, LogoImage, SignUpButtonContainer } from "./styled";
import logo from "../../assets/logo.png";
import { Button } from "@material-ui/core";
import LoginForm from "./LoginForm";
import { goToSignUp } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";

const LoginPage = (props) => {
  const { setRightButtonText } = props;
  const navigate = useNavigate();
  useUnprotectedPage();
  return (
    <ScreenContainer>
      <LogoImage src={logo} />
      <LoginForm setRightButtonText={setRightButtonText} />
      <SignUpButtonContainer>
        <Button
          onClick={() => {
            goToSignUp(navigate);
          }}
          fullWidth
          variant="text"
          color="primary"
        >
          Não possui conta? Cadastre-se
        </Button>
      </SignUpButtonContainer>
    </ScreenContainer>
  );
};

export default LoginPage;
