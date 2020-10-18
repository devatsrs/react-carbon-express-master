import React from "react";

import
{
  Form,
  FormGroup,
  TextInput,
  Button,
  InlineLoading,
  InlineNotification,
  NotificationActionButton,

} from "carbon-components-react";
import {   withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions, alertActions } from "../../Redux/Actions";

class Login extends React.PureComponent {

  constructor(props) {
    super(props);

    this.props.resetRegistered();
    this.props.clearAlerts();
    this.state = {
      username: "",
      password: "",
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
   // e.preventDefault();
    this.props.clearAlerts();

    
    const { username, password } = this.state;
    
    if (username && password) 
    {
      this.setState({ submitted: true });
    
      this.props
        .login(username, password)
        .then(() => {
          setTimeout(  
            ()=>{

              this.setState({ submitted: false });
                this.props.history.push("/dashboard")
            },1000);
        })
        .catch((error) => {setTimeout(  
          ()=>{

            this.setState({ submitted: false });
           },1000)})
         
          


    }
    

  }

  componentDidMount = () => {};


 

   
  render() {

    const { loggingIn, alert } = this.props;
    const { username, password, submitted } = this.state;

    const user_error_class =
      submitted && !username ? "form-control border-danger" : "form-control";
    const pass_error_class =
      submitted && !password ? "form-control border-danger" : "form-control";

    // const user_error_text =
    //   submitted && !username
    //     ? (<div className="text-danger">Username is required</div>)
    //     : "";
    // const pass_error_text =
    //   submitted && !password
    //     ? (<div className="text-danger">Password is required</div>)
    //     : "";

  return (
    <Form onSubmit={this.handleSubmit}> 
      <h1>Login</h1>


       { (!this.state.submitted && alert.message) && (

                <InlineNotification
                kind={alert.type}
                 iconDescription="describes the close button"
                subtitle={alert.message}
                title="Authentication Error"
                />
 
      )}

      <FormGroup legendText="">
        <TextInput
          helperText="Enter username or email address"
          id="username"
          invalidText="Invalid error message."
          labelText="Username"
          placeholder="Enter Email Address"
          onChange={(e) => {
            this.setState({ username: e.target.value });
          }}

        />
      </FormGroup>
      <FormGroup  legendText="">
        <TextInput.PasswordInput
          cols={ 50 }
          helperText="Enter password"
          id="password"
          invalidText="Invalid error message."
          labelText="Password"
          placeholder="Password"
          rows={ 4 }
          onChange={(e) => {
            this.setState({ password: e.target.value });
          }}

        />
      </FormGroup>



 
        { this.state.submitted || alert.type==='success' ? (
            <div>
             <InlineLoading
              style={{ marginLeft: '1rem' }}
              description={!this.state.submitted?"Submitted!":"Submitting..."}
              status={alert.type==='success' ? 'finished' : 'active'}
              aria-live={!this.state.submitted?"off":"assertive"}
            /></div>
          ) : (
            <Button kind="primary" tabIndex={ 0 } type="submit" onClick={this.handleSubmit} >
            Submit
            </Button> 
              )}

    </Form>
  )};

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
