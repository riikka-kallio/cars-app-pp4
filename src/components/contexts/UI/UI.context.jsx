/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const UIContext = createContext({
  snackbar: {
    isOpen: false,
    hideDuration: 6000,
    onClose: () => {},
    message: "success",
    showSuccessMessage: () => {},
    showInfoMessage: () => {},
    showWarningMessage: () => {},
    showErrorMessage: () => {},
  },
});

export const UIProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const onClose = () => {
    setOpen(false);
    setMessage("");
    setSeverity("info");
  };

  const showSuccessMessage = ({ message }) => {
    console.log('showSuccessMessage', message);
    setOpen(true);
    setMessage(message);
    setSeverity('success');
  };
  const showInfoMessage = ({ message }) => {
    console.log('showInfoMessage', message);
    setOpen(true);
    setMessage(message);
    setSeverity('info');
  };
  const showWarningMessage = ({ message }) => {
    console.log('showWarningMessage', message);
    setOpen(true);
    setMessage(message);
    setSeverity('warning');
  };
  const showErrorMessage = ({ message }) => {
    console.log(message);
    setOpen(true);
    setMessage(message);
    setSeverity('error');
  };

  return (
    <UIContext.Provider
      value={{
        snackbar: {
          isOpen: open,
          hideDuration: 6000,
          onClose,
          message,
          showSuccessMessage,
          showInfoMessage,
          showWarningMessage,
          showErrorMessage,
          severity,
        },
        // navigation: {}
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
