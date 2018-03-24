import React from "react";
import { Table } from "grommet";
import CampaignTableRow from "./CampaignTableRow";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinning from "grommet/components/icons/Spinning";
import { getCampaigns } from "../actions";
// import { createBrowserHistory } from "history";

class CampaignTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      campaigns: [],
      id: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log(
    //   "getting props within campaign table",
    //   nextProps.campaigns.campaigns,
    //   this.props
    // );
  }

  handleClick(id, status) {
    if (status !== "Sent") {
      this.setState({
        show: true,
        id: id
      });
    }
    // this.props.history.push("path/to/push");
    // return (<Redirect to="/campaigns"/>)
  }
  render() {
    if (this.state.show === true) {
      return <Redirect to={`/campaigns/${this.state.id}`} />;
    }
    if (!this.props.campaigns.campaigns[0]) {
      return <Spinning />;
    } else {
      return (
        <Table selectable={true}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {this.props.campaigns.campaigns.map((campaign, index) => (
              <CampaignTableRow
                handleClick={this.handleClick}
                campaign={campaign}
                key={index}
              />
            ))}
          </tbody>
        </Table>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    campaigns: state.campaigns
  };
}

export default connect(mapStateToProps)(CampaignTable);
