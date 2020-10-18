import React from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import LoginLayout from "./components/Layouts/LoginLayout";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import { connect } from "react-redux";

class App extends React.Component {

  render() {

    let routes = "";
    if (this.props.loggedIn) {
      routes = (
        <Switch>
         <Route exact path="/dashboard"render={(props) => <DashboardLayout {...props} />}></Route>
         <Route  render={(props) => <DashboardLayout {...props} />}></Route>

      </Switch>
      )
    }else{
      routes = (
        <Switch>
        <Route exact path="/login" render={(props) => <LoginLayout {...props} />} />
        <Route    render={(props) => <LoginLayout {...props} />} />

      </Switch>
      )
    }
  return (
    <div className="App">
      {routes}
     </div>
  );
}
}

function mapState(state) {
  return { loggedIn: state.authentication.loggedIn };
}

export default withRouter(connect(mapState, null)(App));
