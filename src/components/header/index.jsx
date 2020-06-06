import React from "react";

import styles from "./header.module.scss";
import logo from "../../logo.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} className={styles.logo} alt="logo" />
      <div className={styles.title}>Sentiment Analysis</div>
    </header>
  );
};

export default Header;
