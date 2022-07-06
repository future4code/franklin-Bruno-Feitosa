import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Button from "@mui/material/Button";
import { StyledToolbar } from "./styled";
import { goToRecipesList, goToLogin } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { rightButtonText, setRightButtonText } = props;

  const logout = () => {
    localStorage.removeItem("token");
  };

  const rightButtonAction = () => {
    if (token) {
      logout();
      setRightButtonText("Login");
      goToLogin(navigate);
    } else {
      goToLogin(navigate);
    }
  };

  return (
    <AppBar position="static">
      <StyledToolbar>
        <Button
          onClick={() => {
            token ? goToRecipesList(navigate) : goToLogin(navigate);
          }}
          color="inherit"
        >
          Cookenu
        </Button>
        <Button onClick={rightButtonAction} color="inherit">
          {rightButtonText}
        </Button>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
