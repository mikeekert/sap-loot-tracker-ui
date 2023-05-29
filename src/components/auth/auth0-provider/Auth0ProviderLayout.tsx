import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Auth0Provider } from "@auth0/auth0-react";

export const Auth0ProviderLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState(null);

  useEffect(() => {
    if (location.state?.from) {
      setPreviousLocation(location.state.from);
    }
  }, [location]);

  const onRedirectCallback = () => {
    if (previousLocation) {
      navigate(previousLocation);
      setPreviousLocation(null);
    } else {
      navigate("/upload");
    }
  };

  return (
    <Auth0Provider
      domain="dev-qh2nqjcadoxyg0eq.us.auth0.com"
      clientId="yJAXEXHdu01vaGBuuJPZ9WPY0UjYLq83"
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Outlet />
    </Auth0Provider>
  );
};
