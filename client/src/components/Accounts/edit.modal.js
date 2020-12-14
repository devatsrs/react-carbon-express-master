import { Modal, Tab, Tabs, TextArea, TextInput } from 'carbon-components-react';
import React from 'react';


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

        <Tabs type="container" >
          <Tab id="basic" {...tabs()} label="Basic">
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
                id="text-input-1"
                labelText="Text Input 4"
                placeholder="Enter text..."
                style={{ marginBottom: '1rem' }}
              />
              <TextInput
                id="text-input-2"
                labelText="Text Input 5"
                placeholder="Enter text..."
              />
            </div>
          </Tab>

          <Tab
            id="billing"
            label="Billing" {...tabs()}>
            <div className="some-content" {...tabs()} >
              <TextInput
                id="text-input-1"
                labelText="Text Input 6"
                placeholder="Enter text..."
                style={{ marginBottom: '1rem' }}
              />
              <TextInput
                id="text-input-2"
                labelText="Text Input 7"
                placeholder="Enter text..."
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    </Modal>
  );
};

