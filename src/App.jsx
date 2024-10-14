import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";

import { UIProvider } from "./components/contexts/UI/UI.context";
import { CarsProvider } from "./components/contexts/Cars/Cars.context";

import List from "./pages/List";
import AddCar from "./pages/AddCar";
import UpdateCar from "./pages/UpdateCar";
import NotFound from "./pages/NotFound";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import CssBaseline from "@mui/material/CssBaseline";

import Layout from "./components/Layout";



function App() {
  return (
    <>
    <CssBaseline/>
      <Router>
      <ThemeProvider theme={theme}>
      <UIProvider>
      <CarsProvider>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<List />} />
          <Route path="/add" element={<AddCar />} />
          <Route path="/update/:id" element={<UpdateCar />} />
          <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        </CarsProvider>
        </UIProvider>
      </ThemeProvider>
      </Router>
    </>
  );
}

export default App;