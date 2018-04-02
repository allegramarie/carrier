import React, { Component } from "react";
import { Title, Sidebar as GrommetSidebar, Header, Box, Anchor } from "grommet";
import SidebarMenu from "./SidebarMenu";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // Always open, for now.
    return (
      <GrommetSidebar size="small" colorIndex="neutral-3" fixed={true}>
        <Header pad="medium" justify="start">
          <Title>
            <Anchor path="/">MailAppTitle</Anchor>
          </Title>
        </Header>
        <Box flex="grow" justify="start">
          <SidebarMenu />
        </Box>
      </GrommetSidebar>
    );
  }
}

export default Sidebar;
