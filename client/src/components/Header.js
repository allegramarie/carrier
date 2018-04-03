import React from "react";
import Anchor from "grommet/components/Anchor";
import Box from "grommet/components/Box";
import Header from "grommet/components/Header";
import Menu from "grommet/components/Menu";
import bird from "./bird.png";
import carrierpigeon2 from "./carrier-pigeon2.png";
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
        <Anchor href="/">
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
        {/*        <MailIcon colorIndex="brand" size="large" />*/}
        <Box pad="small" />
        <Menu label="Label" inline={true} direction="row" flex="grow">
          <Anchor
            style={{ marginLeft: "auto", marginRight: "auto" }}
            href="/signup"
          >
            Sign Up
          </Anchor>
          <Anchor style={{ marginLeft: "auto", marginRight: "auto" }} href="#">
            Services
          </Anchor>
          <Anchor style={{ marginLeft: "auto", marginRight: "auto" }} href="#">
            About Us
          </Anchor>
          <Anchor
            style={{ marginLeft: "auto", marginRight: "50px" }}
            href="/login"
          >
            Login
          </Anchor>
        </Menu>
        {/*        <img
          src={carrierpigeon3}
          style={{
            position: "relative",
            float: "left",
            height: "60px",
            marginTop: "5px",
            marginLeft: "65px",
            marginBottom: "5px"
          }}
        />*/}
      </Box>
    </Header>
  );
}

// https://www.emailvendorselection.com/wp-content/uploads/2015/05/personalised-campaign.png
