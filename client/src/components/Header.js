import React from "react";
import Anchor from "grommet/components/Anchor";
import Box from "grommet/components/Box";
import Header from "grommet/components/Header";
import Menu from "grommet/components/Menu";
import carrierpigeon3 from "./carrier-pigeon3.png";

export default function AppHeader(props) {
  return (
    <Header
      justify="center"
      colorIndex="light-2"
      style={{ height: "1px" }}
      float={true}
      fixed={true}
    >
      <Box
        size={{ width: { max: "xxlarge" } }}
        direction="row"
        responsive={false}
        justify="start"
        align="center"
        pad={{ horizontal: "medium" }}
        flex="grow"
      >
        <Anchor path="/">
          <img
            src={carrierpigeon3}
            style={{
              position: "relative",
              float: "left",
              height: "65px",
              marginTop: "5px",
              marginLeft: "65px",
              marginBottom: "5px"
            }}
          />
        </Anchor>
        <Box pad="small" />
        <Menu label="Label" inline={true} direction="row" flex="grow">
          <Anchor
            style={{ marginLeft: "auto", marginRight: "auto" }}
            path="/signup"
          >
            Sign Up
          </Anchor>
          <Anchor style={{ marginLeft: "auto", marginRight: "auto" }} path="#">
            Services
          </Anchor>
          <Anchor style={{ marginLeft: "auto", marginRight: "auto" }} path="#">
            About Us
          </Anchor>
          <Anchor
            style={{ marginLeft: "auto", marginRight: "50px" }}
            path="/login"
          >
            Login
          </Anchor>
        </Menu>
      </Box>
    </Header>
  );
}
