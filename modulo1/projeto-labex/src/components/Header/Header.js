import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  goToAdminPage,
  goToHomePage,
  goToLoginPage,
  goToTripListPage,
} from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";
import {
  ChevronDiv,
  ChevronRightIconWhite,
  DividerColor,
  DividerListDiv,
  ListButton,
  ListStyled,
  StyledToolbar,
} from "./styled";
import { Divider, Link, List, ListItem, SwipeableDrawer } from "@mui/material";
import { BASE_URL } from "../../constants/urls";
import { AppBar, Typography } from "@material-ui/core";
import { green } from "@mui/material/colors";

export const Header = (props) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { rightButtonText, setRightButtonText } = props;
  const navigationLinks = [
    { name: "Home" },
    { name: "Lista de Viagens" },
    { name: rightButtonText },
  ];
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
  };

  const rightButtonAction = () => {
    if (token) {
      logout();
      setRightButtonText("Login");
      goToLoginPage(navigate);
    } else {
      goToLoginPage(navigate);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            fontFamily={"Volkorn"}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            LabeX
          </Typography>
          <Button color="inherit"></Button>
        </StyledToolbar>
        <SwipeableDrawer
          anchor={"right"}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <ChevronDiv>
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <ChevronRightIconWhite />
            </IconButton>
          </ChevronDiv>
          <Divider />
          <ListStyled>
            {navigationLinks.map((item, index) => {
              return (
                <ListItem key={index}>
                  <Link underline="none" variant="button" href={item.href}>
                    <DividerListDiv>
                      <ListButton
                        onClick={() => {
                          if (item.name === "Home") {
                            if (token) {
                              goToAdminPage(navigate);
                            } else {
                              goToHomePage(navigate);
                            }
                          } else if (item.name === "Lista de Viagens") {
                            goToTripListPage(navigate);
                          } else if (
                            item.name === "Login" ||
                            item.name === "Logout"
                          ) {
                            rightButtonAction();
                          }
                        }}
                      >
                        {item.name}
                      </ListButton>
                      <DividerColor />
                    </DividerListDiv>
                  </Link>
                </ListItem>
              );
            })}
          </ListStyled>
        </SwipeableDrawer>
      </AppBar>
    </Box>
  );
};
