import React from "react";
import styled from "styled-components";

const EndScreenH1 = styled.h1`
  text-align: center;
`;

const EndScreenH2 = styled.h2``;

function EndScreen() {
  return (
    <div>
      <EndScreenH1>O FORMULÁRIO ACABOU</EndScreenH1>
      <EndScreenH2>Obrigado por participar! Entraremos em contato!</EndScreenH2>
    </div>
  );
}

export default EndScreen;
