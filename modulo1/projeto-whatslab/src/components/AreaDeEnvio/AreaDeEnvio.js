import React, { useState } from "react";
import styled from "styled-components";
import doublecheck from "../../img/doublecheck.svg";

const ContainerAreaDeEnvio = styled.div`
  display: flex;
  flex-direction: column;
`;

const AreaDeEnvioDiv = styled.div`
  display: flex;
  height: auto;
  width: auto;
  min-width: 30vw;
  background-color: #a8b9c5;
  padding: 10px;
`;

const AreaDeEnvioInputUser = styled.input`
  width: 5vw;
  height: auto;
  padding: 15px 1rem;
  margin-right: 15px;
  border-radius: 10px;
  border: none;
  font-size: 0.875rem;
`;

const AreaDeEnvioInputMessage = styled.input`
  width: 90vw;
  height: auto;
  padding: 5px 1rem;
  margin-right: 15px;
  border-radius: 10px;
  border: none;
  font-size: 0.875rem;
`;

const AreaDeEnvioButton = styled.button`
  padding: 5px 10px;
  width: 5vw;
  border-radius: 10px;
  border: none;
  background-color: #fff;
  transition: 0.5s;
  &:hover {
    background-color: #dcdcdc;
  }
  font-size: 0.875rem;
`;

const BalaoMensagemUsernameDiv = styled.div`
  color: #9aac8c;
  font-size: 0.8em;
  font-weight: 600;
  margin-bottom: 0.2em;
`;

const Doublecheck = styled.img`
  position: absolute;
  height: 0.5em;
  right: 4px;
  bottom: 4px;
`;

const BalaoMensagem = styled.div`
  align-self: ${(props) => {
    if (props.tipo === "eu") {
      return "flex-end";
    } else {
      return "flex-start";
    }
  }};
  background-color: ${(props) => {
    if (props.tipo === "eu") {
      return "#DDF7C8"; // Verde copiado do WhatsApp
    } else if (props.tipo === "outro") {
      return "#ffffff"; // Branco
    }
  }};
  margin-right: ${(props) => {
    if (props.tipo === "eu") {
      return "1.5em";
    }
  }};

  margin-left: ${(props) => {
    if (props.tipo !== "eu") {
      return "1.5em";
    }
  }};
  padding: 0.9em 0.8em;
  border-radius: 0.5em;
  font-weight: 450;
  line-height: 1.3;
  max-width: 60%;
  min-width: 8%;
  margin-bottom: 1em;
  word-wrap: break-word;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.2);
  position: relative;
  &:after {
    content: "";
    border: 15px solid transparent;
    border-top-color: ${(props) => {
      if (props.tipo === "eu") {
        return "#DDF7C8";
      } else if (props.tipo === "outro") {
        return "#ffffff";
      }
    }};

    position: absolute;
    top: 0px;
    right: ${(props) => {
      if (props.tipo === "eu") {
        return "-8px";
      }
    }};
    left: ${(props) => {
      if (props.tipo === "outro") {
        return "-8px";
      }
    }};
  }
`;

function AreaDeEnvio(props) {
  const [inputUsername, setInputUsername] = useState("");
  const [username, setUsername] = useState("");

  const [inputMessage, setInputMessage] = useState("");
  const [message, setMessage] = useState("");

  const [state, setState] = useState({
    conversas: [{ nome: "", mensagem: "" }],
  });

  const adicionandoMensagem = () => {
    const novaConversa = {
      nome: inputUsername,
      mensagem: inputMessage,
    };
    const novaListaDeConversas = [...state.conversas, novaConversa];
    const novoEstado = { conversas: novaListaDeConversas };
    setState(novoEstado);
    setInputUsername("");
    setInputMessage("");
  };

  // const apagandoMensagem = () => {
  //   const arrayMensagens = [...state.conversas.mensagem];
  //   arrayMensagens.findIndex((i) => {

  //   })
  // }

  const listandoConversa = state.conversas.map((conversa, index) => {
    if (conversa.nome === "eu" && conversa.mensagem !== "") {
      return (
        <BalaoMensagem tipo={"eu"} key={index}>
          <div>{conversa.mensagem}</div>
          <Doublecheck src={doublecheck} />
        </BalaoMensagem>
      );
    } else if (conversa.nome !== "" && conversa.mensagem !== "") {
      return (
        <BalaoMensagem
          // onDoubleClick={apagandoMensagem}
          tipo={"outro"}
          key={index}
        >
          <BalaoMensagemUsernameDiv>{conversa.nome}</BalaoMensagemUsernameDiv>
          <div>{conversa.mensagem}</div>
          <Doublecheck src={doublecheck} />
        </BalaoMensagem>
      );
    }
  });

  const handleUsernameInput = (e) => {
    setInputUsername(e.target.value);
  };

  const handleMessageInput = (e) => {
    setInputMessage(e.target.value);
  };

  const handleKeyPress = React.useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.code === "Enter" && (inputEu() || inputOutro())) {
        submit();
      }
    });
  });

  const inputEu = () => {
    if (inputUsername === "" && inputMessage !== "") {
      return false;
    } else return true;
  };

  const inputOutro = () => {
    if (inputUsername !== "" && inputMessage !== "") {
      return false;
    } else return true;
  };

  const submit = () => {
    setUsername(inputUsername);
    setMessage(inputMessage);
    adicionandoMensagem();
  };

  return (
    <ContainerAreaDeEnvio>
      {listandoConversa}
      <AreaDeEnvioDiv>
        <AreaDeEnvioInputUser
          value={inputUsername}
          onChange={handleUsernameInput}
          type="text"
          placeholder="Username"
        ></AreaDeEnvioInputUser>
        <AreaDeEnvioInputMessage
          value={inputMessage}
          type="text"
          placeholder="Message"
          onChange={handleMessageInput}
        ></AreaDeEnvioInputMessage>
        <AreaDeEnvioButton onKeyDown={handleKeyPress} onClick={submit}>
          Enviar
        </AreaDeEnvioButton>
      </AreaDeEnvioDiv>
    </ContainerAreaDeEnvio>
  );
}

export default AreaDeEnvio;
