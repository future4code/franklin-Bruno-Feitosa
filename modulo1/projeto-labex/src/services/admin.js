import axios from "axios";
import { BASE_URL } from "../constants/urls";
import { goToTripListPage } from "../routes/coordinator";

export const createTrip = (body, clear, navigate, setIsLoading) => {
  setIsLoading(true);
  axios
    .post(`${BASE_URL}/trips`, body, {
      headers: {
        auth: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      alert("Viagem cadastrada com sucesso");
      clear();
      setIsLoading(false);
      goToTripListPage(navigate);
    })
    .catch((error) => {
      console.log(error.response.data.message);
      setIsLoading(false);
      alert("Dados não encontrados");
    });
};

export const deleteTrip = (navigate, setIsLoading, id) => {
  setIsLoading(true);
  axios
    .delete(`${BASE_URL}/trips/${id}`, {
      headers: {
        auth: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      alert("Viagem deletada com sucesso");
      setIsLoading(false);
      goToTripListPage(navigate);
    })
    .catch((error) => {
      console.log(error.response.data.message);
      setIsLoading(false);
      alert("Ocorreu um erro ao deletar a viagem");
    });
};

export const tripDetails = (navigate, setIsLoading, id) => {
  setIsLoading(true);
  axios
    .get(`${BASE_URL}/trip/${id}`, {
      headers: {
        auth: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setIsLoading(false);
      goToTripListPage(navigate);
    })
    .catch((error) => {
      console.log(error.response.data.message);
      setIsLoading(false);
    });
};

export const decideCandidate = (
  navigate,
  setIsLoading,
  tripId,
  candidateId,
  type
) => {
  setIsLoading(true);
  const body = { approve: true };

  const bodyCheck =
    type === "approve" ? (body.approve = true) : (body.approve = false);
  axios
    .put(`${BASE_URL}/trips/${tripId}/candidates/${candidateId}/decide`, body, {
      headers: {
        auth: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      bodyCheck
        ? alert("O candidato foi aprovado")
        : alert("O candidato não foi aprovado");
      setIsLoading(false);
      goToTripListPage(navigate);
    })
    .catch((error) => {
      console.log(error.response.data.message);
      setIsLoading(false);
    });
};
