import { ComboBox, FormGroup } from "carbon-components-react";
import { getIn } from "formik";
import React from "react";

export const SelectFormField = ({ field, form, label, options, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <FormGroup legendText="">
      <ComboBox
        {...field}
        {...props}
        titleText={label}
        items={options}
        itemToString={(item) => (item ? item.text : "")}
        errorText={errorText}
      />
    </FormGroup>
  );
};
