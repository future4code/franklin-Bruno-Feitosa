import axios from "axios";
import { BASE_URL } from "../constants/urls";
import { goToAdminPage, goToHomePage } from "../routes/coordinator";

export const loginUser = (
  body,
  clear,
  navigate,
  setIsLoading,
  setRightButtonText
) => {
  setIsLoading(true);
  axios
    .post(`${BASE_URL}/login`, body, {
      headers: {
        Authorization: "bruno-feitosa-franklin",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      clear();
      setIsLoading(false);
      goToAdminPage(navigate);
      setRightButtonText("Logout");
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
      alert("Dados não encontrados");
    });
};

export const applyToTrip = (body, clear, navigate, setIsLoading, id) => {
  setIsLoading(true);
  axios
    .post(`${BASE_URL}/trips/${id}/apply`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      alert("Aplicação feita com sucesso");
      clear();
      setIsLoading(false);
      goToHomePage(navigate);
    })
    .catch((error) => {
      console.log(error.response.data.message);
      setIsLoading(false);
      alert("Dados não encontrados");
    });
};
