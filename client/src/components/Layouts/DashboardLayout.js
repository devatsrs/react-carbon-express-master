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
  TableToolbarMenu,
  TableToolbarAction,
  OverflowMenu,
  OverflowMenuItem,
  HeaderPanel,
  Switcher,
  SwitcherItem,
  SwitcherDivider,
  HeaderMenu,

 
} from "carbon-components-react";
 
import { Search20, User32, Notification20, AppSwitcher20 , UserAvatarFilled32} from "@carbon/icons-react";
import Dashboard from "../Dashboard/Dashboard";
import { HashRouter, Route, Router, Switch } from "react-router-dom";
import Accounts from "../Accounts";
import Sidebar from "../Sidebar/Sidebar";
import { header_bar_links } from "../../helper/header_bar_links";
import AccountsEdit from "../Accounts/edit";
import { userActions } from "../../Redux/Actions";
import { connect } from "react-redux";
import { black, black100,  blue, gray100, warmGray, warmGray100, white0 } from '@carbon/colors';
import {
  // An object of all themes
  themes,

  // Direct theme values
  white,
  g100,
   g10,
  g90,
 
  // Specific token values
  interactive01,
  interactive02,
} from '@carbon/themes';
 
  class DashboardLayout extends React.PureComponent
{
  constructor( props )
  {
    super( props );
    // Don't call this.setState() here!
    this.state = { isSideNavExpanded: false,  isRightSideNavExpanded: false,};
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

    return this.props.history.push("/login");
  };

  render ( props )
  {

    const AppSwitcherColor = {
      background:gray100,
      color:white0,
      padding:"inherite"
 
    };
        
const AppSwitcherStyle = {
   padding:"1px"
};


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
                isActive={ this.state.isRightSideNavExpanded }
              isCollapsible
              onClick={ ()=>{this.setState({isRightSideNavExpanded: !this.state.isRightSideNavExpanded})}  }

            >
              <AppSwitcher20 />
            </HeaderGlobalAction>
 
            <HeaderNavigation   aria-label="">
            
            <HeaderMenu 	 aria-label=""   renderMenuContent={AppSwitcher20}   menuLinkName="">
            <HeaderMenuItem  href="#">Sub-link 1</HeaderMenuItem>
            <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
            <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
          </HeaderMenu>
          </HeaderNavigation>

 

            <HeaderPanel  aria-label="Header Panel"  expanded={ this.state.isRightSideNavExpanded }>
      <Switcher aria-label="Switcher Container">
        <SwitcherItem  isSelected aria-label="Link 1" href="#">
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
