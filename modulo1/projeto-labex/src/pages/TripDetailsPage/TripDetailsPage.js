import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProtectedPage from "../../hooks/useProtectedPage";
import { goToTripListPage } from "../../routes/coordinator";
import { BASE_URL } from "../../constants/urls";
import useRequestDataAuth from "../../hooks/useRequestDataAuth";
import Loading from "../../components/Loading/Loading";
import { ScreenContainer, TripDetailsContainer } from "./styled";
import { TripCandidatesCard } from "./TripCandidatesCard";
import { TripNameInfo } from "../../pages/TripDetailsPage/TripNameInfo";
import { Typography } from "@mui/material";

function TripDetailsPage() {
  useProtectedPage();
  let navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const tripDetails = useRequestDataAuth([], `${BASE_URL}/trip/${id}`).trip;

  return (
    <div>
      <ScreenContainer>
        {tripDetails ? (
          <TripDetailsContainer>
            <TripNameInfo name={tripDetails.name} />
            <Typography
              gutterBottom
              align={"center"}
              variant={"h5"}
              color={"primary"}
              marginTop={2}
              marginBottom={6}
            >
              Candidatos
            </Typography>
            {tripDetails &&
              tripDetails.candidates.map((candidate) => {
                return (
                  <>
                    <TripCandidatesCard
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
                  </>
                );
              })}
            <Typography
              gutterBottom
              align={"center"}
              variant={"h5"}
              color={"primary"}
              marginTop={2}
              marginBottom={6}
            >
              Aprovados
            </Typography>
            {tripDetails &&
              tripDetails.approved.map((approvedList) => {
                return (
                  <TripCandidatesCard
                    name={approvedList.name}
                    age={approvedList.age}
                    applicationText={approvedList.applicationText}
                    profession={approvedList.profession}
                    country={approvedList.country}
                    type="aprovado"
                  />
                );
              })}
          </TripDetailsContainer>
        ) : (
          <Loading />
        )}
      </ScreenContainer>
      <button
        onClick={() => {
          goToTripListPage(navigate);
        }}
      >
        Voltar
      </button>
    </div>
  );
}

export default TripDetailsPage;
