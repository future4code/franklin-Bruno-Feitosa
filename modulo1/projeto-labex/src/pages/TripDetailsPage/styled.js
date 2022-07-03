import { Card } from "@material-ui/core";
import styled from "styled-components";

export const CardStyled = styled(Card)`
  margin-bottom: 2rem;
`;

export const TripImage = styled.img`
  width: 60vw;
  max-width: 600px;
  min-width: 300px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const ScreenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px;
`;

export const TripDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
  max-width: 600px;
  min-width: 300px;
`;
