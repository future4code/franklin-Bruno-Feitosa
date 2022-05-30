import React, { useState } from "react";
import styled from "styled-components";
import "./AreaDeEnvio.css";

function AreaDeEnvio(props) {
  const [inputUsername, setInputUsername] = useState("");
  const [username, setUsername] = useState("");

  const [inputMessage, setInputMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleUsernameInput = (e) => {
    setInputUsername(e.target.value);
  };

  const handleMessageInput = (e) => {
    setInputMessage(e.target.value);
  };

  const submit = () => {
    setUsername(inputUsername);
    setMessage(inputMessage);
    // props.username = username;
  };

  return (
    <div>
      <p>
        <strong>{username}</strong>: {message}
      </p>
      <div className="sending-area">
        <input
          value={inputUsername}
          className="sending-area-username"
          onChange={handleUsernameInput}
          type="text"
          placeholder="Username"
        ></input>
        <input
          value={inputMessage}
          className="sending-area-content"
          type="text"
          placeholder="Message"
          onChange={handleMessageInput}
        ></input>
        <button onClick={submit} className="sending-area-submit">
          Enviar
        </button>
      </div>
    </div>
  );
}

export default AreaDeEnvio;
