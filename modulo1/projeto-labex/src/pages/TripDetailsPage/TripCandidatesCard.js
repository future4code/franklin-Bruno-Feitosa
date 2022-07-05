import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { ApproveButtonsDiv, CardStyled } from "./styled";
import { decideCandidate } from "../../services/admin";
import { Button } from "@material-ui/core";
import { Typography } from "@mui/material";

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
            color={"#a89a3b"}
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
          <ApproveButtonsDiv>
            <Button
              fullWidth
              onClick={() => {
                const type = "approve";
                decideCandidate(navigate, setIsLoading, id, candidateId, type);
              }}
              color={"primary"}
              variant="contained"
            >
              Aprovar candidato
            </Button>
            <Button
              fullWidth
              onClick={() => {
                const type = "disapprove";
                decideCandidate(navigate, setIsLoading, id, candidateId, type);
              }}
              color={"secondary"}
              variant="contained"
            >
              Reprovar candidato
            </Button>
          </ApproveButtonsDiv>
        </>
      );
    } else {
      return (
        <>
          <Typography
            gutterBottom
            align={"center"}
            variant={"h6"}
            color={"#a89a3b"}
            paddingBottom={3}
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
