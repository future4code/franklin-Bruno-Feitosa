import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { goToLoginPage } from "../routes/coordinator";

export const useRequestDataAuth = (url) => {
  const [data, setData] = useState(undefined);
  const navigate = useNavigate();

  const getData = () => {
    const token = localStorage.getItem("token");
    axios
      .get(url, {
        headers: {
          auth: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (token === null) {
          console.log("Você precisa logar para acessar essa página");
          goToLoginPage(navigate);
        } else setData(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(getData, []);
  return [data];
};
