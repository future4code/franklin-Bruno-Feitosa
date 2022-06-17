import React, { useState, useEffect } from "react";

function TelaDeLista(props) {
  return (
    <div>
      {props.mostraUserState.map((user, index) => {
        return <p key={index}>{user.name}</p>;
      })}
    </div>
  );
}

export default TelaDeLista;
