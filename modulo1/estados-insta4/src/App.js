import React from "react";
import styled from "styled-components";
import Post from "./components/Post/Post";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
function App() {
  return (
    <MainContainer>
      <Post
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
      />
    </MainContainer>
  );
}

export default App;
