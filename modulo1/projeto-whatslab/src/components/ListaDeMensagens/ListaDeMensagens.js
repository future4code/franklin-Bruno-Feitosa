import React from "react";
import "./ListaDeMensagens.css";
import styled from "styled-components";
import AreaDeEnvio from "../AreaDeEnvio/AreaDeEnvio";

function ListaDeMensagens(props) {
  const ListaBalaoMensagem = styled.li`
    /* background-color: ${(props) => {
      if (props.tipo === "eu") {
        console.log(props.tipo);
        return "#DDF7C8"; // Verde copiado do WhatsApp
      } else if (props.tipo === "outro") {
        return "#ffffff"; // Branco
      }
    }}; */

    /* background-color: #ddf7c8; */
    padding: 0.9em 0.8em;
    border-radius: 0.5em;
    font-weight: 450;
    line-height: 1.3;
    max-width: 60%;
    min-width: 8%;
    margin-bottom: 1em;
  `;

  return (
    <div>
      <ul className="message-list">
        <ListaBalaoMensagem>{`${props.nome}: ${props.mensagem}`}</ListaBalaoMensagem>
      </ul>
    </div>
  );
}

export default ListaDeMensagens;
