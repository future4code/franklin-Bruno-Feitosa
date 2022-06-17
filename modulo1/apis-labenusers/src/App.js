import axios from "axios";
import { useEffect, useState } from "react";
import TelaDeCadastro from "./components/TelaDeCadastro/TelaDeCadastro";
import TelaDeLista from "./components/TelaDeLista/TelaDeLista";

function App() {
  const [mostraUserState, setMostraUserState] = useState([]);
  const [criaUserNameState, setCriaUserNameState] = useState("");
  const [criaUserEmailState, setCriaUserEmailState] = useState("");

  const handleCriaUserName = (e) => {
    setCriaUserNameState(e.target.value);
  };
  const handleCriaUserEmail = (e) => {
    setCriaUserEmailState(e.target.value);
  };
  const getAllUsers = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users",
        {
          headers: {
            Authorization: "bruno-feitosa-franklin",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setMostraUserState(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(getAllUsers, []);

  const createUser = () => {
    const body = {
      name: criaUserNameState,
      email: criaUserEmailState,
    };
    axios
      .post(
        "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users",
        body,
        {
          headers: {
            Authorization: "bruno-feitosa-franklin",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert("Usuário criado com sucesso!");
        setCriaUserNameState("");
        setCriaUserEmailState("");
        getAllUsers();
      })
      .catch((error) => {
        console.log(error);
        alert("Houve um erro ao adicionar o novo usuário!");
      });
  };

  return (
    <div>
      <TelaDeCadastro
        handleCriaUserName={handleCriaUserName}
        handleCriaUserEmail={handleCriaUserEmail}
        criaUserNameState={criaUserNameState}
        criaUserEmailState={criaUserEmailState}
        createUser={createUser}
      />

      <TelaDeLista mostraUserState={mostraUserState} />
    </div>
  );
}

export default App;
