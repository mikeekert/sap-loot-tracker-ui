import styles from "./Header.module.scss";
import React from "react";

export function Header() {
  return (
    <>
      <h1 className={styles.header_title}>
        <p>Header Here</p>
      </h1>
    </>
  );
}
