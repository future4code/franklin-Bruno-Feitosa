import React from "react";
import styled from "styled-components";

const BigCardContainerPublication = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  padding: 20px 10px;
  margin-bottom: 10px;
  height: 200px;
`;

const BigCardContainerPublicationDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  margin-left: 1.5rem;
`;

const BigCardContainerPublicationH4 = styled.h4`
  margin-bottom: 15px;
`;

const BigCardContainerPublicationSpan = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
  text-align: end;
  margin-top: 10px;
`;

function Publication(props) {
  return (
    <BigCardContainerPublication>
      <BigCardContainerPublicationDiv>
        <BigCardContainerPublicationH4>
          {props.autor}
        </BigCardContainerPublicationH4>
        <p>{props.texto}</p>
        <BigCardContainerPublicationSpan>
          {props.data}
        </BigCardContainerPublicationSpan>
      </BigCardContainerPublicationDiv>
    </BigCardContainerPublication>
  );
}

export default Publication;
