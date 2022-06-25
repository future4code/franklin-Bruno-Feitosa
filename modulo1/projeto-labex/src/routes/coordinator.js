import React from "react";
import { useNavigate } from "react-router-dom";

export const goToTripDetails = (navigate, id) => {
  navigate(`/admin/trips/${id}`);
};
export const goToCreateTrip = (navigate) => {
  navigate("/admin/trips/create");
};

export const goToLoginPage = (navigate) => {
  navigate("/login");
};

export const goToLastPage = (navigate) => {
  navigate(-1);
};

export const goFromLoginToHome = (navigate) => {
  navigate("/");
};

export const goToApplicationForm = (navigate) => {
  navigate("/trips/application");
};

export const goToAdminPage = (navigate) => {
  navigate("/admin");
};

export const goToTripListPage = (navigate) => {
  navigate("/trips/list");
};
