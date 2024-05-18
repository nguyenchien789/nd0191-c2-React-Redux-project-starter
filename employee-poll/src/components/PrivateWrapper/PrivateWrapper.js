import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateWrapper = () => {
    const isLogged = useSelector(state => state.isLogged);
    return isLogged != null ?  <Outlet /> : <Navigate to="/login" />;
};

export default PrivateWrapper;