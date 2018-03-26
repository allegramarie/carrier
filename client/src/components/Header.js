import React from "react";
import Anchor from "grommet/components/Anchor";
import Box from "grommet/components/Box";
import Header from "grommet/components/Header";
import Menu from "grommet/components/Menu";
import GrommetIcon from "grommet/components/icons/base/BrandGrommetOutline";
import SearchIcon from "grommet/components/icons/base/Search";
import MailIcon from "grommet/components/icons/base/Mail";
import bird from "./bird.png";
import birdred from "./birdred.png";
import carrierpigeon from "./carrier-pigeon.png";
import carrierpigeon2 from "./carrier-pigeon2.png";

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
        <img
          src={birdred}
          style={{
            position: "relative",
            float: "left",
            height: "100px",
            marginTop: "30px"
          }}
        />
        {/*        <MailIcon colorIndex="brand" size="large" />*/}
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
          <Anchor style={{ marginLeft: "auto", marginRight: "50px" }} href="#">
            Login
          </Anchor>
        </Menu>
        <img
          src={carrierpigeon2}
          style={{
            position: "relative",
            float: "left",
            height: "60px",
            marginTop: "5px",
            marginLeft: "65px",
            marginBottom: "5px"
          }}
        />
      </Box>
    </Header>
  );
}

// https://www.emailvendorselection.com/wp-content/uploads/2015/05/personalised-campaign.png
