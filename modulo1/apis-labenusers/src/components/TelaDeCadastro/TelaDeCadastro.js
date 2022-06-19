import React from "react";
import styled from "styled-components";

const TelaDeCadastroDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AppLabenuH2 = styled.h2`
  font-size: 1.5rem;
  letter-spacing: 3px;
  font-weight: 500;
  margin-bottom: 2.5rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const TelaDeCadastroInput = styled.input`
  border: 1px solid #202020;
  border-radius: 5px;
  padding: 0.75rem 10rem;
  padding-left: 20px;
  text-align: start;
  margin-bottom: 1rem;
  font-family: Arial, Helvetica, sans-serif;
`;

const TelaDeCadastroBotaoDiv = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 2rem;
`;
const TelaDeCadastroBotao = styled.button`
  padding: 10px;
  margin: 0.5rem 0.5rem;
  border: 1px solid #202020;
  border-radius: 5px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.875rem;
  cursor: pointer;
`;

function TelaDeCadastro(props) {
  const renderLista = () => {
    props.setPage(2);
  };

  return (
    <TelaDeCadastroDiv>
      <AppLabenuH2>{props.titulo}</AppLabenuH2>
      <TelaDeCadastroInput
        value={props.criaUserNameState}
        onChange={props.handleCriaUserName}
        placeholder="Name"
      ></TelaDeCadastroInput>
      <TelaDeCadastroInput
        value={props.criaUserEmailState}
        onChange={props.handleCriaUserEmail}
        placeholder="Email"
      ></TelaDeCadastroInput>
      <TelaDeCadastroBotaoDiv>
        <TelaDeCadastroBotao onClick={props.createUser}>
          Adicionar
        </TelaDeCadastroBotao>
        <TelaDeCadastroBotao onClick={renderLista}>
          Mostrar Lista
        </TelaDeCadastroBotao>
      </TelaDeCadastroBotaoDiv>
    </TelaDeCadastroDiv>
  );
}

export default TelaDeCadastro;
