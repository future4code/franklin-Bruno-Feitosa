import { Typography } from "@mui/material";
import styled from "styled-components";

export const HomePageContainer = styled.div`
  background-color: #080c1f;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const TypographyGlow = styled(Typography)`
  text-shadow: 0 0 10px #a89a3b;
`;
export const ButtonContainerDiv = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
`;

export const LogoImage = styled.img`
  width: 70vw;
  max-width: 350px;
  margin-top: 5rem;
  margin-bottom: 5rem;
`;
