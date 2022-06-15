import React from "react";
import styled from "styled-components";
import OpenQuestion from "../OpenQuestion/OpenQuestion";

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

function HigherEducationInfo(props) {
  return (
    <HigherEducationInfoDiv>
      <HigherEducationInfoH1>
        INFORMAÇÕES DO ENSINO SUPERIOR
      </HigherEducationInfoH1>
      <OpenQuestion
        pergunta={"5. Qual curso?"}
        input={props.inputWhichCourse}
        handleInput={props.handleInputWhichCourse}
      />
      <OpenQuestion
        pergunta={"6. Qual a unidade de ensino?"}
        input={props.inputUniversity}
        handleInput={props.handleInputUniversity}
      />
    </HigherEducationInfoDiv>
  );
}

export default HigherEducationInfo;
