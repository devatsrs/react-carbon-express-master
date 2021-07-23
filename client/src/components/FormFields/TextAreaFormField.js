import { FormGroup, TextArea } from "carbon-components-react";
import { getIn } from "formik";
import React from "react";

export const TextAreaFormField = ({ field, form, labelText, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <FormGroup legendText="">
      <TextArea error={!!errorText} {...field} {...props} />
    </FormGroup>
  );
};
