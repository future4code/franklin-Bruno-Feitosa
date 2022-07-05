import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProtectedPage from "../../hooks/useProtectedPage";
import { BASE_URL } from "../../constants/urls";
import useRequestDataAuth from "../../hooks/useRequestDataAuth";
import Loading from "../../components/Loading/Loading";
import {
  CarouselStyle,
  DeleteTripButton,
  ScreenContainer,
  TripDetailsContainer,
  TripDetailsEmptyCandidateDiv,
  TripImage,
} from "./styled";
import { TripCandidatesCard } from "./TripCandidatesCard";
import { TripNameInfo } from "../../pages/TripDetailsPage/TripNameInfo";
import { Typography } from "@mui/material";
import emptyImg from "../../assets/astro-tripdetails.png";
import { Delete } from "@mui/icons-material";
import { deleteTrip } from "../../services/admin";

function TripDetailsPage() {
  useProtectedPage();
  let navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const tripDetails = useRequestDataAuth([], `${BASE_URL}/trip/${id}`).trip;

  return (
    <>
      <ScreenContainer>
        {tripDetails ? (
          <TripDetailsContainer>
            <TripNameInfo name={tripDetails.name} />
            <Typography
              gutterBottom
              align={"center"}
              variant={"h5"}
              color={"#dcdcdc"}
              // marginTop={2}
              // marginBottom={2}
            >
              Candidatos
            </Typography>
            <CarouselStyle>
              {tripDetails && tripDetails.candidates.length > 0 ? (
                tripDetails.candidates.map((candidate) => {
                  return (
                    <TripCandidatesCard
                      key={candidate.id}
                      name={candidate.name}
                      age={candidate.age}
                      applicationText={candidate.applicationText}
                      profession={candidate.profession}
                      country={candidate.country}
                      type="candidato"
                      navigate={navigate}
                      setIsLoading={setIsLoading}
                      id={id}
                      candidateId={candidate.id}
                    />
                  );
                })
              ) : (
                <TripDetailsEmptyCandidateDiv>
                  <TripImage src={emptyImg} />
                  <Typography
                    gutterBottom
                    align={"center"}
                    variant={"h7"}
                    color={"white"}
                  >
                    Ainda não temos candidatos.
                  </Typography>
                </TripDetailsEmptyCandidateDiv>
              )}
            </CarouselStyle>
            <Typography
              gutterBottom
              align={"center"}
              variant={"h5"}
              color={"#dcdcdc"}
              marginTop={2}
              // marginBottom={2}
            >
              Aprovados
            </Typography>
            <CarouselStyle sx={{ paddingBottom: 4 }}>
              {tripDetails && tripDetails.approved.length > 0 ? (
                tripDetails.approved.map((approvedList) => {
                  return (
                    <TripCandidatesCard
                      key={approvedList.id}
                      name={approvedList.name}
                      age={approvedList.age}
                      applicationText={approvedList.applicationText}
                      profession={approvedList.profession}
                      country={approvedList.country}
                      type="aprovado"
                    />
                  );
                })
              ) : (
                <TripDetailsEmptyCandidateDiv>
                  <TripImage src={emptyImg} />
                  <Typography align={"center"} variant={"h7"} color={"white"}>
                    Ainda não temos aprovados.
                  </Typography>
                </TripDetailsEmptyCandidateDiv>
              )}
            </CarouselStyle>
          </TripDetailsContainer>
        ) : (
          <Loading />
        )}
        {
          <DeleteTripButton
            color={"primary"}
            onClick={() => {
              if (window.confirm("Você realmente quer deletar a viagem?"))
                deleteTrip(navigate, setIsLoading, id);
            }}
          >
            <Delete />
          </DeleteTripButton>
        }
      </ScreenContainer>
    </>
  );
}

export default TripDetailsPage;
