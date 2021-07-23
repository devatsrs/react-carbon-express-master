import React from "react";

import {
  Form,
  FormGroup,
  TextInput,
  Button,
  InlineLoading,
  InlineNotification,

} from "carbon-components-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions, alertActions } from "../../Redux/Actions";

class Register extends React.PureComponent {

  constructor(props) {
    super(props);

    this.props.resetRegistered();
    this.props.clearAlerts();
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      submitted: false,
    };

  }

  handleSubmit = async (e) => {

    e.preventDefault();
    this.props.clearAlerts();

    const { firstname, lastname, username, password } = this.state;

    if (firstname && lastname &&  username && password) {

      await this.setState({ submitted: true });

      await this.props
        .register(username, password)
        .then(() => {
          //this.setState({ submitted: false });
          this.props.history.push("/login")
        })
        .catch((error) => {
          this.setState({ submitted: false });
        })
    }
  }

  componentDidMount = () => { };
  componentWillUnmount = () => {
    this.props.clearAlerts();
  };





  render() {

    const { alert } = this.props;
    const { username, password, submitted } = this.state;


    const user_error_props = (submitted && !username)
      ? {
        invalid: true,
        invalidText:
          'Username is required.',
      } : "";

    const pass_error_props = (submitted && !password)
      ? {
        invalid: true,
        invalidText:
          'Password is required.',
      } : "";




    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Register</h1>


        { (!submitted && alert.message) && (

          <InlineNotification
            kind={alert.type}
            iconDescription="describes the close button"
            subtitle={alert.message}
            title="Authentication Error"
          />

        )}

        <FormGroup legendText="">
          <TextInput
            helperText="Enter your first name"
            id="firstname"
            // invalidText="Username is required."
            labelText="Firstname"
            placeholder="Enter first name"
            onChange={(e) => {
              this.setState({ firstname: e.target.value });
            }}
            required
            {...user_error_props}

          />
        </FormGroup>
        <FormGroup legendText="">
          <TextInput
            helperText="Enter lastname or email address"
            id="lastname"
            // invalidText="lastname is required."
            labelText="Lastname"
            placeholder="Enter your lastname"
            onChange={(e) => {
              this.setState({ lastname: e.target.value });
            }}
            required
            {...user_error_props}

          />
        </FormGroup>
        <FormGroup legendText="">
          <TextInput
            helperText="Enter username or email address"
            id="username"
            // invalidText="Username is required."
            labelText="Username"
            placeholder="Enter Email Address"
            onChange={(e) => {
              this.setState({ username: e.target.value });
            }}
            required
            {...user_error_props}

          />
        </FormGroup>
        <FormGroup legendText="">
          <TextInput.PasswordInput
            cols={50}
            helperText="Enter password"
            id="password"
            // invalidText="Invalid error message."
            labelText="Password"
            placeholder="Password"
            rows={4}
            onChange={(e) => {
              this.setState({ password: e.target.value });
            }}
            required
            {...pass_error_props}

          />
        </FormGroup>




        { submitted || alert.type === 'success' ? (
          <div>
            <InlineLoading
              style={{ marginLeft: '1rem' }}
              description={!submitted ? "Submitted!" : "Submitting..."}
              status={alert.type === 'success' ? 'finished' : 'active'}
              aria-live={!submitted ? "off" : "assertive"}
            /></div>
        ) : (
            <Button kind="primary" tabIndex={0} type="submit" onClick={this.handleSubmit} >
              Submit
            </Button>
          )}

      </Form>
    )
  };

}


function mapState(state) {
  const { loggingIn, loggedIn } = state.authentication;

  const { alert } = state;

  return { loggingIn, loggedIn, alert };
}
const mapAction = {
  login: userActions.login,

  user_logout: userActions.user_logout,

  clearAlerts: alertActions.clear,

  resetRegistered: userActions.resetRegistered,
};

export default withRouter(connect(mapState, mapAction)(Login));
