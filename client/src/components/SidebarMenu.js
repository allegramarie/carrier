import React from "react";
import { Menu, Anchor } from "grommet";
import { Link } from "react-router-dom";

//import AnchorLink from "./AnchorLink";

const SidebarMenu = () => (
  <Menu primary={true}>
    <Anchor path="/profile">Profile</Anchor>
    <Link to="/profile">Profile</Link>
  </Menu>
);

export default SidebarMenu;
