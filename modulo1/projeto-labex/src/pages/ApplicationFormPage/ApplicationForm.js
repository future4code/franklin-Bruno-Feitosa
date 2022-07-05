import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import useForm from "../../hooks/useForm";
import { CircularProgress, TextField } from "@mui/material";
import { InputsContainer } from "./styled";
import { applyToTrip } from "../../services/user";
import { Button } from "@material-ui/core";

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
            InputLabelProps={{
              style: { color: "#a89a3b" },
            }}
            InputProps={{
              style: { color: "#a89a3b" },
            }}
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
            InputLabelProps={{
              style: { color: "#a89a3b" },
            }}
            InputProps={{
              style: { color: "#a89a3b" },
            }}
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
            InputLabelProps={{
              style: { color: "#a89a3b" },
            }}
            InputProps={{
              style: { color: "#a89a3b" },
            }}
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
            InputLabelProps={{
              style: { color: "#a89a3b" },
            }}
            InputProps={{
              style: { color: "#a89a3b" },
            }}
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
            InputLabelProps={{
              style: { color: "#a89a3b" },
            }}
            InputProps={{
              style: { color: "#a89a3b", marginBottom: 18 },
            }}
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
