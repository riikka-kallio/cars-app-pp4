import { useEffect } from 'react';
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Alert from "@mui/material/Alert"
import CircularProgress from "@mui/material/CircularProgress"
import { useTheme } from "@mui/material/styles";

import useCars from "../components/contexts/Cars/useCars.hook";
import CarsList from "../components/CarsList";
// import CarsListContainer from "../components/CarsListContainer";


export default function List() {
  const theme = useTheme();

  const {
    cars,
    fetchCars,
    deleteCar,
    loading,
    error,
    //  refresh,
  } = useCars();

  const deleteHandler = (id) => {
    deleteCar(id);
  };

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  let callStatusComponent = null;

  if(loading) {
    callStatusComponent = (
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <CircularProgress
          sx={{
            "& circle": {
              stroke: theme.palette.info.main,
            },
          }}
          aria-busy
          aria-describedby="#loading"
        />
        <Box id="loading" component="span">
          Loading
        </Box>
      </Box>
    );
  } else if (error) {
    callStatusComponent = (
      <Alert severity="error">
        <Typography>{error}</Typography>
      </Alert>
    );
  } else if (cars.length === 0){
    callStatusComponent = <Typography>No cars to display</Typography>;
  } else {
    callStatusComponent = (
      <CarsList cars={cars} deleteHandler={deleteHandler}  />
    );

    // Uncomment this to see filtering amd searching in action
    // callStatusComponent = (
    //   <CarsListContainer cars={cars} deleteHandler={deleteHandler}  refreshHandler={refresh} ListComponent={CarsList} />
    // );

  }

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Cars
      </Typography>
      {callStatusComponent}
    </>
  )
}