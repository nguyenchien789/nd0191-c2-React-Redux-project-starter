import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateWrapper = () => {
    const redirectUrl = window.location.href.toString().split(window.location.host)[1];
    const isLogged = useSelector(state => state.isLogged);
    return isLogged != null ?  <Outlet /> : <Navigate to={`/login?redirectTo=${redirectUrl}`} />;
};

export default PrivateWrapper;