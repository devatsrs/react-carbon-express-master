import {
  Button,
  Column,
  ComboBox,
  Form,
  FormGroup,
  Row,
  TextInput,
} from "carbon-components-react";
import React, { Component } from "react";
import {
  accounts_owners,
  countries,
  timezones,
} from "../../helper/faker/accounts";

import { Save16, Close16 } from "@carbon/icons-react";
import { accountService } from "../../Services";
import { Field, Formik, Form as FForm } from "formik";
import {
  TextFormField,
  TextAreaFormField,
  SelectFormField,
  Text2FormField,
} from "../FormFields";
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
    e.preventDefault();
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
          onSubmit={() => {
            console.log(this.state);
          }}
        >
          {(formik) => {
            useEffect(() => {
              accountService.getById(this.state.account_id).then((response) => {
                // formik.setFieldValue("name", response.data.name);
                const fields = Object.keys(response.data);

                console.log("fields");
                console.log(fields);
                fields.forEach((field) => {
                  formik.setFieldValue(field, response.data[field], false);
                });
                // this.setState({
                //   owner_id: response.data.owner_id,
                //   name: response.data.name,
                // });
              });
            }, []);

            return (
              <FForm>
                <Field
                  id="name"
                  name="name"
                  label="Account Name"
                  placeholder="Account Name"
                  value={formik.values.name}
                  component={TextFormField}
                  onChange={formik.handleChange}
                />

                <button type="submit">Submit</button>
              </FForm>
            );
          }}
        </Formik>

        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Column>
              <FormGroup legendText="">
                <ComboBox
                  name="owner"
                  ariaLabel="Owner"
                  id="owner"
                  items={accounts_owners}
                  label="Select an Owner"
                  itemToString={(item) => (item ? item.text : "")}
                  selectedItem={accounts_owners[2]}
                  placeholder="Select an Owner"
                  titleText="Owner"
                  onChange={() => {}}
                />
              </FormGroup>
            </Column>
            <Column>
              <FormGroup legendText="">
                <TextInput
                  id="full_name"
                  invalidText="Invalid error message."
                  labelText="Full Name"
                  placeholder="Full Name"
                  rows={4}
                />
              </FormGroup>
            </Column>

            <Column>
              <FormGroup legendText="">
                <TextInput
                  id="name"
                  invalidText="Invalid error message."
                  labelText="Account Name"
                  placeholder="Account Name"
                  rows={4}
                  value={this.state.name}
                  onChange={(e) => {
                    this.setState({ name: e.target.value });
                  }}
                />
              </FormGroup>
            </Column>
          </Row>
          <Row>
            <Column>
              <FormGroup legendText="">
                <TextInput
                  id="accountNumber"
                  invalidText="Invalid error message."
                  labelText="Gateway Account Number"
                  placeholder="Account Number"
                  rows={4}
                />
              </FormGroup>
            </Column>

            <Column>
              <FormGroup legendText="">
                <TextInput
                  id="Email"
                  invalidText="Invalid error message."
                  labelText="Email"
                  placeholder="Email"
                  rows={4}
                />
              </FormGroup>
            </Column>
            <Column>
              <FormGroup legendText="">
                <TextInput
                  id="BillingEmail"
                  invalidText="Invalid error message."
                  labelText="Billing Email"
                  placeholder="Billing Email"
                  rows={4}
                />
              </FormGroup>
            </Column>
          </Row>
          <Row>
            <Column>
              <FormGroup legendText="">
                <ComboBox
                  name="timezone"
                  id="timezone"
                  items={timezones}
                  itemToString={(item) => (item ? item.text : "")}
                  titleText="Timezones"
                  placeholder="Timezones"
                  onChange={() => {}}
                />
              </FormGroup>
            </Column>
            <Column>
              <FormGroup legendText="">
                <ComboBox
                  name="country"
                  id="country"
                  items={countries}
                  itemToString={(item) => (item ? item.text : "")}
                  titleText="Country"
                  placeholder="Country"
                  onChange={() => {}}
                />
              </FormGroup>
            </Column>
          </Row>
          <Row style={{ textAlign: "right" }}>
            <Column>
              <Button
                kind="primary"
                type="submit"
                renderIcon={Save16}
                onClick={this.handleSubmit}
              >
                Save
              </Button>

              <Button
                kind="secondary"
                renderIcon={Close16}
                onClick={() => {
                  this.props.history.push("/accounts");
                }}
              >
                Back
              </Button>
            </Column>
          </Row>
        </Form>
      </div>
    );
  }
}
