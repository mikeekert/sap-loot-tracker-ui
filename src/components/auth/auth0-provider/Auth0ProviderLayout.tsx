import { Outlet } from "react-router-dom";
import React from "react";
import { Header } from "../../header/Header";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../loading/Loading";
import Footer from "../../footer/Footer";

export const Auth0ProviderLayout = () => {
  const { isLoading } = useAuth0();
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};
