import React from "react";
import styled from "styled-components";

const ClosedQuestionLabel = styled.label`
  font-weight: 600;
`;

const ClosedQuestionSelect = styled.select`
  margin: 15px 0;
  padding: 5px;
`;

function ClosedQuestion(props) {
  return (
    <>
      <ClosedQuestionLabel htmlFor="education-level">
        {props.pergunta}
      </ClosedQuestionLabel>
      <ClosedQuestionSelect
        value={props.selectValue}
        onChange={props.handleSelectValue}
        name="education-level"
      >
        {props.options.map((option, index) => {
          return (
            <option value={option} key={index}>
              {option}
            </option>
          );
        })}
      </ClosedQuestionSelect>
    </>
  );
}

export default ClosedQuestion;
