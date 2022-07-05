import { Button, Divider, List } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import ChevronRight from "@mui/icons-material/ChevronRight";
import styled from "styled-components";

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  flex-direction: row;
`;

export const ListStyled = styled(List)`
  height: 100vh;
  background: #080c1f;
`;

export const ChevronDiv = styled.div`
  background-color: #a89a3b;
`;

export const ChevronRightIconWhite = styled(ChevronRight)`
  color: white;
`;

export const DividerListDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 170px;
`;

export const DividerColor = styled(Divider)`
  background-color: #a89a3b;
  width: 170px;
`;

export const ListButton = styled(Button)`
  color: #dcdcdc;
`;
