import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProtectedPage from "../../hooks/useProtectedPage";
import {
  AdminHomeImage,
  AdminHomePageContainer,
  TextImageContainerDiv,
} from "./styled";
import adminImage from "../../assets/astro-adm.png";

function AdminHomePage() {
  useProtectedPage();
  let navigate = useNavigate();

  return (
    <AdminHomePageContainer>
      <TextImageContainerDiv>
        <Typography variant="h5" color={"white"} align={"center"}>
          Bem vindo, admin!
        </Typography>
        <Typography
          variant="h7"
          color={"white"}
          align={"center"}
          maxWidth={320}
        >
          A partir do menu acima você pode listar, criar e aprovar canditatos em
          suas viagens.
        </Typography>
        <AdminHomeImage src={adminImage} />
      </TextImageContainerDiv>
    </AdminHomePageContainer>
  );
}

export default AdminHomePage;
