import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Alert severity="error">
        <Typography variant="h3" component="h1" gutterBottom>Page Not Found</Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Button variant="contained" onClick={() => navigate(-1)}>Go Back</Button>
          <Button variant="contained" onClick={() => navigate('/')}>Go to home page</Button>
        </Box>
      </Alert>
    </>
  );
}

export default NotFound;