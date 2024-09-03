// Snackbar.js
import React, { useContext, useEffect, useState } from "react";

const SnackbarContext = React.createContext();

export const useSnackbar = () => useContext(SnackbarContext);

const SnackbarProvider = ({ children }) => {
    const [bgColor, setBgColor] = useState("#ffc438");
    const [fgColor, setFgColor] = useState("#000");
  const [snackbar, setSnackbar] = React.useState({
    visible: false,
    message: "please wait",
    opacity: 0,
  });

  const showSnackbar = (message, type) => {
    if(type==="error"){
        setBgColor("#c83e5b");
        setFgColor("#fff");
    } else if(type==="info"){
        setBgColor("#ffc438");
        setFgColor("#000");
    }
    setSnackbar({ visible: true, message, opacity: 1 }); // Initially fully visible
    // Start fading out after 2 seconds
    setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, opacity: 0 }));
    }, 2000);
    // Completely hide after 3 seconds
    setTimeout(() => {
      setSnackbar({ visible: false, message: "", opacity: 1 });
    }, 3000);
  };
  const outerBox = {
    width:"100%",
    display:"flex",
    justifyContent: "center"
  }
  const snackBarStyle = {
    visibility: snackbar.visible ? "visible" : "hidden",
    minWidth: "350px",
    marginLeft: "-175px",
    backgroundColor: bgColor,
    color: fgColor,
    textAlign: "center",
    borderRadius: "3px",
    padding: "16px",
    position: "fixed",
    zIndex: "999999",
    left: "50%",
    top: "6px",
    fontSize: "17px",
    opacity: snackbar.opacity,
    transition: "opacity 1s linear",
  };
  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar.visible && <div style={outerBox}><div style={snackBarStyle}>{snackbar.message}</div></div>}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
