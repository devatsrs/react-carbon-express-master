import { FormikProvider, getIn } from "formik";
import React from "react";
import { FormGroup, TextInput } from "carbon-components-react";

export const PasswordFormField = ({ field, form, labelText, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  // console.log(field);
  // console.log(props);
  // console.log(form);

  return (
    <FormGroup legendText="">
      <TextInput.PasswordInput
        invalid={errorText ? true : false}
        invalidText={errorText}
        labelText={labelText}
        {...props}
        {...field}
      />
    </FormGroup>
  );
};
