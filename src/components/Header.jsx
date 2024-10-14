import {useState} from 'react';
import Box from '@mui/material/Box'

// These need creating
import Navigation from './Navigation';
import HeaderBar from './HeaderBar';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsOpen((prevState) => {
      // console.log(prevState);
      return !prevState;
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
        <HeaderBar handleDrawerToggle={handleDrawerToggle} />
        <Navigation isOpen={isOpen} handleDrawerToggle={handleDrawerToggle} />
    </Box>
  )
}

export default Header;