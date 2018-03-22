import React from "react";
import { TableRow } from "grommet";

const CampaignTableRow = props => (
  <TableRow>
    <td>{props.campaign.status}</td>
    <td>{props.campaign.name}</td>
    <td className="secondary">Groups</td>
  </TableRow>
);

export default CampaignTableRow;
