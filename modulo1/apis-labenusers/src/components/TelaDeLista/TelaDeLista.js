import React from "react";
import styled from "styled-components";
import deleteButton from "../../img/delete-button.png";

const TelaDeListaDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ListaDiv = styled.div`
  display: flex;
  align-items: center;
`;

const AppLabenuH2 = styled.h2`
  margin-top: 1.375rem;
  font-size: 1.5rem;
  letter-spacing: 3px;
  font-weight: 500;
  margin-bottom: 2.5rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const ListaP = styled.p`
  margin-left: 1rem;
`;

const TelaDeListaButtonImg = styled.img`
  cursor: pointer;
`;

const ReturnButton = styled.button`
  margin: 2rem 0;
  padding: 10px;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid #202020;
  border-radius: 5px;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
`;

function TelaDeLista(props) {
  const returnButton = () => {
    if (props.page === 2) {
      return <ReturnButton onClick={returnClick}>Voltar</ReturnButton>;
    }
  };

  const returnClick = () => {
    props.setPage(1);
  };

  return (
    <TelaDeListaDiv>
      <AppLabenuH2>{props.titulo}</AppLabenuH2>
      {props.listaUserState.map((user) => {
        return (
          <ListaDiv key={user.id}>
            <TelaDeListaButtonImg
              src={deleteButton}
              onClick={() => {
                if (window.confirm("Deseja apagar o usuário selecionado?")) {
                  props.deleteUser(user.id);
                }
              }}
            />
            <ListaP>{user.name}</ListaP>
          </ListaDiv>
        );
      })}
      {returnButton()}
    </TelaDeListaDiv>
  );
}

export default TelaDeLista;
