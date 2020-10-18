import React  from "react";

import
{
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  Content,
} from "carbon-components-react";

import { Search20, Notification20, AppSwitcher20 } from "@carbon/icons-react";
import Dashboard from "../Dashboard/Dashboard";
import { HashRouter, Route, Router, Switch } from "react-router-dom";
import Accounts from "../Accounts";
import Sidebar from "../Sidebar/Sidebar";
import { header_bar_links } from "../../helper/header_bar_links";
import AccountsEdit from "../Accounts/edit";
import { userActions } from "../../Redux/Actions";
import { connect } from "react-redux";
 
  class DashboardLayout extends React.PureComponent
{
  constructor( props )
  {
    super( props );
    // Don't call this.setState() here!
    this.state = { isSideNavExpanded: false };
    //this.handleClick = this.handleClick.bind(this);

    let useResponsiveOffset = true;
    let content_style = {
      height: "100%",
    };
    if( useResponsiveOffset )
    {
      content_style.width = "100%";
    }
  }

  onClickSideNavExpand = () =>
  {
    this.setState( { isSideNavExpanded: !this.state.isSideNavExpanded } );
  };

  handleLogout = (e) => {
    e.preventDefault();

    this.props.user_logout();

    return this.props.history.push("/");
  };

  render ( props )
  {
    return (
      <>
        <Header aria-label="IBM Platform Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            isCollapsible
            onClick={ this.onClickSideNavExpand }
            isActive={ this.state.isSideNavExpanded }
          />
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
          <HeaderNavigation aria-label="IBM [Platform]">
            { header_bar_links.map( ( item, i ) => (
              <HeaderMenuItem key={ i } href={ item.link }>
                {item.title }
              </HeaderMenuItem>
            ) ) }
          </HeaderNavigation>

          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Search"
              onClick={ () => alert( "search click" ) }
            >
              <Search20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Notifications"
              onClick={this.handleLogout}
              >
              <Notification20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="App Switcher"
              onClick={ () => alert( "app-switcher click" ) }
            >
              <AppSwitcher20 />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
        <aside className="bx--side-nav">
          <Sidebar isSideNavExpanded={ this.state.isSideNavExpanded }></Sidebar>
        </aside>
        <Content id="main-content" style={ this.content_style }>
          <Switch>

            <Route
              exact
              path="/accounts"
              render={ ( props ) => <Accounts { ...props } /> }
            />
            <Route
              exact
              path="/dashboard"
              render={ ( props ) => <Dashboard { ...props } /> }
            />
            <Route
              exact
              path="/accounts"
              render={ ( props ) => <Accounts { ...props } /> }
            />
            <Route
              exact
              path="/account/:id/edit"
              render={ ( props ) => <AccountsEdit { ...props } /> }
            />
          </Switch>
        </Content>
      </>
    );
  }
}


//map state to props
function mapState(state) {
  return {
    user: state.authentication.user,
  };
}

//map action to props
const mapAction = (dispatch) => {
  return {
    user_logout: () => dispatch(userActions.user_logout()),
  };
};

export default connect(mapState, mapAction)(DashboardLayout);
