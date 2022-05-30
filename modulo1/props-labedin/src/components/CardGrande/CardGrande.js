import React from "react";
// import "./CardGrande.css";
import styled from "styled-components";

const BigCardContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  padding: 20px 10px;
  margin-bottom: 10px;
  height: 200px;
`;

const BigCardContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
`;

const BigCardContainerImage = styled.img`
  width: 100px;
  margin-right: 20px;
  margin-left: 10px;
  border-radius: 50%;
`;

const BigCardContainerH4 = styled.h4`
  margin-bottom: 15px;
`;

function CardGrande(props) {
  return (
    <BigCardContainer>
      <BigCardContainerImage src={props.imagem}></BigCardContainerImage>
      <BigCardContainerDiv>
        <BigCardContainerH4>{props.nome}</BigCardContainerH4>
        <p>{props.descricao}</p>
      </BigCardContainerDiv>
    </BigCardContainer>
  );
}

export default CardGrande;
