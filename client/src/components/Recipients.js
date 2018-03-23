import React from "react";
import { TableRow } from "grommet";

const Recipients = props => (
  <TableRow>
    <td>{props.contact.name}</td>
    <td>{props.contact.email}</td>
  </TableRow>
);

export default Recipients;
