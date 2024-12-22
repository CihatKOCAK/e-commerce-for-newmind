import React from "react";

const Modal = ({ isOpen, onClose, title, children, style }) => {
  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    modal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      zIndex: 1001,
      minWidth: "400px",
      maxWidth: "90%",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px",
    },
    closeButton: {
      background: "transparent",
      border: "none",
      fontSize: "1.5rem",
      cursor: "pointer",
    },
  };

  return (
    <>
      <div style={styles.overlay} onClick={onClose}></div>
      <div style={style ? { ...styles.modal, ...style } : styles.modal}>
        <div style={styles.header}>
          <h2>{title}</h2>
          <button style={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

export default Modal;
