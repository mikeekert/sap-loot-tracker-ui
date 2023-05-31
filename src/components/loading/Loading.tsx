import React from "react";
import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <>
      <div className={"h-full grid place-content-center"}>
        <CircularProgress />
      </div>
    </>
  );
}
