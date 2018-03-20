import React from "react";
import { Table, Anchor } from "grommet";
import CampaignTableRow from "./CampaignTableRow";
import { Link, Redirect, withRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

class CampaignTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // console.log('here')
    this.setState({
      show: true
    });
    // this.props.history.push("path/to/push");
    // return (<Redirect to="/campaigns"/>)
  }
  render() {
    console.log(this.props);
    if (this.state.show === true) {
      return <Redirect to="/campaigns" />;
    }
    return (
      <Table selectable={true}>
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>Groups</th>
          </tr>
        </thead>
        <tbody
          onClick={() => {
            this.handleClick();
          }}
        >
          {this.props.campaigns.map((campaign, index) => (
            <CampaignTableRow campaign={campaign} key={index} />
          ))}
        </tbody>
      </Table>
    );
  }
}
export default CampaignTable;
