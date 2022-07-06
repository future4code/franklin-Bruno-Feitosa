import React, { useState } from "react";
import { InputsContainer } from "./styled";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import useForm from "../../hooks/useForm";
import { SignUpFormContainer } from "../SignUpPage/styled";
import { signUp } from "../../services/user";
import { useNavigate } from "react-router-dom";

const SignUpForm = (props) => {
  const [form, onChange, clear] = useForm({
    name: "",
    email: "",
    password: "",
  });
  const { setRightButtonText } = props;
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmitForm = (e) => {
    signUp(form, clear, navigate, setRightButtonText, setIsLoading);
    e.preventDefault();
  };

  return (
    <SignUpFormContainer>
      <InputsContainer>
        <form onSubmit={onSubmitForm}>
          <TextField
            name={"name"}
            value={form.name}
            onChange={onChange}
            label={"Nome"}
            variant={"outlined"}
            fullWidth
            margin="normal"
            required
            autoFocus
          />
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
              <>Fazer Cadastro</>
            )}
          </Button>
        </form>
      </InputsContainer>
    </SignUpFormContainer>
  );
};

export default SignUpForm;
