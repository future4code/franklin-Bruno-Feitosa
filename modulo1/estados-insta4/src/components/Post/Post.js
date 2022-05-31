import React, { useState } from "react";
import styled from "styled-components";

import { IconeComContador } from "../IconeComContador/IconeComContador";

import iconeCoracaoBranco from "../../img/favorite-white.svg";
import iconeCoracaoPreto from "../../img/favorite.svg";
import iconeComentario from "../../img/comment_icon.svg";
import { SecaoComentario } from "../SecaoComentario/SecaoComentario";

import iconeSalvoPreto from "../../img/save-black-icon.svg";
import iconeSalvoBranco from "../../img/save-white-icon.svg";

const PostContainer = styled.div`
  border: 1px solid gray;
  width: 300px;
  margin-bottom: 10px;
`;

const PostHeader = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const PostFooter = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
`;

const UserPhoto = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 10px;
  border-radius: 50%;
`;

const PostPhoto = styled.img`
  width: 100%;
`;

function Post(props) {
  // const [state, setState] = useState({
  //   curtido: false,
  //   numeroCurtidas: 0,
  //   comentando: false,
  //   numeroComentarios: 0,
  // });

  const [numeroCurtidas, setnumeroCurtidas] = useState(0);
  const [curtido, setCurtido] = useState(false);
  const [comentando, setComentando] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [numeroComentarios, setNumeroComentarios] = useState(0);
  const [inputComentario, setInputComentario] = useState("");

  const onClickCurtida = () => {
    if (!curtido) {
      setnumeroCurtidas(numeroCurtidas + 1);
      setCurtido(true);
      console.log("Você curtiu!");
    } else {
      setnumeroCurtidas(numeroCurtidas - 1);
      setCurtido(false);
      console.log("Você descurtiu!");
    }
  };

  const onClickSalvo = () => {
    if (!salvo) {
      setSalvo(true);
      console.log("A postagem foi salva!");
    } else {
      setSalvo(false);
      console.log("A postagem não está mais salva!");
    }
  };

  const onClickComentario = () => {
    setComentando(!comentando);
    if (comentando) {
      componenteComentario = <SecaoComentario aoEnviar={aoEnviarComentario} />;
    }
  };

  const handlerInputComentario = (e) => {
    setInputComentario(e.target.value);
  };

  const aoEnviarComentario = () => {
    setComentando(false);
    setNumeroComentarios(numeroComentarios + 1);
    console.log(inputComentario);
  };

  let iconeCurtida;

  if (curtido) {
    iconeCurtida = iconeCoracaoPreto;
  } else {
    iconeCurtida = iconeCoracaoBranco;
  }

  let iconeSalvo;

  if (salvo) {
    iconeSalvo = iconeSalvoPreto;
  } else iconeSalvo = iconeSalvoBranco;

  let componenteComentario;

  if (comentando) {
    componenteComentario = (
      <SecaoComentario
        aoEnviar={aoEnviarComentario}
        handleInput={handlerInputComentario}
      />
    );
  }

  return (
    <PostContainer>
      <PostHeader>
        <UserPhoto src={props.fotoUsuario} alt={"Imagem do usuario"} />
        <p>{props.nomeUsuario}</p>
      </PostHeader>

      <PostPhoto src={props.fotoPost} alt={"Imagem do post"} />

      <PostFooter>
        <IconeComContador
          icone={iconeCurtida}
          onClickIcone={onClickCurtida}
          valorContador={numeroCurtidas}
        />

        <IconeComContador
          icone={iconeComentario}
          onClickIcone={onClickComentario}
          valorContador={numeroComentarios}
        />
        <IconeComContador icone={iconeSalvo} onClickIcone={onClickSalvo} />
      </PostFooter>
      {componenteComentario}
    </PostContainer>
  );
}

export default Post;
