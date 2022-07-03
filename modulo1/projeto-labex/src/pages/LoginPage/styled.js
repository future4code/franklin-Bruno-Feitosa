import { Lock, AccountCircle } from "@material-ui/icons";
import styled from "styled-components";

export const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #080c1f;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  max-width: 450px;
  align-items: center;
  margin-bottom: 20px;
`;

export const GoToHomePageButtonDiv = styled.div`
  width: 80vw;
  max-width: 450px;
`;

export const LogoImage = styled.img`
  width: 70vw;
  /* max-width: 350px; */
  border-radius: 100%;
  margin-top: 5rem;
  margin-bottom: 2rem;
`;

export const LockStyled = styled(Lock)`
  color: #a89a3b;
`;
export const AccountCircleStyled = styled(AccountCircle)`
  color: #a89a3b;
`;
