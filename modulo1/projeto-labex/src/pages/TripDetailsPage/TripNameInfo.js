import * as React from "react";
import Typography from "@mui/material/Typography";
import { TripNameInfoDiv } from "./styled";

export const TripNameInfo = (props) => {
  return (
    <TripNameInfoDiv>
      <Typography
        marginBottom={5}
        marginTop={5}
        variant={"h4"}
        color={"#dcdcdc"}
      >
        {props.name}
      </Typography>
    </TripNameInfoDiv>
  );
};
