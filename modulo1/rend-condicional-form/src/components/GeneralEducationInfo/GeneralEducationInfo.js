import React from "react";
import styled from "styled-components";

const GeneralEducationInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const GeneralEducationInfoH1 = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 25px;
`;

const HigherEducationInfoLabel = styled.label`
  font-weight: 600;
`;

const GeneralEducationInfoInput = styled.input`
  margin: 15px 0;
  padding: 2px 10px;
`;

const GeneralEducationInfoSelect = styled.select`
  margin: 15px 0;
  padding: 5px;
`;

function GeneralEducationInfo() {
  return (
    <GeneralEducationInfoDiv>
      <GeneralEducationInfoH1>
        ETAPA 3 - INFORMAÇÕES GERAIS DE ENSINO
      </GeneralEducationInfoH1>
      <HigherEducationInfoLabel for="name">
        5. Por que você não terminou um curso de graduação?
      </HigherEducationInfoLabel>
      <GeneralEducationInfoInput name="name" type="text" />
      <HigherEducationInfoLabel for="complementary-course">
        6. Você fez algum curso complementar?
      </HigherEducationInfoLabel>
      <GeneralEducationInfoSelect name="complementary-course">
        <option value="none">Nenhum</option>
        <option value="technical-course">Curso técnico</option>
        <option value="english-course">Curso de inglês</option>
      </GeneralEducationInfoSelect>
    </GeneralEducationInfoDiv>
  );
}

export default GeneralEducationInfo;
