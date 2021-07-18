import { Checkbox } from "carbon-components-react";
import { getIn } from "formik";
import React from "react";

export const CheckboxFormField = ({ field, form, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <FormGroup legendText="">
      <Checkbox errorText={!!errorText} {...field} {...props} />
    </FormGroup>
  );
};
