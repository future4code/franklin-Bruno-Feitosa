import React, { useState } from "react";
import styled from "styled-components";
import Post from "./components/Post/Post";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const MainContainerInputsDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0;
  width: 320px;
`;

const MainContainerInput = styled.input`
  margin: 0 10px;
  padding: 10px;
`;

const MainContainerInputButton = styled.button`
  padding: 10px;
  margin: 0 10px;
  background-color: rgba(0, 255, 255, 0.4);
  cursor: pointer;
`;

function App() {
  const [state, setState] = useState({
    posts: [
      {
        nomeUsuario: "Paulinha",
        fotoUsuario: "https://picsum.photos/50/50",
        fotoPost: "https://picsum.photos/200/150",
      },
      {
        nomeUsuario: "BobtheDog",
        fotoUsuario: "https://picsum.photos/id/1062/200/150",
        fotoPost: "https://picsum.photos/id/1025/200/150",
      },
      {
        nomeUsuario: "TravelersDream",
        fotoUsuario: "https://picsum.photos/id/177/200/150",
        fotoPost: "https://picsum.photos/id/1011/200/150",
      },
    ],
  });

  const [inputNomeUsuario, setInputNomeUsuario] = useState("");
  const [inputFotoUsuario, setInputFotoUsuario] = useState("");
  const [inputFotoPost, setInputFotoPost] = useState("");
  // const [nomeUsuario, setNomeUsuario] = useState("");
  // const [fotoUsuario, setFotoUsuario] = useState("");
  // const [fotoPost, setFotoPost] = useState("");

  const handlerInputNomeUsuario = (e) => {
    setInputNomeUsuario(e.target.value);
  };
  const handlerInputFotoUsuario = (e) => {
    setInputFotoUsuario(e.target.value);
  };
  const handlerInputFotoPost = (e) => {
    setInputFotoPost(e.target.value);
  };

  // const enviaPost = () => {
  //   setNomeUsuario(inputNomeUsuario);
  //   setFotoUsuario(inputFotoUsuario);
  //   setFotoPost(inputFotoPost);
  // };

  const checkEmptyInput = () => {
    if (
      inputNomeUsuario !== "" &&
      inputFotoUsuario !== "" &&
      inputFotoPost !== ""
    ) {
      return false;
    } else return true;
  };

  const adicionaPost = () => {
    if (checkEmptyInput()) {
      console.log("Não podemos cadastra um post sem nenhum conteúdo!");
    } else {
      const novoPost = {
        nomeUsuario: inputNomeUsuario,
        fotoUsuario: inputFotoUsuario,
        fotoPost: inputFotoPost,
      };

      const novaListaDePosts = [novoPost, ...state.posts];
      const novoEstado = { posts: novaListaDePosts };

      setState(novoEstado);
    }

    setInputNomeUsuario("");
    setInputFotoUsuario("");
    setInputFotoPost("");
  };

  const listaDePostagens = state.posts.map((post, index) => {
    return (
      <Post
        nomeUsuario={post.nomeUsuario}
        fotoUsuario={post.fotoUsuario}
        fotoPost={post.fotoPost}
        key={index}
      />
    );
  });

  return (
    <MainContainer>
      <MainContainerInputsDiv>
        <MainContainerInput
          onChange={handlerInputNomeUsuario}
          value={inputNomeUsuario}
          placeholder="Nome do usuário"
        ></MainContainerInput>
        <MainContainerInput
          onChange={handlerInputFotoUsuario}
          value={inputFotoUsuario}
          placeholder="Link da foto do usuário"
        ></MainContainerInput>
        <MainContainerInput
          onChange={handlerInputFotoPost}
          value={inputFotoPost}
          placeholder="Link da foto do post"
        ></MainContainerInput>
        <MainContainerInputButton onClick={adicionaPost}>
          Adicionar
        </MainContainerInputButton>
      </MainContainerInputsDiv>

      {listaDePostagens}
      {/* <Post
        nomeUsuario={"Paulinha"}
        fotoUsuario={"https://picsum.photos/50/50"}
        fotoPost={"https://picsum.photos/200/150"}
      />
      <Post
        nomeUsuario={"BobtheDog"}
        fotoUsuario={"https://picsum.photos/id/1062/200/150"}
        fotoPost={"https://picsum.photos/id/1025/200/150"}
      />
      <Post
        nomeUsuario={"TravelersDream"}
        fotoUsuario={"https://picsum.photos/id/177/200/150"}
        fotoPost={"https://picsum.photos/id/1011/200/150"}
      /> */}
    </MainContainer>
  );
}

export default App;
