/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

// HERE
import { CARS_API_ENDPOINT, STORAGE_KEY } from "./settings";

import useUI from "../UI/useUI.hook";

export const CarsContext = createContext({
  fetchCars: () => [],
  addCar: () => {},
  updateCar: () => {},
  deleteCar: () => {},
  loaded: false,
  loading: false,
  error: null,
  cars: [],
  refresh: () => {}
});

export const CarsProvider = (props) => {
    const {
      snackbar: { showErrorMessage, showSuccessMessage },
    } = useUI();

    const [cars, setCars] = useState(() => {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    });
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    // const [search, setSearch] = useState("");

    const refresh = () => setLoaded(false);

    const fetchCars = async () => {
      // console.log('loading', loading);
      // console.log('error', error);
      if (loading || loaded || error) {
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(CARS_API_ENDPOINT);
        if (response.status !== 200) {
          throw response;
        }
        const data = await response.json();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setCars(data);

        // setLoading(false);
        // console.log('cars from context', cars);
      } catch (err) {
        setError(err.message || err.statusText);
      } finally {
        setLoaded(true);
        setLoading(false);
      }
    };

    const addCar = async (dataFromForm) => {
      console.log("about to add", dataFromForm);
      const newCarName = dataFromForm.name;
      try {
        const response = await fetch(CARS_API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(dataFromForm),
        });
        if (response.status !== 201) {
          throw response;
        }
        const savedCar = await response.json();
        console.log("got data", savedCar);
        const newCars = [...cars, savedCar];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newCars));
        setCars(newCars);
        showSuccessMessage({
          message: `Saved ${savedCar.name}`,
        });
      } catch (err) {
        console.log(err);
        showErrorMessage({
          message: `Could not create: ${newCarName || 'car'}

${
            err.statusText || err.message
          }`,
        });
      }
    };

    const updateCar = async (id, dataFromForm) => {
      console.log("updating", id, dataFromForm);
      let updatedCar = null;
      // Get index
      const index = cars.findIndex((car) => car._id === id);
      console.log(index);
      if (index === -1) throw new Error(`Car with index ${id} not found`);
      // Get actual car
      const oldCar = cars[index];
      console.log("oldCar", oldCar);

      // Send the differences, not the whole update
      const updates = {};

      for (const key of Object.keys(oldCar)) {
        if (key === "_id") continue;
        if (oldCar[key] !== dataFromForm[key]) {
          updates[key] = dataFromForm[key];
        }
      }

      try {
        const response = await fetch(`${CARS_API_ENDPOINT}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(updates),
        });

        if (response.status !== 200) {
          throw response;
        }

        // Merge with dataFromForm
        updatedCar = {
          ...oldCar,
          ...dataFromForm, // order here is important for the override!!
        };
        console.log("updatedCar", updatedCar);
        // recreate the cars array
        const updatedCars = [
          ...cars.slice(0, index),
          updatedCar,
          ...cars.slice(index + 1),
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
        setCars(updatedCars);
        showSuccessMessage({
          message: `Updated ${updatedCar.name}`,
        });
      } catch (err) {
        console.log(err);
        showErrorMessage({
          message: `Error updating ${oldCar.name}:

${
            err.statusText || err.message
          }`,
        });
      }
    };

    const deleteCar = async (id) => {
      // Get index
      const index = cars.findIndex((car) => car._id === id);
      const deletedCar = cars[index];

      try {
        const response = await fetch(`${CARS_API_ENDPOINT}/${id}`, {
          method: "DELETE",
        });
        if (response.status !== 204) {
          throw response;
        }

        // recreate the cars array without that car
        const updatedCars = [...cars.slice(0, index), ...cars.slice(index + 1)];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
        setCars(updatedCars);
        console.log(`Deleted ${deletedCar.name}`);
        // addToast(, {
        //   appearance: "success",
        // });
        showSuccessMessage({
          message: `Deleted ${deletedCar.name}`,
        });
      } catch (err) {
        console.log(err);
        // addToast(, {
        //   appearance: "error",
        // });
        showErrorMessage({
          message: `Error: Failed to delete ${deletedCar.name}:

${
            err.statusText || err.message
          }`,
        });
      }
    };

    return (
      <CarsContext.Provider
        value={{
          cars,
          loading,
          error,
          fetchCars,
          addCar,
          updateCar,
          deleteCar,
          refresh,
        }}
      >
        {props.children}
      </CarsContext.Provider>
    );
  };