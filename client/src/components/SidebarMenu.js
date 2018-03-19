import React from "react";
import { Menu, Anchor } from "grommet";
import AnchorLink from "./AnchorLink";

const SidebarMenu = () => (
  <Menu primary={true}>
    <AnchorLink path="/profile">Profile</AnchorLink>
    <Anchor path="/login">Login</Anchor>
  </Menu>
);

export default SidebarMenu;
