import { ComboBox, FormGroup } from "carbon-components-react";
import { FormikProvider, getIn } from "formik";
import React from "react";

export const SelectFormField = ({
  field,
  form,
  labelText,
  items,
  ...props
}) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  //  console.log(items);
  return (
    <FormGroup legendText="">
      <ComboBox
        labelText={labelText}
        titleText={labelText}
        items={items}
        selectedItem={items[2]}
        itemToString={(item) => (item ? item.text : "")}
        invalid={errorText ? true : false}
        invalidText={errorText}
        {...props}
        {...form}
      />
    </FormGroup>
  );
};
