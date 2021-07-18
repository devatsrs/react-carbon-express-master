import React from "react";
import { Field, Formik } from "formik";
import { TextFormField } from "../FormFields";
import * as yup from "yup";

const initialValues = {
  email: "dev@dev2.com",
  password: "",
};

const validate = (values) => {
  let errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!regex.test(values.email)) {
    errors.email = "Invalid Email";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password too short";
  }

  return errors;
};

const submitForm = (values) => {
  console.log(values);
};

const AccountsEdit2 = () => {
  return (
    <Formik
      initialValues={initialValues}
      //validate={validate}
      onSubmit={submitForm}
      validationSchema={yup.object({
        email: yup
          .string()
          .email()
          .min(8, "Must be at least 8 characters")
          .max(20, "Must be less  than 20 characters")
          .required("Username is required"),
        password: yup
          .string()
          .min(8, "Must be at least 8 characters")
          .max(20, "Must be less  than 20 characters")
          .required("Password is required"),
      })}
    >
      {(formik) => {
        return (
          <div className="container">
            <h1>Sign in to continue</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-row">
                <label htmlFor="email">Email</label>

                <Field
                  id="email"
                  name="email"
                  label="Account Name"
                  placeholder="Account Name"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  component={TextFormField}
                />
                <Field
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  component={TextFormField}
                />

                {/* <input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                {errors.email && touched.email && (
                  <span className="error">{errors.email}</span>
                )} */}
              </div>

              {/* <div className="form-row">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                />
                {errors.password && touched.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div> */}

              <button
                type="submit"
                className={
                  !(formik.dirty && formik.isValid) ? "disabled-btn" : ""
                }
                disabled={!(formik.dirty && formik.isValid)}
              >
                Sign In
              </button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default AccountsEdit2;
