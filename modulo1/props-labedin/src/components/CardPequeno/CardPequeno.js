import React from "react";
// import "./CardPequeno.css";
import styled from "styled-components";

const SmallCardContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  padding: 20px 10px;
  margin-bottom: 5px;
`;

const SmallCardIcon = styled.img`
  width: 2vw;
  margin-right: 1vw;
`;

function CardPequeno(props) {
  return (
    <div>
      <SmallCardContainer>
        <SmallCardIcon
          className="smallcard-icon"
          src="https://user-images.githubusercontent.com/72406702/170504687-f3dfaf39-5240-4251-ac67-e109d9a707c6.png"
          alt="icon email"
        ></SmallCardIcon>
        <p>{props.email}</p>
      </SmallCardContainer>
      <SmallCardContainer>
        <SmallCardIcon
          className="smallcard-icon"
          src="https://user-images.githubusercontent.com/72406702/170504681-9e25c98d-9793-4848-a443-85a3b67aed5f.png"
          alt="email icon"
        ></SmallCardIcon>
        <p>{props.endereco}</p>
      </SmallCardContainer>
    </div>
  );
}
export default CardPequeno;
