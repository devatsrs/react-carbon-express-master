import React, { Component } from "react";

import {
  Column,
  Content,
  Grid,
  Header,
  HeaderMenuButton,
  HeaderName,
  Row,
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
          <Grid>
            <Row>
              <Column lg={{ span: 3, offset: 4 }}>
                <Login />
              </Column>
            </Row>
          </Grid>
        </Content>
      </div>
    );
  }
}
