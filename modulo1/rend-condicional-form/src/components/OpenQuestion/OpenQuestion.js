import React from "react";
import styled from "styled-components";

const OpenQuestionLabel = styled.label`
  font-weight: 600;
`;

const OpenQuestionInput = styled.input`
  margin: 15px 0;
  padding: 2px 10px;
`;

function OpenQuestion(props) {
  return (
    <>
      <OpenQuestionLabel htmlFor="name">{props.pergunta}</OpenQuestionLabel>
      <OpenQuestionInput
        value={props.input}
        onChange={props.handleInput}
        name="name"
        type="text"
      />
    </>
  );
}

export default OpenQuestion;
