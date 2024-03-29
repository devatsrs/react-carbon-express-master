import React, { useState } from "react";

import { Button, InlineLoading } from "carbon-components-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions, alertActions } from "../../Redux/Actions";
import { Field, Formik, Form as FForm } from "formik";
import { TextFormField, PasswordFormField } from "../FormFields";
import * as yup from "yup";
import { useEffect } from "react";
import { useRef } from "react";

function Login(props) {
  const formRef = React.forwardRef();

  useEffect(() => {
    if (formRef.current) {
      formRef.current.focus();
    }
  }, []);

  // useEffect(() => {
  //   if (UsernameRef !== null && UsernameRef.current !== null) {
  //     UsernameRef.current.focus();
  //   }
  // }, []);
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={yup.object({
        username: yup.string().email().required("Username is required"),
        password: yup
          .string()
          .min(8, "Must be at least 8 characters")
          .required("Password is required"),
      })}
      onSubmit={async (e) => {
        props.clearAlerts();

        console.log(e);
        //        this.handleSubmit(e);
        await props.login(e.username, e.password).then(() => {
          //this.setState({ submitted: false });
          props.history.push("/dashboard");
        });
      }}
      //innerRef={formRef}
    >
      {(formik) => {
        // console.log("UsernameRef.current " + UsernameRef.current);
        // if (UsernameRef.current) {
        //   UsernameRef.current.focus();
        // }

        return (
          <FForm>
            <h1>Login</h1>
            <Field
              ref={(el) => (this.formRef = el)}
              id="username"
              name="username"
              labelText="Username"
              placeholder="Enter username or email address"
              component={TextFormField}
            />
            <Field
              id="password"
              name="password"
              labelText="Password"
              placeholder="Enter password"
              component={PasswordFormField}
            />
            {formik.isSubmitting || props.alert.type === "success" ? (
              <div>
                <InlineLoading
                  style={{ marginLeft: "1rem" }}
                  description={
                    !formik.isSubmitting ? "Submitted!" : "Submitting..."
                  }
                  status={alert.type === "success" ? "finished" : "active"}
                  aria-live={!formik.isSubmitting ? "off" : "assertive"}
                />
              </div>
            ) : (
              <Button kind="primary" type="submit">
                Submit
              </Button>
            )}
          </FForm>
        );
      }}
    </Formik>
  );
}
function mapStateToProps(state) {
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

export default withRouter(connect(mapStateToProps, mapAction)(Login));

//
/*
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
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.clearAlerts();

    const { username, password } = this.state;

    if (username && password) {
      await this.setState({ submitted: true });

      await this.props
        .login(username, password)
        .then(() => {
          //this.setState({ submitted: false });
          this.props.history.push("/dashboard");
        })
        .catch((error) => {
          this.setState({ submitted: false });
        });
    }
  };

  componentDidMount = () => {};
  componentWillUnmount = () => {
    this.props.clearAlerts();
  };

  render() {
    const { alert } = this.props;
    const { username, password, submitted } = this.state;

    const user_error_props =
      submitted && !username
        ? {
            invalid: true,
            invalidText: "Username is required.",
          }
        : "";

    const pass_error_props =
      submitted && !password
        ? {
            invalid: true,
            invalidText: "Password is required.",
          }
        : "";

    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Login</h1>

        {!submitted && alert.message && (
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

        {submitted || alert.type === "success" ? (
          <div>
            <InlineLoading
              style={{ marginLeft: "1rem" }}
              description={!submitted ? "Submitted!" : "Submitting..."}
              status={alert.type === "success" ? "finished" : "active"}
              aria-live={!submitted ? "off" : "assertive"}
            />
          </div>
        ) : (
          <Button
            kind="primary"
            tabIndex={0}
            type="submit"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        )}
      </Form>
    );
  }
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
*/
//export default withRouter(connect(mapState, mapAction)(Login));
