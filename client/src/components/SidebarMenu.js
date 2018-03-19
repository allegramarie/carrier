import React from "react";
import { Menu, Anchor } from "grommet";

const SidebarMenu = () => (
  <Menu primary={true}>
    <Anchor href="#">Dashboard</Anchor>
    <Anchor href="#">Profile</Anchor>
    <Anchor href="#">New</Anchor>
  </Menu>
);

export default SidebarMenu;
