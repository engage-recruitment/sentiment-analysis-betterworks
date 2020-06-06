import React from "react";

import styles from "./modal.module.scss";

const Modal = (props) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalBg} onClick={props.onClose} />
      <div className={styles.modalContent}>{props.children}</div>
    </div>
  );
};

export default Modal;
