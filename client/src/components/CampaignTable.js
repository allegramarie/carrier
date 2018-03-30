import React from "react";
import { Table, Paragraph, Box, Value } from "grommet";
import CampaignTableRow from "./CampaignTableRow";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinning from "grommet/components/icons/Spinning";
import Pulse from "grommet/components/icons/Pulse";
import Sidebar from "./Sidebar";
// import { createBrowserHistory } from "history";
import Split from "grommet/components/Split";
import Accordion from "grommet/components/Accordion";
import AccordionPanel from "grommet/components/AccordionPanel";
import Button from "grommet/components/Button";
import EditIcon from "grommet/components/icons/base/Edit";
import Meter from "grommet/components/Meter";

class CampaignTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      campaigns: [],
      id: 0,
      addCampaign: false
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
        id: this.props.campaigns.campaigns[0].id
      });
    }
  }
  render() {
    if (this.state.show === true) {
      return <Redirect to={`/campaigns/${this.state.id}`} />;
    }
    if (this.state.addCampaign === true) {
      return <Redirect to={"/createCampaign"} />;
    }
    if (!this.props.campaigns.campaigns[0]) {
      return (
        <Pulse
          onClick={() => {
            this.setState({ addCampaign: true });
          }}
        />
      );
    } else {
      return (
        <Accordion openMulti={true} style={{ width: "70%" }}>
          {this.props.campaigns.campaigns.map((campaign, index) => (
            <AccordionPanel
              heading={`Status: ${
                campaign.status
              } \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Subject: ${
                campaign.name
              }  \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0
              `}
            >
              {campaign.status === "Sent" ? (
                <Paragraph>
                  <Box>
                    <Value value={100} units="% Complete" align="start" />
                    <Meter
                      vertical={false}
                      value={100}
                      onActive={() => {}}
                      colorIndex="ok"
                    />
                  </Box>
                  This Campaign is complete and has been sent. You can view your
                  stats here. Thanks for using us.
                </Paragraph>
              ) : (
                <Paragraph>
                  <Box>
                    <Value value={50} units="% Complete" align="start" />
                    <Meter
                      vertical={false}
                      value={50}
                      onActive={() => {}}
                      colorIndex="critical"
                    />
                  </Box>
                  This draft is currently incomplete.(Campaign email has not
                  been sent). To complete this draft, edit any remaining data
                  and press send.
                </Paragraph>
              )}
              {campaign.status === "Sent" ? (
                <p />
              ) : (
                <Button
                  icon={<EditIcon />}
                  label="Edit"
                  onClick={() => {
                    this.handleClick();
                  }}
                  style={{ width: "150px" }}
                />
              )}
            </AccordionPanel>
          ))}
        </Accordion>
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

// import React from "react";
// import { Table } from "grommet";
// import CampaignTableRow from "./CampaignTableRow";
// import { Redirect } from "react-router-dom";
// import { connect } from "react-redux";
// import Pulse from "grommet/components/icons/Pulse";
// // import { createBrowserHistory } from "history";
//
// class CampaignTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       show: false,
//       campaigns: [],
//       id: 0
//     };
//     this.handleClick = this.handleClick.bind(this);
//   }
//
//   componentWillReceiveProps(nextProps) {
//     // console.log(
//     //   "getting props within campaign table",
//     //   nextProps.campaigns.campaigns,
//     //   this.props
//     // );
//   }
//
//   handleClick(id, status) {
//     if (status !== "Sent") {
//       this.setState({
//         show: true,
//         id: id
//       });
//     }
//   }
//   render() {
//     if (this.state.show === true) {
//       return <Redirect to={`/campaigns/${this.state.id}`} />;
//     }
//     if (this.state.addCampaign === true) {
//       return <Redirect to={"/createCampaign"} />;
//     }
//     if (!this.props.campaigns.campaigns[0]) {
//       return (
//         <Pulse
//           onClick={() => {
//             this.setState({ addCampaign: true });
//           }}
//         />
//       );
//     } else {
//       return (
//         <Table selectable={true}>
//           <thead>
//             <tr>
//               <th>Status</th>
//               <th>Name</th>
//               <th>Subject</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.props.campaigns.campaigns.map((campaign, index) => (
//               <CampaignTableRow
//                 handleClick={this.handleClick}
//                 campaign={campaign}
//                 key={index}
//               />
//             ))}
//           </tbody>
//         </Table>
//       );
//     }
//   }
// }
//
// function mapStateToProps(state) {
//   return {
//     user: state.user,
//     campaigns: state.campaigns
//   };
// }
//
// export default connect(mapStateToProps)(CampaignTable);
