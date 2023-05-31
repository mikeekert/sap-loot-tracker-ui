import React from "react";
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

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <div className={styles.chart_container}>
            <ChartPage />
          </div>
        ),
        loader: async () => {
          return api.getMockData();
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
