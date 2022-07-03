import { createTheme } from "@material-ui/core";
import { primaryColor, neutralColor } from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      contrastText: "white",
    },
    secondary: {
      main: neutralColor,
      contrastText: "#080c1f",
    },
    text: {
      primary: neutralColor,
    },
  },
});

export default theme;
