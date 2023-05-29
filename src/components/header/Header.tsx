import styles from "./Header.module.scss";
import React from "react";

export function Header() {
  return (
    <>
      <h1 className={styles.header_title}>
        <a href={"test"}>IDK HELLO</a>
      </h1>
    </>
  );
}
