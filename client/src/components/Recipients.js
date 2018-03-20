import React from "react";
import { TableRow } from "grommet";

const Recipients = props => (
  <TableRow>
    <td>{props.items.name}</td>
    <td>{props.items.email}</td>
  </TableRow>
);

export default Recipients;
