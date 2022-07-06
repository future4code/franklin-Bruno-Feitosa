import React, { useState } from "react";
import { InputsContainer } from "./styled";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import useForm from "../../hooks/useForm";
import { login } from "../../services/user";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const [form, onChange, clear] = useForm({ email: "", password: "" });
  const { setRightButtonText } = props;
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmitForm = (e) => {
    e.preventDefault();
    login(form, clear, navigate, setRightButtonText, setIsLoading);
  };

  return (
    <InputsContainer>
      <form onSubmit={onSubmitForm}>
        <TextField
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
  );
};

export default LoginForm;
