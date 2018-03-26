import React from "react";
import { Menu, Anchor } from "grommet";
import Auth from "../Auth";

const SidebarMenu = () => (
  <Menu primary={true}>
    <Anchor path="/">Dashboard</Anchor>
    <Anchor path="/LandingPage">Home Page</Anchor>
    <Anchor path="/profile">Profile</Anchor>
    <Anchor path="/login">Login</Anchor>
    <Anchor path="/createCampaign">Create Campaign</Anchor>
    <Anchor path="/Editor">Editor</Anchor>
    <Anchor path="/login" onClick={Auth.logout.bind(Auth)}>
      Logout
    </Anchor>
  </Menu>
);

export default SidebarMenu;
