import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";

function ProtectedRoute({ children, msg, redirect }) {
  const [{ user }] = useContext(DataContext);

  if (!user) {
    // redirect to /auth, optionally passing a message and original path
    return <Navigate to="/auth" replace state={{ msg, redirect }} />;
  }

  return children;
}

export default ProtectedRoute;