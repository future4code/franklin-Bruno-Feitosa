import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProtectedPage from "../../hooks/useProtectedPage";
import useForm from "../../hooks/useForm";
import { CircularProgress, TextField } from "@mui/material";
import { InputsContainer } from "./styled";
import { createTrip } from "../../services/admin";
import { Button } from "@material-ui/core";

const CreateTripForm = () => {
  useProtectedPage();
  const [form, onChange, clear] = useForm({
    name: "",
    planet: "",
    date: "",
    description: "",
    durationInDays: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const onSubmitForm = (e) => {
    e.preventDefault();
    createTrip(form, clear, navigate, setIsLoading);
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
            name={"planet"}
            value={form.planet}
            onChange={onChange}
            label={"Planeta"}
            variant={"outlined"}
            fullWidth
            margin="normal"
            required
            type={"text"}
          />
          <TextField
            InputProps={{
              style: { color: "#a89a3b" },
            }}
            name={"date"}
            value={form.date}
            onChange={onChange}
            variant={"outlined"}
            fullWidth
            margin="normal"
            required
            type={"date"}
          />
          <TextField
            InputLabelProps={{
              style: { color: "#a89a3b" },
            }}
            InputProps={{
              style: { color: "#a89a3b" },
            }}
            name={"description"}
            value={form.description}
            onChange={onChange}
            label={"Descrição"}
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
              style: { marginBottom: 18, color: "#a89a3b" },
            }}
            name={"durationInDays"}
            value={form.durationInDays}
            onChange={onChange}
            label={"Duração em dias"}
            variant={"outlined"}
            fullWidth
            margin="normal"
            required
            type={"number"}
          />

          <Button type="submit" fullWidth color="primary" variant="contained">
            {isLoading ? (
              <CircularProgress color={"inherit"} size={24} />
            ) : (
              <>Criar viagem</>
            )}
          </Button>
        </form>
      </InputsContainer>
    </div>
  );
};

export default CreateTripForm;
