import React from "react";
import { Menu, Anchor } from "grommet";
import Auth from "../Auth";

const SidebarMenu = () => (
  <Menu primary={true}>
    <Anchor path="/about">About</Anchor>
    <Anchor path={`/profile/${Auth.userID}`}>Profile</Anchor>
    <Anchor path="/createCampaign">Create Campaign</Anchor>
    <Anchor path="/login" onClick={Auth.logout.bind(Auth)}>
      Logout
    </Anchor>
  </Menu>
);

export default SidebarMenu;
