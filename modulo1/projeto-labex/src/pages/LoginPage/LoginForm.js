import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToHomePage } from "../../routes/coordinator";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import { loginUser } from "../../services/user";
import useForm from "../../hooks/useForm";
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import { InputsContainer, LockStyled, AccountCircleStyled } from "./styled";

const LoginForm = (props) => {
  useUnprotectedPage();
  const [form, onChange, clear] = useForm({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { setRightButtonText } = props;
  let navigate = useNavigate();

  const onSubmitForm = (e) => {
    e.preventDefault();
    loginUser(form, clear, navigate, setIsLoading, setRightButtonText);
    console.log(form);
  };

  return (
    <div>
      <InputsContainer>
        <form onSubmit={onSubmitForm}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleStyled />
                </InputAdornment>
              ),
            }}
            name={"email"}
            value={form.email}
            onChange={onChange}
            label={"Email"}
            variant={"outlined"}
            fullWidth
            margin="normal"
            required
            type={"email"}
          />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockStyled />
                </InputAdornment>
              ),
            }}
            name={"password"}
            value={form.password}
            onChange={onChange}
            label={"Senha"}
            variant={"outlined"}
            fullWidth
            margin="normal"
            required
            type={"password"}
          />

          <Button type="submit" fullWidth color="primary" variant="contained">
            {isLoading ? (
              <CircularProgress color={"inherit"} size={24} />
            ) : (
              <>Fazer Login</>
            )}
          </Button>
        </form>
      </InputsContainer>
    </div>
  );
};

export default LoginForm;
