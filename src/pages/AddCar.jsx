import Typography  from "@mui/material/Typography"
import CarForm from "../components/forms/CarForm"

import useCars from "../components/contexts/Cars/useCars.hook";

export default function AddCar() {

  // const navigate = useNavigate();

const { addCar } = useCars();

// Handler
const submitHandler = (data) => {
  addCar(data);
  // navigate('/');
};

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Add Car
      </Typography>
      <CarForm submitHandler={submitHandler} />
    </>
  )
}