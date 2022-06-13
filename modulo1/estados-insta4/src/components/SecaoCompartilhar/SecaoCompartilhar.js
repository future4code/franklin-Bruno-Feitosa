import React, { useState } from "react";
import styled from "styled-components";
import instagramIcon from "../../img/instagram-icon.svg";
import facebookIcon from "../../img/facebook-icon.svg";
import twitterIcon from "../../img/twitter-icon.svg";

const ShareContainer = styled.div`
  width: 300px;
  border-bottom: 2rem;
  border-top: 2px solid #202020;
`;

const ShareContainerText = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const ShareContainerIcons = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 5px;
`;

const ShareContainerInput = styled.input`
  display: flex;
  width: 80%;
  margin: 0 auto;
  padding: 5px;
  margin-bottom: 10px;
`;

const ShareButton = styled.button`
  border: none;
  background-color: transparent;
`;

export function SecaoCompartilhar(props) {
  const [inputText, setInputText] = useState("");

  const handleInputText = (e) => {
    setInputText(e.target.value);
  };

  const instagramOnClick = () => {
    if (inputText !== "") {
      console.log(
        `Compartilhando o post no Instagram com a mensagem: "${inputText}"`
      );
    } else {
      console.log(`Compartilhando o post no Instagram sem nenhuma mensagem.`);
    }
    props.fecharSecaoCompartilhar();
  };
  const facebookOnClick = () => {
    if (inputText !== "") {
      console.log(
        `Compartilhando o post no Facebook com a mensagem: "${inputText}"`
      );
    } else {
      console.log(`Compartilhando o post no Facebook sem nenhuma mensagem.`);
    }
    props.fecharSecaoCompartilhar();
  };
  const twitterOnClick = () => {
    if (inputText !== "") {
      console.log(
        `Compartilhando o post no Twitter com a mensagem: "${inputText}"`
      );
    } else {
      console.log(`Compartilhando o post no Twitter sem nenhuma mensagem.`);
    }
    props.fecharSecaoCompartilhar();
  };

  return (
    <ShareContainer>
      <ShareContainerText>Onde deseja compartilhar?</ShareContainerText>
      <ShareContainerInput
        onChange={handleInputText}
        type="text"
        value={inputText}
      ></ShareContainerInput>
      <ShareContainerIcons>
        <ShareButton onClick={instagramOnClick}>
          <img src={instagramIcon} alt="Icone do Instagram"></img>
        </ShareButton>
        <ShareButton onClick={facebookOnClick}>
          <img src={facebookIcon} alt="Icone do Facebook"></img>
        </ShareButton>
        <ShareButton onClick={twitterOnClick}>
          <img src={twitterIcon} alt="Icone do Twitter"></img>
        </ShareButton>
      </ShareContainerIcons>
    </ShareContainer>
  );
}
