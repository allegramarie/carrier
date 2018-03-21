import React from "react";
import { Table } from "grommet";
import CampaignTableRow from "./CampaignTableRow";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import { createBrowserHistory } from "history";

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
    // console.log(this.props);
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
          {console.log(this.props)}
          {this.props.campaigns.map((campaign, index) => (
            <CampaignTableRow campaign={campaign} key={index} />
          ))}
        </tbody>
      </Table>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    campaigns: state.campaigns
  };
}

export default connect(mapStateToProps)(CampaignTable);
