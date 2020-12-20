import {
  Modal, Tab, Tabs, TextArea, TextInput, ComboBox,
  FormGroup,
  Checkbox,

} from 'carbon-components-react';
import React from 'react';

import * as acc_faker from "../../helper/faker/accounts";

// const sizes = {
//   Default: '',
//   'Extra small (xs)': 'xs',
//   'Small (sm)': 'sm',
//   'Large (lg)': 'lg',
// };

export const EditModal = (props) => {
  console.log(props);
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

  return (
    <Modal
      open={open}
      hasForm
      size={size || undefined}
      onRequestClose={() => close()}
      selectorPrimaryFocus="#text-input-2"
      primaryButtonText="Save"
      secondaryButtonText="Close"
      modalHeading='ABC Account'
      modalLabel='Account Edit'

    >


      <div
        className={
          tabs().light ? 'container-tabs-story-wrapper--light' : null
        }
        style={{ width: '100%' }}
      >

        <Tabs type="container"   >
          <Tab id="basic" {...tabs()} label="Basic"   >
            <div className="some-content" {...tabs()}  >
              <TextInput
                id="name"
                labelText="Name"
                placeholder="Enter name..."
                style={{ marginBottom: '1rem' }}
              />
              <TextInput
                id="system_name"
                labelText="System Name"
                placeholder="Enter system name..."
                style={{ marginBottom: '1rem' }}

              />
              <TextInput
                id="billing_email"
                labelText="Billing Email"
                placeholder="Enter billing email..."
                style={{ marginBottom: '1rem' }}

              />
              <TextInput
                type="password"
                id="password"
                labelText="Password"
                placeholder="Enter password..."
                style={{ marginBottom: '1rem' }}

              />
              <TextArea
                id="description"
                labelText="Description"
                placeholder="Enter description..."
                style={{ marginBottom: '1rem' }}

              />
            </div>
          </Tab>
          <Tab id="contact" label="Contact" {...tabs()} >
            <div className="some-content" {...tabs()} >
              <TextInput
                id="email"
                labelText="Email"
                placeholder="Enter Email..."
                style={{ marginBottom: '1rem' }}
              />

              <FormGroup legendText="" style={{ marginBottom: '1rem' }}>
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
                labelText="Address"
                placeholder="Enter Address..."
                style={{ marginBottom: '1rem' }}
              />
              <TextInput
                id="phone"
                labelText="phone"
                placeholder="Enter Phone..."
                style={{ marginBottom: '1rem' }}
              />

            </div>
          </Tab>

          <Tab
            id="billing"
            label="Billing" {...tabs()}>
            <div className="some-content" {...tabs()} >
              <FormGroup legendText="" style={{ marginBottom: '1rem' }}>
                <ComboBox
                  name="timezone"
                  id="timezone"
                  items={acc_faker.timezones}
                  itemToString={(item) => (item ? item.text : '')}
                  titleText="Timezones"
                  placeholder="Timezones"
                  onChange={() => { }}
                />
              </FormGroup>

              <FormGroup legendText="" style={{ marginBottom: '1rem' }}>
                <ComboBox
                  name="currency"
                  id="currency"
                  items={acc_faker.currencies}
                  itemToString={(item) => (item ? item.text : '')}
                  titleText="Currency"
                  placeholder="Currency"
                  onChange={() => { }}
                />
              </FormGroup>

              <FormGroup legendText="" style={{ marginBottom: '1rem' }}>
                <legend className="">Account Type (Customer/Vendor)</legend>
                <Checkbox labelText={`Vendor`} id="vendor" />
                <Checkbox labelText={`Customer`} id="customer" />
                <Checkbox labelText={`Reseller`} id="reseller" />
              </FormGroup>

              <FormGroup legendText="" style={{ marginBottom: '1rem' }}>
                <ComboBox
                  name="billing_class"
                  id="billing_class"
                  items={acc_faker.billing_classes}
                  itemToString={(item) => (item ? item.text : '')}
                  titleText="Billing class"
                  placeholder="Billing class"
                  onChange={() => { }}
                />
              </FormGroup>

              <FormGroup legendText="" style={{ marginBottom: '1rem' }}>
                <ComboBox
                  name="billing_account_type"
                  id="billing_account_type"
                  items={acc_faker.billing_account_type}
                  itemToString={(item) => (item ? item.text : '')}
                  titleText="Account Type"
                  placeholder="Account Type"
                  onChange={() => { }}
                />
              </FormGroup>
              <FormGroup legendText="" style={{ marginBottom: '1rem' }}>
                <ComboBox
                  name="billing_cycle"
                  id="billing_cycle"
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

