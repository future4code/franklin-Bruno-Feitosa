import * as React from "react";
import Typography from "@mui/material/Typography";

export const TripNameInfo = (props) => {
  return (
    <>
      <Typography
        marginTop={4}
        gutterBottom
        align={"center"}
        variant={"h4"}
        color={"primary"}
        marginBottom={6}
      >
        {props.name}
      </Typography>
    </>
  );
};
