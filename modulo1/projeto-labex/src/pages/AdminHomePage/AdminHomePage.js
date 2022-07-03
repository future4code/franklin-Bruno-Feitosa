import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProtectedPage from "../../hooks/useProtectedPage";

function AdminHomePage() {
  useProtectedPage();
  let navigate = useNavigate();

  return (
    <div>
      <h1>AdminHome</h1>
    </div>
  );
}

export default AdminHomePage;
