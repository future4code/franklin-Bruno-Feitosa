import React from "react";
import styled from "styled-components";
// import "./App.css";
import CardGrande from "./components/CardGrande/CardGrande";
import CardPequeno from "./components/CardPequeno/CardPequeno";
import ImagemButton from "./components/ImagemButton/ImagemButton";
import Publication from "./components/Publication/Publication";

const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const PageSectionContainer = styled.div`
  width: 40vw;
  margin: 10px 0;
`;

const PageSectionContainerH2 = styled.h2`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

function App() {
  return (
    <AppDiv>
      <PageSectionContainer>
        <PageSectionContainerH2>Dados pessoais</PageSectionContainerH2>
        <CardGrande
          imagem="https://user-images.githubusercontent.com/72406702/170407367-71803afb-cdc9-454e-b2be-7a2bdea19a9a.png"
          nome="Bruno Britto"
          descricao="Oi, eu sou o Bruno. Fiz parte do programa Desenvolve 2022 do Grupo Boticário em parceria com a Labenu e atualmente sou estudante da Labenu e desenvolvedor backend no Grupo Boticário.
          "
        />

        <ImagemButton
          imagem="https://i.pinimg.com/564x/09/0a/ea/090aea0be7fa8331086ce7023350ef0a.jpg"
          texto="Ver mais"
        />

        <CardPequeno
          email="Email: brunobritto@email.com"
          endereco="Endereço: Rua Pizza de Quatro Queijos, 100"
        />
      </PageSectionContainer>

      <PageSectionContainer>
        <PageSectionContainerH2>
          Experiências profissionais
        </PageSectionContainerH2>
        <CardGrande
          imagem="https://s3.amazonaws.com/future4.com.br/static/headf4-c492117ca2373dc85ca81bf715b3dc2a.png"
          nome="Labenu"
          descricao="Estudante da formação Fullstack 6 meses."
        />

        <CardGrande
          imagem="https://www.ycar.com.br/site20/wp-content/uploads/2021/04/grupo-boticario-anuncia-plano-de-gestao-de-residuos.png"
          nome="Grupo Boticário"
          descricao="Desenvolvedor I backend, atuando meio expediente nos primeiros 6 meses."
        />

        <CardGrande
          imagem="https://www.ufpb.br/educacaofinanceira/contents/imagens/brasoes-universidades/ufpb.png/@@images/0f5cd94f-2e42-48ed-a9b7-96ad05b58a43.png"
          nome="Universidade Federal da Paraíba"
          descricao="Estudante de graduação em Ciência da Computação, atualmente no 7º período."
        />
      </PageSectionContainer>

      <PageSectionContainer>
        <PageSectionContainerH2>Publicações</PageSectionContainerH2>
        <Publication
          autor="Bruno Britto"
          texto="Olá pessoal, espero que gostem de minha primeira publicação! Atualmente estou estudando sobre como utilizar props, styled-components, como organizar a estrutura de pastas e outras coisas na Labenu! Tem sido uma experiência incrível com novos aprendizados, desafios e instrutores fantásticos."
          data="26/05/2022"
        />
      </PageSectionContainer>

      <PageSectionContainer>
        <PageSectionContainerH2>Minhas redes sociais</PageSectionContainerH2>
        <ImagemButton
          imagem="https://d2v9ipibika81v.cloudfront.net/uploads/sites/261/2017/01/facebook-logo-3.png"
          texto="Facebook"
        />

        <ImagemButton
          imagem="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-1-1.png"
          texto="Twitter"
        />

        <ImagemButton
          imagem="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          texto="Linkedin"
        />
      </PageSectionContainer>
    </AppDiv>
  );
}

export default App;
