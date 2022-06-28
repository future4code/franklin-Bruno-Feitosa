import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToLastPage, goToApplicationForm } from "../routes/coordinator";
import { useRequestData } from "../hooks/useRequestData";

function ListTripsPage() {
  // console.log("oi");
  const getTrips = useRequestData(
    `https://us-central1-labenu-apis.cloudfunctions.net/labeX/:aluno/trips`
  );

  // const isLogged = () => {};

  console.log(getTrips);

  let navigate = useNavigate();
  return (
    <div>
      <h1>ListTripsPage</h1>

      {getTrips.length > 0 &&
        getTrips[0].trips?.map((trip, index) => {
          return (
            <div key={index}>
              <p>{trip.id}</p>
              <p>{trip.name}</p>
              <p>{trip.description}</p>
              <p>{trip.durationInDays}</p>
              <p>{trip.planet}</p>
              <br></br>
            </div>
          );
        })}
      <button
        onClick={() => {
          goToApplicationForm(navigate);
        }}
      >
        ApplicationFormPage
      </button>
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

export default ListTripsPage;
