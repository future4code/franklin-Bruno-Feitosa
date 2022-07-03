import styled from "styled-components";
import { CardContent } from "@mui/material";
import Fab from "@material-ui/core/Fab";
import Carousel from "react-material-ui-carousel";

export const TripListsContainer = styled.div`
  display: flex;
  /* margin: 0 auto; */
  flex-wrap: wrap;
`;

export const CarouselStyle = styled(Carousel)`
  width: 90vw;
  margin: 0 5%;
  margin-top: 3rem;
`;

export const CardContentFlex = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;
export const CreateTripButton = styled(Fab)`
  position: fixed !important;
  right: 20px;
  bottom: 20px;
  z-index: 3;
`;
