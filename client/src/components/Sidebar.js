import React, { Component } from "react";
import {
  Heading,
  Title,
  Sidebar as GrommetSidebar,
  Header,
  Button,
  Menu,
  Box,
  Anchor
} from "grommet";
import CloseIcon from "grommet/components/icons/base/Close";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // Always open, for now.
    return (
      <GrommetSidebar colorIndex="neutral-1" fixed={true}>
        <Header pad="medium" justify="between">
          <Title>Title</Title>
        </Header>
        <Box flex="grow" justify="start">
          <Menu primary={true}>
            <Anchor href="#">First</Anchor>
            <Anchor href="#">Second</Anchor>
            <Anchor href="#">Third</Anchor>
          </Menu>
        </Box>
      </GrommetSidebar>
    );
  }
}

export default Sidebar;
