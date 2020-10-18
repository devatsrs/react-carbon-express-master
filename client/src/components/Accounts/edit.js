import
{
  Column,
  Dropdown,
  Form,
  FormGroup,
  FormLabel,
  Row,
  TextInput,
} from "carbon-components-react";
import React, { Component } from "react";
import { accounts_owners } from "../../helper/faker/accounts";
import Select from 'react-select';


export default class AccountsEdit extends Component
{
  constructor( props )
  {
    super( props );
    this.state = {
    };
  }



  escFunction = ( event ) =>
  {
    if( event.keyCode === 27 )
    {
      return this.props.history.push( "/accounts" );
    }
  }
  componentDidMount ()
  {
    document.addEventListener( "keydown", this.escFunction, false );
  }
  componentWillUnmount ()
  {
    document.removeEventListener( "keydown", this.escFunction, false );
  }



  render ( props )
  {

    const timezones = [
      { value: 'india', label: 'GMT5.30+' },
      { value: 'GMT', label: 'GMT5.0+' }
    ];

    const countries = [
      { value: 'india', label: 'India' },
      { value: 'us', label: 'USA' }
    ];


    return (


      <div  >
        <h2>Account Edit</h2>
        <Form onSubmit={ () => { } }>
          <Row>
            <Column>
              <FormGroup legendText="">
                <Dropdown
                  ariaLabel="Owner"
                  id="owner"
                  items={ accounts_owners }
                  label="Select an Owner"
                  titleText="Select an Owner"
                  itemToString={ ( item ) => ( item ? item.text : "" ) }
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
                  rows={ 4 }
                />
              </FormGroup>
            </Column>
          </Row>
          <Row>
            <Column>
              <FormGroup legendText="">
                <TextInput
                  id="accountName"
                  invalidText="Invalid error message."
                  labelText="Account Name"
                  placeholder="Account Name"
                  rows={ 4 }
                />
              </FormGroup>
            </Column>
            <Column>
              <FormGroup legendText="">
                <TextInput
                  id="accountNumber"
                  invalidText="Invalid error message."
                  labelText="Gateway Account Number"
                  placeholder="Account Number"
                  rows={ 4 }
                />
              </FormGroup>
            </Column>
          </Row>
          <Row>
            <Column>
              <FormGroup legendText="">
                <TextInput
                  id="Email"
                  invalidText="Invalid error message."
                  labelText="Email"
                  placeholder="Email"
                  rows={ 4 }
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
                  rows={ 4 }
                />
              </FormGroup>
            </Column>
          </Row>
          <Row>
            <Column>
              <FormGroup legendText="">
                <FormLabel htmlFor="timezone">Timezone</FormLabel>
                <Select
                  label="Timezone"
                  name="timezone"
                  options={ timezones }
                  theme={ theme => ( {
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: 'neutral20',
                      primary: 'black',
                    },
                  } ) }

                />
              </FormGroup>
            </Column>
            <Column>
              <FormGroup legendText="">
                <FormLabel htmlFor="timezone">Country</FormLabel>

                <Select

                  name="country"
                  options={ countries }
                  theme={ theme => ( {
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: 'neutral20',
                      primary: 'black',
                    },
                  } ) }

                />
              </FormGroup>
            </Column>
          </Row>
        </Form>
      </div>
    );
  }
};

