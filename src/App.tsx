import React, { useEffect } from "react";
import "./App.module.scss";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Upload from "./components/upload/Upload";
import { ProtectedRoute } from "./components/auth/protected-path/protected-path";
import styles from "./App.module.scss";
import ChartPage from "./pages/Chart/Chart.page";
import { api } from "./api/loot/loot.api";
import Layout from "./pages/Layout/Layout";
import { Auth0Provider } from "@auth0/auth0-react";
import fetchAccessToken from "./components/auth/blizzard.auth";
import { ILootInfo } from "./models/ILootInfo";

export interface BnetToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  sub: string;
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ChartPage />,
        loader: async () => {
          return api.getAllLoot<ILootInfo[]>();
        },
      },
      {
        path: "/upload",
        element: <ProtectedRoute component={Upload} />,
      },
      {
        path: "/*",
        element: <Navigate to={"/"} />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    fetchAccessToken().then((token) => {
      // set token to localStorage
      localStorage.setItem("bnet_token", token.access_token);
    });
  }, []);

  return (
    <Auth0Provider
      domain="dev-qh2nqjcadoxyg0eq.us.auth0.com"
      clientId="yJAXEXHdu01vaGBuuJPZ9WPY0UjYLq83"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {
        <div className={styles.main}>
          <RouterProvider router={router} />
        </div>
      }
    </Auth0Provider>
  );
}

export default App;
