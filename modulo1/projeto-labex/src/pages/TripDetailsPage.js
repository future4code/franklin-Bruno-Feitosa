import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRequestData } from "../hooks/useRequestData";
import { useRequestDataAuth } from "../hooks/useRequestDataAuth";
import { goToLastPage, goToLoginPage } from "../routes/coordinator";

function TripDetailsPage() {
  const { params } = useParams();

  let navigate = useNavigate();

  const getTripDetails = useRequestDataAuth(
    `https://us-central1-labenu-apis.cloudfunctions.net/labeX/:aluno/trip/${params}`
  );

  const getTrips = useRequestData(
    `https://us-central1-labenu-apis.cloudfunctions.net/labeX/:aluno/trips`
  );

  return (
    <div>
      <h1>TripDetailsPage</h1>
      <h2>Candidatos</h2>
      {getTripDetails[0]?.trip.candidates.map((trip, index) => {
        return (
          <div key={index}>
            <p>{`${trip.name}`}</p>
            <p>{`${trip.age}`}</p>
            <p>{`${trip.country}`}</p>
            <p>{`${trip.applicationText}`}</p>
            <br />
          </div>
        );
      })}
      <button
        onClick={() => {
          goToLastPage(navigate);
        }}
      >
        Voltar
      </button>
    </div>
  );
}

export default TripDetailsPage;
