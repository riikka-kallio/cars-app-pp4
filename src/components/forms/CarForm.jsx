/* eslint-disable react/prop-types, no-unused-vars */
import { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import FormRow from "./FormRow";

const defaultValues = {
    name: '',
    bhp: '',
    avatar_url: '',
  };

  const schema = yup
  .object()
  .shape({
    name: yup.string().max(30).required(),
    bhp: yup.number().integer().positive().max(5000).required(),
    avatar_url: yup.string().url(),
  })
  .required();


function CarForm({ car, submitHandler = (data) => console.log(data) }) {

    const {
        handleSubmit,
        formState: { errors, isValid, isDirty, isSubmitting },
        reset,
        control,
        formState,
      } = useForm({
        resolver: yupResolver(schema), // Need to add
        mode: "onChange",
        defaultValues: car || defaultValues,
      });
      
      // This is for debug purposes so you can watch the form state
      useEffect(() => {
        console.log("formState", formState);
        console.log("errors", errors);
      });
      
      const submitHandlerWithReset = (vals) => {
        if (car) {
          submitHandler(car._id, vals); // updating
        } else {
          submitHandler(vals); // creating
          reset();
        }
      };


  return (
    <FormContainer defaultValues={defaultValues} onSuccess={handleSubmit(submitHandlerWithReset)}>
  <FormRow>
    <TextFieldElement control={control} fullWidth name="name" label="Name" required />
  </FormRow>
  <FormRow>
    <TextFieldElement control={control} fullWidth name="bhp" label="BHP" required />
  </FormRow>
  <FormRow>
    <TextFieldElement control={control} fullWidth name="avatar_url" label="Avatar URL" />
  </FormRow>

  <FormRow halign="end">
    <Button
      type="reset"
      onClick={() => reset()}
      variant="contained"
      disabled={!isDirty}
    >
      Reset
    </Button>
    <Button
      type="submit"
      primary="true"
      variant="contained"
      disabled={isSubmitting || !isDirty || (isDirty && !isValid)}
    >
      Submit
    </Button>
  </FormRow>
</FormContainer>
  );
}

export default CarForm;