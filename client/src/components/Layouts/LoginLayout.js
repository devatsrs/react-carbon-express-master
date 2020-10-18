import React, { Component } from "react";

import {
  Content,
  Header,
  HeaderMenuButton,
  HeaderName,
  SkipToContent,
} from "carbon-components-react";
import Login from "../Login/Login";

export default class LoginLayout extends Component {
  render(props) {
    return (
      <div>
        <Header aria-label="IBM Platform Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"

          // onClick={onClickSideNavExpand}
          // isActive={isSideNavExpanded}
          />
          <HeaderName href="#" prefix="IBM">
            [Company Name]
          </HeaderName>
        </Header>

        <Content id="main-content">
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col-lg-4 bx--offset-lg-4">
                <Login {...props} />
              </div>
            </div>
          </div>
        </Content>
      </div>
    );
  }
}
