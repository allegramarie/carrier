import React, { Component } from "react";
import { Table, TableRow } from "grommet";
import CampaignTableRow from "./CampaignTableRow";

const CampaignTable = props => (
  <Table selectable={true}>
    <thead>
      <tr>
        <th>Status</th>
        <th>Name</th>
        <th>Groups</th>
      </tr>
    </thead>
    <tbody>
      {props.campaigns.map((campaign, index) => (
        <CampaignTableRow campaign={campaign} key={index} />
      ))}
    </tbody>
  </Table>
);

export default CampaignTable;
