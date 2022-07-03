import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToLastPage, goToCreateTrip } from "../../routes/coordinator";
import useRequestData from "../../hooks/useRequestData";
import { BASE_URL } from "../../constants/urls";
import { ListTripsCard } from "./ListTripsCard";
import { CarouselStyle, CreateTripButton, TripListsContainer } from "./styled";
import Add from "@mui/icons-material/Add";
import { Typography } from "@mui/material";

function ListTripsPage(props) {
  const getTrips = useRequestData([], `${BASE_URL}/trips`).trips;
  const token = localStorage.getItem("token");
  const { setTripName } = props;

  let navigate = useNavigate();

  return (
    <>
      <Typography
        fontFamily={"Volkorn"}
        marginTop={6}
        color={"primary"}
        variant={"h3"}
        align={"center"}
      >
        LabeX
      </Typography>
      <Typography
        fontFamily={"Tharlon"}
        marginTop={6}
        color={"primary"}
        variant={"h5"}
        align={"center"}
      >
        Confira nossas viagens
      </Typography>
      <TripListsContainer>
        <CarouselStyle>
          {getTrips &&
            getTrips.length > 0 &&
            getTrips.map((trip, index) => {
              return (
                <ListTripsCard
                  setTripName={setTripName}
                  id={trip.id}
                  key={index}
                  name={trip.name}
                  description={trip.description}
                  planet={trip.planet}
                  duration={trip.durationInDays}
                />
              );
            })}
        </CarouselStyle>
      </TripListsContainer>
      {token && (
        <CreateTripButton
          color={"primary"}
          onClick={() => {
            goToCreateTrip(navigate);
          }}
        >
          <Add />
        </CreateTripButton>
      )}
    </>
  );
}

export default ListTripsPage;
