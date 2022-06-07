import React, { useState } from "react";
import styled from "styled-components";

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

const HigherEducationInfoLabel = styled.label`
  font-weight: 600;
`;

const GeneralDataInput = styled.input`
  margin: 15px 0;
  padding: 2px 10px;
`;

const GeneralDataSelect = styled.select`
  margin: 15px 0;
  padding: 5px;
`;

function GeneralData() {
  const [inputName, setInputName] = useState("");
  const [inputAge, setInputAge] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  // const [selectIncompleteHighSchool, setSelectIncompleteHighSchool] =
  //   useState("");
  // const [selectCompleteHighSchool, setSelectCompleteHighSchool] = useState(0);
  // const [selectIncompleteHigher, setSelectIncompleteHigher] = useState(0);
  // const [selectCompleteHigher, setSelectCompleteHigher] = useState(0);

  const handleInputName = (e) => {
    setInputName(e.target.value);
  };
  const handleInputAge = (e) => {
    setInputAge(e.target.value);
  };
  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
  };

  // const handleSelectIncompleteHighSchool = (e) => {
  //   setSelectIncompleteHighSchool(e.target.value);
  // };

  let isCompleted = false;

  const nextStep = () => {
    if (inputName !== "" && inputAge !== "" && inputEmail !== "") {
      isCompleted = true;
    } else alert("Você precisa preencher todos os dados!");
  };

  return (
    <GeneralDataDiv>
      <GeneralDataH1>Etapa 1 - Dados Gerais</GeneralDataH1>
      <HigherEducationInfoLabel for="name">
        1. Qual seu nome?
      </HigherEducationInfoLabel>
      <GeneralDataInput
        value={inputName}
        onChange={handleInputName}
        name="name"
        type="text"
      />
      <HigherEducationInfoLabel for="age">
        2. Qual sua idade?
      </HigherEducationInfoLabel>
      <GeneralDataInput
        value={inputAge}
        onChange={handleInputAge}
        name="age"
        type="text"
      />
      <HigherEducationInfoLabel for="email">
        3. Qual seu email?
      </HigherEducationInfoLabel>
      <GeneralDataInput
        value={inputEmail}
        onChange={handleInputEmail}
        name="email"
        type="text"
      />
      <HigherEducationInfoLabel for="education-level">
        4. Qual sua escolaridade?
      </HigherEducationInfoLabel>
      <GeneralDataSelect name="education-level">
        <option
        // value={selectIncompleteHighSchool}
        // onChange={handleSelectIncompleteHighSchool}
        >
          Ensino médio incompleto
        </option>
        <option value="complete-high-school">Ensino médio completo</option>
        <option value="incomplete-higher-education">
          Ensino superior incompleto
        </option>
        <option value="complete-higher-education">
          Ensino superior completo
        </option>
      </GeneralDataSelect>
    </GeneralDataDiv>
  );
}

export default GeneralData;
