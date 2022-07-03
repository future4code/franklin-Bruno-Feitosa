import * as React from "react";
import Typography from "@mui/material/Typography";
import { CardContentFlex } from "./styled";
import { useNavigate } from "react-router-dom";
import { goToApplicationForm, goToTripDetails } from "../../routes/coordinator";
import { Card, CardActionArea, CardMedia } from "@material-ui/core";

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
      <CardActionArea
        onClick={() => {
          token ? goToTripDetails(navigate, id) : goToApplicationFormWithName();
        }}
      >
        <CardMedia
          component="img"
          height="140"
          alt="galaxy photo"
          src="https://media.istockphoto.com/photos/rocket-on-blue-background-3d-rendering-picture-id1317263545?b=1&k=20&m=1317263545&s=170667a&w=0&h=xuW63c1L4tNmvXXNRetC4ON3BwiQqw3MvSNlImkNF7g="
        />
        <CardContentFlex>
          <Typography gutterBottom variant="h5" component="div">
            <>{name}</>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <>{description}</>
          </Typography>
          <Typography variant="body3" color="text.secondary">
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
      </CardActionArea>
    </Card>
  );
};
