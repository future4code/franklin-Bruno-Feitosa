import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import useForm from "../../hooks/useForm";
import { Button, CircularProgress, TextField } from "@mui/material";
import { InputsContainer } from "./styled";
import { applyToTrip } from "../../services/user";

const ApplicationForm = () => {
  useUnprotectedPage();
  const [form, onChange, clear] = useForm({
    name: "",
    age: "",
    applicationText: "",
    profession: "",
    country: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const onSubmitForm = (e) => {
    e.preventDefault();
    applyToTrip(
      form,
      clear,
      navigate,
      setIsLoading,
      localStorage.getItem("tripId")
    );
    console.log(form);
  };

  return (
    <div>
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
            type={"text"}
          />
          <TextField
            name={"age"}
            value={form.age}
            onChange={onChange}
            label={"Idade"}
            variant={"outlined"}
            fullWidth
            margin="normal"
            required
            type={"text"}
          />
          <TextField
            name={"applicationText"}
            value={form.applicationText}
            onChange={onChange}
            label={"Texto de candidatura"}
            variant={"outlined"}
            fullWidth
            margin="normal"
            required
            type={"text"}
          />
          <TextField
            name={"profession"}
            value={form.profession}
            onChange={onChange}
            label={"Profissão"}
            variant={"outlined"}
            fullWidth
            margin="normal"
            required
            type={"text"}
          />

          <TextField
            name={"country"}
            value={form.country}
            onChange={onChange}
            label={"País"}
            variant={"outlined"}
            fullWidth
            margin="normal"
            required
            type={"text"}
          />

          <Button type="submit" fullWidth color="primary" variant="contained">
            {isLoading ? (
              <CircularProgress color={"inherit"} size={24} />
            ) : (
              <>Enviar Formulário</>
            )}
          </Button>
        </form>
      </InputsContainer>
    </div>
  );
};

export default ApplicationForm;
