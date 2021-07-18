import React from "react";

import {
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  Content,
  HeaderPanel,
  Switcher,
  SwitcherItem,
  SwitcherDivider,
  HeaderMenu,
} from "carbon-components-react";

import {
  Search20,
  UserAvatar24,
  Login16,
  Notification20,
  AppSwitcher20,
} from "@carbon/icons-react";
import Dashboard from "../Dashboard/Dashboard";
import { Route, Switch } from "react-router-dom";
import Accounts from "../Accounts";
import Sidebar from "../Sidebar/Sidebar";
import { header_bar_links } from "../../helper/header_bar_links";
import AccountsEdit from "../Accounts/edit";

import { userActions } from "../../Redux/Actions";
import { connect } from "react-redux";
import { coolGray100, gray100 } from "@carbon/colors";
import edit2 from "../Accounts/edit2";
import AccountsEdit2 from "../Accounts/edit2";

class DashboardLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { isSideNavExpanded: false, isRightSideNavExpanded: false };
    //this.handleClick = this.handleClick.bind(this);

    let useResponsiveOffset = true;
    let content_style = {
      height: "100%",
    };
    if (useResponsiveOffset) {
      content_style.width = "100%";
    }
  }

  onClickSideNavExpand = () => {
    this.setState({ isSideNavExpanded: !this.state.isSideNavExpanded });
  };

  handleLogout = (e) => {
    e.preventDefault();

    this.props.user_logout();

    return this.props.history.push("/login");
  };

  render(props) {
    return (
      <div>
        {/* Header  */}
        <Header aria-label="IBM Platform Name">
          <SkipToContent />

          {/* sidebar menu  button */}
          <HeaderMenuButton
            aria-label="Open menu"
            isCollapsible
            onClick={this.onClickSideNavExpand}
            isActive={this.state.isSideNavExpanded}
          />

          <HeaderName href="#" prefix="SRS">
            Billing
          </HeaderName>
          <HeaderNavigation aria-label="SRS Billing">
            {header_bar_links.map((item, i) => (
              <HeaderMenuItem key={i} href={item.link}>
                {item.title}
              </HeaderMenuItem>
            ))}
          </HeaderNavigation>

          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Search"
              onClick={() => alert("search click")}
            >
              <Search20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Notifications">
              <Notification20 />
            </HeaderGlobalAction>

            <HeaderNavigation aria-label="">
              <HeaderMenu
                aria-label=""
                renderMenuContent={() => <UserAvatar24 />}
                menuLinkName=""
              >
                <HeaderMenuItem onClick={this.handleLogout}>
                  <Login16 /> Logout
                </HeaderMenuItem>
              </HeaderMenu>
            </HeaderNavigation>

            {/* App switcher */}
            <HeaderGlobalAction
              aria-label="App Switcher"
              isActive={this.state.isRightSideNavExpanded}
              onClick={() => {
                this.setState({
                  isRightSideNavExpanded: !this.state.isRightSideNavExpanded,
                });
              }}
            >
              <AppSwitcher20 />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>

        {/* right bar panel  */}
        <HeaderPanel
          color={coolGray100}
          aria-label="Header Panel"
          expanded={this.state.isRightSideNavExpanded}
        >
          <Switcher aria-label="Switcher Container">
            <SwitcherItem isSelected aria-label="Link 1" href="#">
              Link 1
            </SwitcherItem>
            <SwitcherDivider />
            <SwitcherItem href="#" aria-label="Link 2">
              Link 2
            </SwitcherItem>
            <SwitcherItem href="#" aria-label="Link 3">
              Link 3
            </SwitcherItem>
            <SwitcherItem href="#" aria-label="Link 4">
              Link 4
            </SwitcherItem>
            <SwitcherItem href="#" aria-label="Link 5">
              Link 5
            </SwitcherItem>
            <SwitcherDivider />
            <SwitcherItem href="#" aria-label="Link 6">
              Link 6
            </SwitcherItem>
          </Switcher>
        </HeaderPanel>

        {/* sidebar menu */}
        <aside className="bx--side-nav" color={gray100}>
          <Sidebar
            color={gray100}
            isSideNavExpanded={this.state.isSideNavExpanded}
          ></Sidebar>
        </aside>

        {/* main content starts  */}
        <Content id="main-content" style={this.content_style}>
          <Switch>
            <Route
              exact
              path="/accounts"
              render={(props) => <Accounts {...props} />}
            />
            <Route
              exact
              path="/dashboard"
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              exact
              path="/accounts"
              render={(props) => <Accounts {...props} />}
            />
            <Route
              exact
              path="/account/:id/edit"
              render={(props) => <AccountsEdit {...props} />}
            />
            <Route
              exact
              path="/account/:id/edit2"
              render={(props) => <AccountsEdit2 {...props} />}
            />
          </Switch>
        </Content>
      </div>
    );
  }
}

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
