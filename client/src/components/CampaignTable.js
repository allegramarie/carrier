import React from "react";
import { Table } from "grommet";
import CampaignTableRow from "./CampaignTableRow";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinning from "grommet/components/icons/Spinning";
// import { createBrowserHistory } from "history";

class CampaignTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      campaigns: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(
      "getting props within campaign table",
      nextProps.campaigns.campaigns
    );
    this.setState({
      campaigns: nextProps.campaigns.campaigns
    });
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
    if (this.state.show === true) {
      return <Redirect to="/campaigns" />;
    }
    if (!this.state.campaigns[0]) {
      return <Spinning />;
    } else {
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
            {this.state.campaigns.map((campaign, index) => (
              <CampaignTableRow campaign={campaign} key={index} />
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
