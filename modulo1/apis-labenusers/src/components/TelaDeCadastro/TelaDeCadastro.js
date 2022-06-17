import React from "react";

function TelaDeCadastro(props) {
  return (
    <div>
      <input
        value={props.criaUserNameState}
        onChange={props.handleCriaUserName}
        placeholder="Name"
      ></input>
      <input
        value={props.criaUserEmailState}
        onChange={props.handleCriaUserEmail}
        placeholder="Email"
      ></input>
      <button onClick={props.createUser}>Adicionar</button>
    </div>
  );
}

export default TelaDeCadastro;
