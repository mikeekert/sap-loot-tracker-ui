import React from "react";
import "./App.module.scss";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Upload from "./components/upload/Upload";
import { ProtectedRoute } from "./components/auth/protected-path/protected-path";
import { Auth0ProviderLayout } from "./components/auth/auth0-provider/Auth0ProviderLayout";
import ChartComponent from "./components/chart/Chart";

import styles from "./App.module.scss";
import { Header } from "./components/header/Header";

const router = createBrowserRouter([
  {
    element: <Auth0ProviderLayout />,
    children: [
      {
        path: "/",
        element: (
          <div className={styles.chart_container}>
            <ChartComponent />
          </div>
        ),
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
    <div className={styles.main}>
      <Header />
      <RouterProvider router={router} />
      <footer>I am footer</footer>
    </div>
  );
}

export default App;
