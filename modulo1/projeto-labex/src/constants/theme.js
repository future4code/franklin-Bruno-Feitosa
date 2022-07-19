import { createTheme } from "@material-ui/core";
import { primaryColor, neutralColor, buttonColor } from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      contrastText: "white",
    },
    secondary: {
      main: buttonColor,
      contrastText: "white",
    },
    text: {
      main: "#000000",
      secondary: neutralColor,
    },
  },
});

export default theme;
