import { getIn } from "formik";
import React from "react";
import { FormGroup, TextInput } from "carbon-components-react";

export const Text2FormField = ({ field, form, label, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  console.log(form);
  // console.log(field);
  // console.log(props);
  return (
    <>
      <span>{label}</span>
      <input {...field} {...props} />
      <span>{errorText ? errorText : ""}</span>
    </>
  );
};
