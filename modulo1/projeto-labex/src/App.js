import Router from "./routes/Router";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header/Header";
import theme from "./constants/theme";
import { ThemeProvider } from "@emotion/react";

function App() {
  const token = localStorage.getItem("token");
  const [tripName, setTripName] = useState("");
  const [rightButtonText, setRightButtonText] = useState(
    token ? "Logout" : "Login"
  );
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          rightButtonText={rightButtonText}
          setRightButtonText={setRightButtonText}
        />
        <Router
          setRightButtonText={setRightButtonText}
          tripName={tripName}
          setTripName={setTripName}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
