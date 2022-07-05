import { Card, Fab } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import styled from "styled-components";

export const CardStyled = styled(Card)`
  margin-bottom: 2rem;
`;

export const ScreenContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #080c1f;
`;

export const CarouselStyle = styled(Carousel)`
  width: 40vw;
  min-width: 350px;

  /* background-color: blue; */
`;

export const TripImage = styled.img`
  max-width: 30vw;
  margin-bottom: 20px;
`;

export const TripDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TripDetailsEmptyCandidateDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TripNameInfoDiv = styled.div`
  display: flex;
  justify-content: center;
  /* margin-top: 4rem; */
`;

export const ApproveButtonsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem 0;
`;

export const DeleteTripButton = styled(Fab)`
  position: fixed !important;
  left: 20px;
  bottom: 20px;
  z-index: 3;
`;
