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
import { accounts_owners, countries, timezones } from "../../helper/faker/accounts";

import { Save16, Close16 } from "@carbon/icons-react";
import { accountService } from "../../Services";


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
  }
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);

    this.load_data();

  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  load_data() {

    accountService.getById(this.state.account_id)
      .then(response => {

        this.setState({
          owner_id: response.data.owner_id,
          name: response.data.name,

        });

      })
  }

  handleSubmit = async (e) => {

    e.preventDefault();
    //    this.props.clearAlerts();

    const { name } = this.state;

    //if (name) {

    await accountService.update(this.state.account_id, {

      name: this.state.name,

    })
      .then(response => {

        // console.log("acc edit");
        // console.log(response);

        return this.props.history.push("/accounts");
      })

    //}
  }

  render(props) {


    return (


      <div>
        <h2>Account Edit</h2>


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

                  onChange={() => { }}
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
                  itemToString={(item) => (item ? item.text : '')}
                  titleText="Timezones"
                  placeholder="Timezones"
                  onChange={() => { }}
                />
              </FormGroup>
            </Column>
            <Column>
              <FormGroup legendText="">
                <ComboBox
                  name="country"
                  id="country"
                  items={countries}
                  itemToString={(item) => (item ? item.text : '')}
                  titleText="Country"
                  placeholder="Country"
                  onChange={() => { }}
                />
              </FormGroup>
            </Column>
          </Row>
          <Row style={{ textAlign: "right" }}>
            <Column>
              <Button kind="primary" type="submit" renderIcon={Save16} onClick={this.handleSubmit}>Save</Button>

              <Button kind="secondary" renderIcon={Close16} onClick={() => { this.props.history.push("/accounts") }}  >Back</Button>
            </Column>
          </Row>
        </Form>
      </div >
    );
  }
};

