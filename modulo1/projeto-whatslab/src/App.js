import AreaDeEnvio from "./components/AreaDeEnvio/AreaDeEnvio";
import styled from "styled-components";
import whatslabBG from "../src/img/background-whatslab.jpg";
import Header from "./components/Header/Header";

const Container = styled.div`
  width: 40vw;
  min-width: 30vw;
  margin: 0 auto;
`;

const ContainerConversas = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 93vh;

  background: url(${whatslabBG});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

function App() {
  return (
    <Container>
      <Header />
      <ContainerConversas>
        <AreaDeEnvio />
      </ContainerConversas>
    </Container>
  );
}

export default App;
