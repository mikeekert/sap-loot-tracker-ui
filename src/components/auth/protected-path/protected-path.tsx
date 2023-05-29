import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

export const ProtectedRoute = ({ component }: { component: React.FC }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div className="page-layout">Authenticating ...</div>,
  });
  return <Component />;
};