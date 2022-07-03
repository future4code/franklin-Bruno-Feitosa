import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHomePage from "../pages/AdminHomePage/AdminHomePage";
import ApplicationFormPage from "../pages/ApplicationFormPage/ApplicationFormPage";
import CreateTripPage from "../pages/CreateTripPage/CreateTripPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import ListTripsPage from "../pages/ListTripsPage/ListTripsPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import TripDetailsPage from "../pages/TripDetailsPage/TripDetailsPage";

function Router(props) {
  const { setRightButtonText, tripName, setTripName } = props;
  return (
    <Routes>
      <Route path={"/admin"} element={<AdminHomePage />} />
      <Route
        path={"/trips/application"}
        element={<ApplicationFormPage tripName={tripName} />}
      />
      <Route path={"/admin/trips/create"} element={<CreateTripPage />} />
      <Route path={"/"} element={<HomePage />} />
      <Route
        path={"/trips/list"}
        element={<ListTripsPage setTripName={setTripName} />}
      />
      <Route
        path={"/login"}
        element={<LoginPage setRightButtonText={setRightButtonText} />}
      />
      <Route path={"/admin/trips/:id"} element={<TripDetailsPage />} />
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default Router;
