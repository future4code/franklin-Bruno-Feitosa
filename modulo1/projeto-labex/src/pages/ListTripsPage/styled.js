import styled from "styled-components";
import { Card, CardContent } from "@mui/material";
import Fab from "@material-ui/core/Fab";
import Carousel from "react-material-ui-carousel";
import { CardActionArea, CardMedia } from "@material-ui/core";

export const CardMediaStyle = styled(CardMedia)`
  /* min-width: 89vw; */
`;

export const ListTripsBackgroundDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #080c1f;
  height: 100vh;
`;

export const TripListsContainer = styled.div``;

export const CardActionAreaStyled = styled(CardActionArea)`
  display: flex;
  flex-direction: column;
`;

export const CarouselStyle = styled(Carousel)`
  width: 80vw;
  margin: 0 10%;
  margin-top: 1rem;
`;

export const CardContentFlex = styled(CardContent)`
  display: flex;
  flex-direction: column;
  background-color: #cccaca;
  gap: 0.875rem;
  width: 80vw;
`;
export const CreateTripButton = styled(Fab)`
  position: fixed !important;
  right: 20px;
  bottom: 20px;
  z-index: 3;
`;
