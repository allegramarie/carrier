import React from "react";
import { TableRow } from "grommet";
import Close from "grommet/components/icons/base/Close";
import Status from "grommet/components/icons/Status";
import { Button } from "grommet";

const Recipients = props => (
  <TableRow>
    <td>{props.contact.name}</td>
    <td>{props.contact.email}</td>
    <td>
      {props.contact.unsubscribe ? (
        <Status value="disabled" />
      ) : (
        <Status value="ok" />
      )}
    </td>
    <td>
      <Button
        icon={<Close />}
        onClick={() => {
          props.handleDelete(
            props.contact.id,
            props.contact.contactid,
            props.contact.campaignid
          );
        }}
      />
    </td>
  </TableRow>
);

export default Recipients;
