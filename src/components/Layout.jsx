import { Outlet } from "react-router-dom";

import Header from "./Header";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Typography  from "@mui/material/Typography";

import useUI from "./contexts/UI/useUI.hook";

function Layout() {
  const {
    snackbar: {
      isOpen: open,
      severity,
      onClose: handleClose,
      message,
      hideDuration,
    },
  } = useUI();
 
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </main>
      <Snackbar
        open={open}
        autoHideDuration={hideDuration}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          <Typography>{message}</Typography>
        </Alert>
      </Snackbar>
    </>
  );
}

export default Layout;