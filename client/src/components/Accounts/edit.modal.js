import {
  Modal, Tab, Tabs, TextArea, TextInput, ComboBox,
  FormGroup,
  Checkbox,

} from 'carbon-components-react';
import React, { useState } from 'react';

import * as acc_faker from "../../helper/faker/accounts";

import { accountService } from "../../Services/Account";

// const sizes = {
//   Default: '',
//   'Extra small (xs)': 'xs',
//   'Small (sm)': 'sm',
//   'Large (lg)': 'lg',
// };

export const EditModal = (props) => {

  console.log("props-data");
  console.log(props.data);

  var form_fields = {
    name: '',
    system_name: '',
    billing_email: '',
    password: '',
    description: '',
    email: '',
    country: '',
    address: '',
    phone: '',
    timezone: '',
    is_reseller: '',
    is_customer: '',
    is_reseller: '',
    billing_class: '',
    billing_account_type: '',
    billing_cycle: '',
  };
  const [form, setState] = useState(form_fields);
  const [name_, setnameState] = useState("");


  //console.log(props);
  const { size, open, close } = props;

  const tabs = () => ({
    // className: 'some-class',
    // light: false,
    // selected: 0,
    // tabContentClassName: "some-content",
    // selectionMode: "selectionModes",
    // onSelectionChange: () => { }
    // ,
  });

  var modalLabel = "Edit Account";
  var modalLabel2 = "ABC Account";

  function handleOnChange(e) {
    const { value, name } = e.target
    setState({ [name]: value });
  }

  function handleSubmit(e) {

    e.preventDefault();

    console.log(name_);
    console.log(form);


    var id = props.data.id;
    accountService.update(id, { name: form.name })
      .then((result) => {

        console.log("result");
        console.log(result);
        console.log("success");

      })
      .catch((error) => {
        console.log("error");
        console.log(e);
      })

    // if (  && password) {

    //   await this.setState({ submitted: true });

    //   await this.props
    //     .login(username, password)
    //     .then(() => {
    //       //this.setState({ submitted: false });
    //       this.props.history.push("/dashboard")
    //     })
    //     .catch((error) => {
    //       this.setState({ submitted: false });
    //     })
    // }
  }

  return (
    <Modal
      aria-label={modalLabel}
      open={open}
      hasForm={true}
      size={size || undefined}
      onRequestClose={() => close()}
      selectorPrimaryFocus="#text-input-2"
      primaryButtonText="Save"
      secondaryButtonText="Close"
      modalHeading={modalLabel2}
      modalLabel={modalLabel}
      shouldSubmitOnEnter={false}
      hasScrollingContent={true}
      onRequestSubmit={(e) => { handleSubmit(e) }}
      onSecondarySubmit={() => { }}
    >
      <div
        className={
          tabs().light ? 'container-tabs-story-wrapper--light' : null
        }
      >
        <Tabs type="container">
          <Tab id="basic" {...tabs()} label="Basic">
            <div className="some-content" {...tabs()}>
              <FormGroup legendText="">
                <TextInput
                  id="name"
                  name="name"
                  labelText="Name"
                  placeholder="Enter name..."
                  helperText="This is systems account name, can be used to map with gateway"
                  value={props.data.name}
                  onChange={(e) => handleOnChange(e)}
                /*console.log(e.target.value)*/
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  id="system_name"
                  name="system_name"
                  labelText="System Name"
                  placeholder="Enter system name..."
                  value={form.system_name}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  id="billing_email"
                  name="billing_email"
                  labelText="Billing Email"
                  placeholder="Enter billing email..."


                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  type="password"
                  id="password"
                  name="password"
                  labelText="Password"
                  placeholder="Enter password..."


                />
              </FormGroup>
              <FormGroup legendText="">
                <TextArea
                  id="description"
                  name="description"
                  labelText="Description"
                  placeholder="Enter description..."
                />
              </FormGroup>
            </div>
          </Tab>
          <Tab id="contact" label="Contact" {...tabs()} >
            <div className="some-content" {...tabs()} >
              <TextInput
                id="email"
                name="email"
                labelText="Email"
                placeholder="Enter Email..."

              />

              <FormGroup legendText="" >
                <ComboBox
                  name="country"
                  id="country"
                  items={acc_faker.countries}
                  itemToString={(item) => (item ? item.text : '')}
                  titleText="Country"
                  placeholder="Country"
                  onChange={() => { }}
                />
              </FormGroup>

              <TextArea
                id="address"
                name="address"
                labelText="Address"
                placeholder="Enter Address..."

              />
              <TextInput
                id="phone"
                name="phone"
                labelText="phone"
                placeholder="Enter Phone..."

              />

            </div>
          </Tab>

          <Tab
            id="billing"
            label="Billing" {...tabs()}>
            <div className="some-content" {...tabs()} >
              <FormGroup legendText="" >
                <ComboBox
                  id="timezone"
                  name="timezone"
                  items={acc_faker.timezones}
                  itemToString={(item) => (item ? item.text : '')}
                  titleText="Timezones"
                  placeholder="Timezones"
                  onChange={() => { }}
                />
              </FormGroup>

              <FormGroup legendText="" >
                <ComboBox
                  id="currency"
                  name="currency"
                  items={acc_faker.currencies}
                  itemToString={(item) => (item ? item.text : '')}
                  titleText="Currency"
                  placeholder="Currency"
                  onChange={() => { }}
                />
              </FormGroup>

              <FormGroup legendText="" >
                <legend className="">Account Type (Customer/Vendor)</legend>
                <Checkbox labelText={`Vendor`} id="is_vendor" name="is_vendor" />
                <Checkbox labelText={`Customer`} id="is_customer" name="is_customer" />
                <Checkbox labelText={`Reseller`} id="is_reseller" name="is_reseller" />
              </FormGroup>

              <FormGroup legendText="" >
                <ComboBox
                  id="billing_class"
                  name="billing_class"
                  items={acc_faker.billing_classes}
                  itemToString={(item) => (item ? item.text : '')}
                  titleText="Billing class"
                  placeholder="Billing class"
                  onChange={() => { }}
                />
              </FormGroup>

              <FormGroup legendText="" >
                <ComboBox
                  id="billing_account_type"
                  name="billing_account_type"
                  items={acc_faker.billing_account_type}
                  itemToString={(item) => (item ? item.text : '')}
                  titleText="Account Type"
                  placeholder="Account Type"
                  onChange={() => { }}
                />
              </FormGroup>
              <FormGroup legendText="" >
                <ComboBox
                  id="billing_cycle"
                  name="billing_cycle"
                  items={acc_faker.billing_cycle}
                  itemToString={(item) => (item ? item.text : '')}
                  titleText="Billing Cycle"
                  placeholder="Account Cycle"
                  onChange={() => { }}
                />
              </FormGroup>

            </div>
          </Tab>
        </Tabs>
      </div>
    </Modal>
  );
};

