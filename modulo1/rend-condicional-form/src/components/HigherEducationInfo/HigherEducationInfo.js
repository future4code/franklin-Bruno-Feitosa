import React from "react";
import styled from "styled-components";

const HigherEducationInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const HigherEducationInfoH1 = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 25px;
`;

const HigherEducationInfoLabel = styled.label`
  font-weight: 600;
`;

const HigherEducationInfoInput = styled.input`
  margin: 15px 0;
  padding: 2px 10px;
`;

function HigherEducationInfo() {
  return (
    <HigherEducationInfoDiv>
      <HigherEducationInfoH1>
        ETAPA 2 - INFORMAÇÕES DO ENSINO SUPERIOR
      </HigherEducationInfoH1>
      <HigherEducationInfoLabel for="which-course">
        5. Qual curso?
      </HigherEducationInfoLabel>
      <HigherEducationInfoInput name="which-course" type="text" />
      <HigherEducationInfoLabel for="which-university">
        6. Qual a unidade de ensino?
      </HigherEducationInfoLabel>
      <HigherEducationInfoInput name="which-university" type="text" />
    </HigherEducationInfoDiv>
  );
}

export default HigherEducationInfo;
