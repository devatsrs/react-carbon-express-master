import { Button, Column, Row } from "carbon-components-react";
import React, { Component } from "react";
import {
  accounts_owners,
  countries,
  timezones,
} from "../../helper/faker/accounts";

import { Save16, Close16 } from "@carbon/icons-react";
import { accountService } from "../../Services";
import { Field, Formik, Form as FForm } from "formik";
import { TextFormField, SelectFormField } from "../FormFields";
import * as yup from "yup";
import { useEffect } from "react";

const validationSchema = yup.object({
  name: yup.string().min(3).required(),
});

export default class AccountsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account_id: props.match.params.id,
      owner_id: "",
      name: "",
    };
  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      return this.props.history.push("/accounts");
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);

    this.load_data();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  load_data() {
    accountService.getById(this.state.account_id).then((response) => {
      this.setState({
        owner_id: response.data.owner_id,
        name: response.data.name,
      });

      // Formik.field.name = response.data.name;
    });
  }

  handleSubmit = async (e) => {
    //e.preventDefault();
    //    this.props.clearAlerts();

    const { name } = this.state;

    //if (name) {

    await accountService
      .update(this.state.account_id, {
        name: this.state.name,
      })
      .then((response) => {
        // console.log("acc edit");
        // console.log(response);

        return this.props.history.push("/accounts");
      });

    //}
  };

  render(props) {
    const { name } = this.state;
    const _name = name;
    console.log(name);

    const initialValues = {
      name: "",
    };

    return (
      <div>
        <h2>Account Edit</h2>

        <Formik
          validationSchema={yup.object({
            name: yup
              .string()
              .min(8, "Must be at least 8 characters")
              .max(20, "Must be less  than 20 characters")
              .required("Username is required"),
          })}
          initialValues={this.state}
          onSubmit={(e) => {
            this.setState(e);
            console.log(e);
            this.handleSubmit(e);
          }}
        >
          {(formik) => {
            useEffect(() => {
              //auto fill value
              accountService.getById(this.state.account_id).then((response) => {
                // formik.setFieldValue("name", response.data.name);
                const fields = Object.keys(response.data);

                console.log("fields");
                console.log(fields);
                fields.forEach((field) => {
                  formik.setFieldValue(field, response.data[field], false);
                });
              });
            }, []);

            return (
              <FForm>
                <Row>
                  <Column>
                    <Field
                      labelText="Owner"
                      name="owner"
                      id="owner"
                      placeholder="Select an Owner"
                      items={accounts_owners}
                      selectedItem={accounts_owners[2]}
                      onChange={() => {}}
                      component={SelectFormField}
                    />
                  </Column>
                  <Column>
                    <Field
                      labelText="Full Name"
                      name="full_name"
                      id="full_name"
                      placeholder="Full Name"
                      rows={4}
                      component={TextFormField}
                    />
                  </Column>
                  <Column>
                    <Field
                      id="name"
                      name="name"
                      labelText="Account Name"
                      placeholder="Account Name"
                      rows={4}
                      value={this.state.name}
                      onChange={(e) => {
                        this.setState({ name: e.target.value });
                      }}
                      component={TextFormField}
                    />
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <Field
                      id="accountNumber"
                      name="accountNumber"
                      labelText="Gateway Account Number"
                      placeholder="Account Number"
                      rows={4}
                      component={TextFormField}
                    />
                  </Column>
                  <Column>
                    <Field
                      id="email"
                      name="email"
                      labelText="Email"
                      placeholder="Email"
                      rows={4}
                      component={TextFormField}
                    />
                  </Column>
                  <Column>
                    <Field
                      id="billing_bmail"
                      name="billing_email"
                      labelText="Billing Email"
                      placeholder="Billing Email"
                      rows={4}
                      component={TextFormField}
                    />
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <Field
                      component={SelectFormField}
                      name="timezone"
                      id="timezone"
                      items={timezones}
                      titleText="Timezones"
                      placeholder="Timezones"
                      onChange={() => {}}
                    />
                  </Column>
                  <Column>
                    <Field
                      component={SelectFormField}
                      name="country"
                      id="country"
                      items={countries}
                      titleText="Country"
                      placeholder="Country"
                      onChange={() => {}}
                    />
                  </Column>
                </Row>
                <Row style={{ textAlign: "right" }}>
                  <Column>
                    <Button kind="primary" type="submit" renderIcon={Save16}>
                      Save
                    </Button>
                    <Button
                      kind="secondary"
                      renderIcon={Close16}
                      onClick={() => {
                        this.props.history.push("/accounts");
                      }}
                    >
                      Cancel
                    </Button>
                  </Column>
                </Row>
              </FForm>
            );
          }}
        </Formik>
      </div>
    );
  }
}
