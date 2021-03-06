import React from "react";
import { ErrorPageContainer, ErrorImage } from "./styled";
import error from "../../assets/error.png";
import Typography from "@material-ui/core/Typography";

const ErrorPage = () => {
  return (
    <ErrorPageContainer>
      <ErrorImage src={error} />
      <Typography color={"primary"} variant={"h4"} align={"center"}>
        Erro 404 - Página Não Encontrada
      </Typography>
    </ErrorPageContainer>
  );
};

export default ErrorPage;
