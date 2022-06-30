import { CircularProgress } from "@material-ui/core";
import React from "react";
import { LoadingContainer } from "./styled";

const Loading = () => {
  return (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  );
};

export default Loading;
