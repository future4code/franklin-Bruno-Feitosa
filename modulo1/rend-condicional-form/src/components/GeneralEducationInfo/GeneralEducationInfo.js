import React from "react";
import styled from "styled-components";
import ClosedQuestion from "../ClosedQuestion/ClosedQuestion";
import OpenQuestion from "../OpenQuestion/OpenQuestion";

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

//6. Você fez algum curso complementar?
function GeneralEducationInfo(props) {
  return (
    <GeneralEducationInfoDiv>
      <GeneralEducationInfoH1>
        INFORMAÇÕES GERAIS DE ENSINO
      </GeneralEducationInfoH1>
      <OpenQuestion
        pergunta={"5. Por que você não terminou um curso de graduação?"}
        input={props.inputIncompleteGraduation}
        handleInput={props.handleInputIncompleteGraduation}
      />
      <ClosedQuestion
        selectValue={props.selectValue}
        handleSelectValue={props.handleSelectValue}
        pergunta={"6. Você fez algum curso complementar?"}
        options={["Nenhum", "Curso técnico", "Curso de inglês"]}
      />
    </GeneralEducationInfoDiv>
  );
}

export default GeneralEducationInfo;
