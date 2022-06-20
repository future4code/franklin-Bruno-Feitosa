import axios from "axios";
import { useEffect, useState } from "react";
import TelaDeCadastro from "./components/TelaDeCadastro/TelaDeCadastro";
import TelaDeLista from "./components/TelaDeLista/TelaDeLista";
import styled from "styled-components";
import labenuIcon from "../src/img/labenu-icon.png";

const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #dfdfdf;
  height: 100vh;
  margin: 0 auto;
`;

const AppLabenuIconH1Div = styled.div`
  display: flex;
  align-items: center;
`;

const AppLabenuIcon = styled.img`
  margin-bottom: 1rem;
  width: 80px;
  height: 80px;
  margin-right: 1rem;
  position: relative;
  right: 12px;
`;

const AppLabenuH1 = styled.h1`
  font-size: 2.5rem;
  letter-spacing: 3px;
  font-weight: 500;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

function App() {
  const [page, setPage] = useState(1);
  const [listaUserState, setListaUserState] = useState([]);
  const [criaUserNameState, setCriaUserNameState] = useState("");
  const [criaUserEmailState, setCriaUserEmailState] = useState("");
  const [usuarioClicado, setUsuarioClicado] = useState("");

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
        setListaUserState(response.data);
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

  const deleteUser = (id) => {
    axios
      .delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
        {
          headers: {
            Authorization: "bruno-feitosa-franklin",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert("Usuário removido com sucesso!");
      })
      .catch((error) => {
        alert("Erro ao remover usuário!");
        console.log(error.message);
      });
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        return (
          <TelaDeCadastro
            handleCriaUserName={handleCriaUserName}
            handleCriaUserEmail={handleCriaUserEmail}
            criaUserNameState={criaUserNameState}
            criaUserEmailState={criaUserEmailState}
            createUser={createUser}
            setPage={setPage}
            titulo="Cadastro"
          />
        );
      case 2:
        return (
          <TelaDeLista
            listaUserState={listaUserState}
            page={page}
            setPage={setPage}
            deleteUser={deleteUser}
            usuarioClicado={usuarioClicado}
            setUsuarioClicado={setUsuarioClicado}
            titulo="Lista de Usuários"
          />
        );

      default:
        setPage(1);
    }
  };

  return (
    <AppDiv>
      <AppLabenuIconH1Div>
        <AppLabenuIcon src={labenuIcon} alt="Icone da Labenu" />
        <AppLabenuH1>Labenusers</AppLabenuH1>
      </AppLabenuIconH1Div>
      {renderPage()}
    </AppDiv>
  );
}

export default App;
