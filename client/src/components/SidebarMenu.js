import React from "react";
import { Menu, Anchor } from "grommet";

const SidebarMenu = () => (
  <Menu primary={true}>
    <Anchor path="/">Dashboard</Anchor>
    <Anchor path="/profile">Profile</Anchor>
    <Anchor path="/createCampaign">Create Campaign</Anchor>
    <Anchor path="/login">Login</Anchor>
  </Menu>
);

export default SidebarMenu;
