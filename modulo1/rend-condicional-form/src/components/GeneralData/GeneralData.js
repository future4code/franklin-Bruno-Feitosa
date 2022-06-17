import React from "react";
import styled from "styled-components";
import ClosedQuestion from "../ClosedQuestion/ClosedQuestion";
import OpenQuestion from "../OpenQuestion/OpenQuestion";

const GeneralDataDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const GeneralDataH1 = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 25px;
`;

function GeneralData(props) {
  return (
    <GeneralDataDiv>
      <GeneralDataH1>DADOS GERAIS</GeneralDataH1>
      <OpenQuestion
        handleInput={props.handleInputName}
        input={props.inputName}
        pergunta={"1. Qual seu nome?"}
      />
      <OpenQuestion
        handleInput={props.handleInputAge}
        input={props.inputAge}
        pergunta={"2. Qual sua idade?"}
      />
      <OpenQuestion
        handleInput={props.handleInputEmail}
        input={props.inputEmail}
        pergunta={"3. Qual seu email?"}
      />
      <ClosedQuestion
        selectValue={props.selectValue}
        handleSelectValue={props.handleSelectValue}
        pergunta={"4. Qual a sua escolaridade?"}
        options={[
          "Ensino médio incompleto",
          "Ensino médio completo",
          "Ensino superior incompleto",
          "Ensino superior completo",
        ]}
      />
    </GeneralDataDiv>
  );
}

export default GeneralData;
