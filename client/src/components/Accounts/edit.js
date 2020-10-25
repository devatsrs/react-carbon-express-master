import {
  Button,
  Column,
  ComboBox,
  Dropdown,
  Form,
  FormGroup,
  FormLabel,
  MultiSelect,
  Row,
  Switcher,
  TextInput,
} from "carbon-components-react";
import React, { Component } from "react";
import { accounts_owners, countries, timezones } from "../../helper/faker/accounts";
import Select from 'react-select';
import { Save16, Close16 } from "@carbon/icons-react";


export default class AccountsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }



  escFunction = (event) => {
    if (event.keyCode === 27) {
      return this.props.history.push("/accounts");
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }



  render(props) {

    // const timezones = [
    //   { value: 'india', label: 'GMT5.30+' },
    //   { value: 'GMT', label: 'GMT5.0+' }
    // ];

    // const countries = [
    //   { value: 'india', label: 'India' },
    //   { value: 'us', label: 'USA' }
    // ];
    // const countries2 = [
    //   { id: 'india', text: 'India' },
    //   { id: 'us', text: 'USA' }
    // ];

    const listBoxMenuIconTranslationIds =
    {
      'close.menu': 'Close menu',
      'open.menu': 'Open menu',
      'clear.all': 'Clear all',
      'clear.selection': 'Clear selection',
    };
    const selectionFeedback = ['top', 'fixed', 'top-after-reopen'];

    return (


      <div  >
        <h2>Account Edit</h2>


        <Form onSubmit={() => { }}>
          <Row>
            <Column>
              <FormGroup legendText="">
                <ComboBox
                  ariaLabel="Owner"
                  id="owner"
                  items={accounts_owners}
                  label="Select an Owner"
                  titleText="Select an Owner"
                  itemToString={(item) => (item ? item.text : "")}
                />


              </FormGroup>
            </Column>
            <Column>
              <FormGroup legendText="">
                <TextInput
                  id="FullName"
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
                  id="accountName"
                  invalidText="Invalid error message."
                  labelText="Account Name"
                  placeholder="Account Name"
                  rows={4}
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
                />
              </FormGroup>
            </Column>
          </Row>
          <Row style={{ textAlign: "right" }}>
            <Column>
              <Button kind="primary" renderIcon={Save16}>Save</Button>

              <Button kind="secondary" renderIcon={Close16} onClick={() => { this.props.history.push("/accounts") }}  >Back</Button>
            </Column>
          </Row>
        </Form>
      </div>
    );
  }
};

