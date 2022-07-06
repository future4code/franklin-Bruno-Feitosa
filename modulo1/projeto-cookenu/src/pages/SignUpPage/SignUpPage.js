import React from "react";
import logo from "../../assets/logo.png";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import { ScreenContainer, LogoImage } from "../LoginPage/styled";
import SignUpForm from "./SignUpForm";

const SignUpPage = (props) => {
  const { setRightButtonText } = props;
  useUnprotectedPage();

  return (
    <ScreenContainer>
      <LogoImage src={logo} />
      <SignUpForm setRightButtonText={setRightButtonText} />
    </ScreenContainer>
  );
};

export default SignUpPage;
