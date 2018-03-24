import React from "react";
import Anchor from "grommet/components/Anchor";
import Box from "grommet/components/Box";
import Header from "grommet/components/Header";
import Menu from "grommet/components/Menu";
import GrommetIcon from "grommet/components/icons/base/BrandGrommetOutline";
import SearchIcon from "grommet/components/icons/base/Search";
import MailIcon from "grommet/components/icons/base/Mail";

export default function AppHeader(props) {
  return (
    <Header justify="center" colorIndex="neutral-3">
      <Box
        size={{ width: { max: "xxlarge" } }}
        direction="row"
        responsive={false}
        justify="start"
        align="center"
        pad={{ horizontal: "medium" }}
        flex="grow"
      >
        <MailIcon colorIndex="brand" size="large" />
        <Box pad="small" />
        <Menu label="Label" inline={true} direction="row" flex="grow">
          <Anchor style={{ marginLeft: "auto", marginRight: "auto" }} href="#">
            Sign Up
          </Anchor>
          <Anchor style={{ marginLeft: "auto", marginRight: "auto" }} href="#">
            Services
          </Anchor>
          <Anchor style={{ marginLeft: "auto", marginRight: "auto" }} href="#">
            About Us
          </Anchor>
          <Anchor style={{ marginLeft: "auto", marginRight: "auto" }} href="#">
            Login
          </Anchor>
        </Menu>
      </Box>
    </Header>
  );
}
