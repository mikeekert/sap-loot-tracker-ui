import styles from "./Header.module.scss";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

export function Header() {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const handleLogin = () => {
    loginWithRedirect().then((r) => r);
  };

  const displayContextualAuthenticationButton = () => {
    if (!isAuthenticated) {
      return (
        <Button variant={"contained"} onClick={handleLogin}>
          Log in
        </Button>
      );
    } else {
      return (
        <Button variant={"contained"} onClick={handleLogout}>
          Log Out
        </Button>
      );
    }
  };

  return (
    <>
      <div className={`${styles.header_title} flex`}>
        <Link className={"mr-5"} to={"/"} relative={"path"}>
          Home
        </Link>
        {isAuthenticated && (
          <Link className={"mr-5"} to={"/upload"}>
            Admin
          </Link>
        )}
        <div className={"flex-1 flex justify-end flex-row"}>
          {displayContextualAuthenticationButton()}
        </div>
      </div>
    </>
  );
}
