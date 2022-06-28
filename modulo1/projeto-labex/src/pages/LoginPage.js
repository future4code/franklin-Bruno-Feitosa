import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToHomePage } from "../routes/coordinator";
import axios from "axios";

export const LoginPage = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [token, setToken] = useState("");

  const handlerInputEmail = (e) => {
    setInputEmail(e.target.value);
  };

  const handlerInputPassword = (e) => {
    setInputPassword(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token === null) {
      console.log("Não está logado");
      navigate("/login");
    } else {
      console.log("está logado");
      navigate("/admin");
    }
  }, []);

  const loginUser = () => {
    const body = { email: inputEmail, password: inputPassword };
    axios
      .post(
        "https://us-central1-labenu-apis.cloudfunctions.net/labeX/:aluno/login",
        body,
        {
          headers: {
            Authorization: "bruno-feitosa-franklin",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        console.log(token);
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error.message);
        alert("Dados não encontrados");
      });
  };

  let navigate = useNavigate();

  return (
    <div>
      <h1>LoginPage</h1>
      <input type="text" onChange={handlerInputEmail}></input>
      <input type="text" onChange={handlerInputPassword}></input>
      <button onClick={loginUser}>Login</button>
      <button
        onClick={() => {
          goToHomePage(navigate);
        }}
      >
        Voltar
      </button>
    </div>
  );
};
