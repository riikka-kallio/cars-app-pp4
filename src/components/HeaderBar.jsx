/* eslint-disable react/prop-types */

import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function HeaderBar({
  handleDrawerToggle = () =>
    console.log("no handleDrawerToggle function provided"),
}) {
  return (
    <>
      <AppBar component="nav" position="sticky" sx={{ mb: 2 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="span"
            variant="h6"
          >
            CarsApp
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default HeaderBar;