import React, { Component } from "react";
import { Title, Sidebar as GrommetSidebar, Header, Box, Anchor } from "grommet";
import SidebarMenu from "./SidebarMenu";
import carrierpigeon3 from "./carrier-pigeon3.png";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <GrommetSidebar size="small" colorIndex="neutral-3" fixed={true}>
        <Anchor href="/about">
          <img
            src={carrierpigeon3}
            style={{
              position: "relative",
              float: "left",
              height: "70px",
              width: "70px",
              marginLeft: "75px",
              marginTop: "50px",
              marginBottom: "5px"
            }}
          />
        </Anchor>
        <Header pad="medium" justify="start">
          <Title>
            <Anchor path="/">CarrierPigeon</Anchor>
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
