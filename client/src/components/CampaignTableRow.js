import React from "react";
import { TableRow } from "grommet";

const CampaignTableRow = props => (
  <TableRow
    onClick={() => {
      props.handleClick(props.campaign.id, props.campaign.status);
    }}
  >
    <td>{props.campaign.status}</td>
    <td>{props.campaign.name}</td>
    <td className="secondary">{props.campaign.subject}</td>
  </TableRow>
);

export default CampaignTableRow;
