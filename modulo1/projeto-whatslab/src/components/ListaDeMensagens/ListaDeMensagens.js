import React, { useState } from "react";
// import "./ListaDeMensagens.css";
import styled from "styled-components";
import AreaDeEnvio from "../AreaDeEnvio/AreaDeEnvio";

const ListaDeMensagensUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

function ListaDeMensagens(props) {
  return (
    <div>
      <ListaDeMensagensUl>
        {/* <ListaBalaoMensagem>{props.listandoConversa}</ListaBalaoMensagem> */}
      </ListaDeMensagensUl>
    </div>
  );
}

export default ListaDeMensagens;
