import axios from "axios";
import { BASE_URL } from "../constants/urls";
import { goToRecipesList } from "../routes/coordinator";

export const login = (
  body,
  clear,
  navigate,
  setRightButtonText,
  setIsLoading
) => {
  setIsLoading(true);
  axios
    .post(`${BASE_URL}/user/login`, body)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      clear();
      setIsLoading(false);
      goToRecipesList(navigate);
      setRightButtonText("Logout");
    })
    .catch((error) => {
      alert(error.response.data.message);
      setIsLoading(false);
    });
};

export const signUp = (
  body,
  clear,
  navigate,
  setRightButtonText,
  setIsLoading
) => {
  setIsLoading(true);
  axios
    .post(`${BASE_URL}/user/signup`, body)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      clear();
      setIsLoading(false);
      goToRecipesList(navigate);
      setRightButtonText("Logout");
    })
    .catch((error) => {
      alert(error.response.data.message);
      setIsLoading(false);
    });
};
