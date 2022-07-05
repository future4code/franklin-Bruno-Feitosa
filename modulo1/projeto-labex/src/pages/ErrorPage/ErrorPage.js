import React from "react";
import { ErrorPageContainer, ErrorImage } from "./styled";
import error from "../../assets/error.png";
import { Typography } from "@mui/material";

const ErrorPage = () => {
  return (
    <ErrorPageContainer>
      <ErrorImage src={error} />
      <Typography marginTop={6} color={"white"} variant={"h6"} align={"center"}>
        Erro 404 - Página Não Encontrada
      </Typography>
    </ErrorPageContainer>
  );
};

export default ErrorPage;
