import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  CardActionAreaStyled,
  CardContentFlex,
  CardMediaStyle,
} from "./styled";
import { useNavigate } from "react-router-dom";
import { goToApplicationForm, goToTripDetails } from "../../routes/coordinator";
import { Card, CardMedia } from "@material-ui/core";
import rocketImg from "../../assets/img-foguete.png";

export const ListTripsCard = (props) => {
  const { setTripName, id, name, description, planet, duration } = props;
  const token = localStorage.getItem("token");

  const goToApplicationFormWithName = () => {
    // setTripName(name);
    localStorage.setItem("tripId", id);
    localStorage.setItem("tripName", name);
    goToApplicationForm(navigate);
  };

  const navigate = useNavigate();
  return (
    <Card>
      <CardActionAreaStyled
        onClick={() => {
          token ? goToTripDetails(navigate, id) : goToApplicationFormWithName();
        }}
      >
        <CardMediaStyle
          component="img"
          height={200}
          alt="galaxy photo"
          src={rocketImg}
        />
        <CardContentFlex>
          <Typography marginLeft={2} gutterBottom variant="h5" component="div">
            <>{name}</>
          </Typography>
          <Typography marginLeft={2} variant="body2" color="text.secondary">
            <>{description}</>
          </Typography>
          <Typography marginLeft={2} variant="body3" color="text.secondary">
            <>{`Planeta: ${planet}`}</>
          </Typography>
          <Typography
            alignSelf={"center"}
            variant="body4"
            color="text.secondary"
          >
            <>{`Duração: ${duration} dias`}</>
          </Typography>
        </CardContentFlex>
      </CardActionAreaStyled>
    </Card>
  );
};
