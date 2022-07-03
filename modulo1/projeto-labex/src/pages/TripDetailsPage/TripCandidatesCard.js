import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { CardStyled } from "./styled";
import { decideCandidate } from "../../services/admin";
import { Button } from "@material-ui/core";

export const TripCandidatesCard = (props) => {
  const {
    name,
    age,
    applicationText,
    profession,
    country,
    type,
    navigate,
    setIsLoading,
    id,
    candidateId,
  } = props;

  const conditionalRender = () => {
    if (type === "candidato") {
      return (
        <>
          <Typography
            gutterBottom
            align={"center"}
            variant={"h6"}
            color={"primary"}
            marginBottom={4}
          >
            Ficha do Candidato
          </Typography>
          <Typography marginTop={1}>{`Nome: ${name}`}</Typography>
          <Typography marginTop={1}>{`Texto: ${applicationText}`}</Typography>
          <Typography marginTop={1}>{<>{`Idade: ${age}`}</>}</Typography>
          <Typography marginTop={1}>
            {<>{`Profissão: ${profession}`}</>}
          </Typography>
          <Typography
            marginTop={1}
            marginBottom={3}
          >{`País: ${country}`}</Typography>
          <Button
            fullWidth
            onClick={() => {
              decideCandidate(navigate, setIsLoading, id, candidateId);
            }}
            color={"primary"}
            variant="contained"
          >
            Aprovar candidato
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Typography
            gutterBottom
            align={"center"}
            variant={"h6"}
            color={"primary"}
            marginBottom={4}
          >
            Candidato Aprovado
          </Typography>
          <Typography marginTop={1}>{`Nome: ${name}`}</Typography>
          <Typography marginTop={1}>{`Texto: ${applicationText}`}</Typography>
          <Typography marginTop={1}>{<>{`Idade: ${age}`}</>}</Typography>
          <Typography marginTop={1}>
            {<>{`Profissão: ${profession}`}</>}
          </Typography>
          <Typography marginTop={1}>{`País: ${country}`}</Typography>
        </>
      );
    }
  };
  return (
    <CardStyled>
      <CardContent>{conditionalRender()}</CardContent>
    </CardStyled>
  );
};
