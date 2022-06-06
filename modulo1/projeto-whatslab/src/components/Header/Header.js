import React from "react";
import styled from "styled-components";
import labenuIcon from "../../img/labenu-icon.png";

const HeaderContainer = styled.div`
  display: flex;
  height: 7vh;
  margin: 0 auto;
  background-color: #1e3146;
  align-items: center;
  z-index: 100;
`;

const HeaderContainerH1 = styled.h1`
  font-size: 1.5rem;
  color: #fff;
  margin-left: 2rem;
  font-family: "Montserrat", sans-serif;
  letter-spacing: 5px;
`;

const HeaderContainerH1img = styled.img`
  width: 30px;
  margin-left: 1rem;
`;

function Header() {
  return (
    <HeaderContainer>
      <HeaderContainerH1>LabeZap</HeaderContainerH1>
      <HeaderContainerH1img src={labenuIcon} />
    </HeaderContainer>
  );
}

export default Header;
