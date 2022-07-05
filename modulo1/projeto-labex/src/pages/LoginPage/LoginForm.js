import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToHomePage } from "../../routes/coordinator";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import { loginUser } from "../../services/user";
import useForm from "../../hooks/useForm";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import { InputsContainer, LockStyled, AccountCircleStyled } from "./styled";
import { Button } from "@material-ui/core";

const LoginForm = (props) => {
  useUnprotectedPage();
  const [form, onChange, clear] = useForm({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { setRightButtonText } = props;
  let navigate = useNavigate();

  const onSubmitForm = (e) => {
    e.preventDefault();
    loginUser(form, clear, navigate, setIsLoading, setRightButtonText);
  };

  return (
    <div>
      <InputsContainer>
        <form onSubmit={onSubmitForm}>
          <TextField
            InputLabelProps={{
              style: { color: "#a89a3b" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleStyled />
                </InputAdornment>
              ),
              style: { color: "#a89a3b" },
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
            InputLabelProps={{
              style: { color: "#a89a3b" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockStyled />
                </InputAdornment>
              ),
              style: { marginBottom: 18, color: "#a89a3b" },
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
