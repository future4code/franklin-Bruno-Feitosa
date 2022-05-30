import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import AreaDeEnvio from "./components/AreaDeEnvio/AreaDeEnvio";
import ListaDeMensagens from "./components/ListaDeMensagens/ListaDeMensagens";
import BalaoDeConversa from "./components/BalaoDeConversa/BalaoDeConversa";

function App() {
  let nome = "Bruno";
  return (
    <div className="container">
      {/* <BalaoDeConversa nome="eu" conteudo="conteudo" /> */}
      <ListaDeMensagens
        tipo="eu"
        nome="Bruno"
        mensagem={`Oii, eu sou o ${nome}!`}
      />
      <AreaDeEnvio />
    </div>
  );
}

export default App;
