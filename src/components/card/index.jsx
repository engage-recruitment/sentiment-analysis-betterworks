import React from "react";

import styles from "./card.module.scss";

export const Card = (props) => {
  return (
    <div className={`${styles.card} ${props.className || ""}`}>
      <CardBody>{props.children}</CardBody>
    </div>
  );
};

export const CardBody = (props) => {
  return (
    <div className={`${styles.cardBody} ${props.className || ""}`}>
      {props.children}
    </div>
  );
};
