import React from "react";
import { Paragraph, Box, Value } from "grommet";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinning from "grommet/components/icons/Spinning";
import Pulse from "grommet/components/icons/Pulse";
import Accordion from "grommet/components/Accordion";
import AccordionPanel from "grommet/components/AccordionPanel";
import Button from "grommet/components/Button";
import EditIcon from "grommet/components/icons/base/Edit";
import Meter from "grommet/components/Meter";
import Auth from "../Auth";
import { getCampaigns, deleteCampaign } from "../actions";
import ClearIcon from "grommet/components/icons/base/Clear";
import BarChartIcon from "grommet/components/icons/base/BarChart";

class CampaignTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      campaigns: [],
      id: 0,
      addCampaign: false,
      loading: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getCampaigns = this.getCampaigns.bind(this);
    // this.handleData = this.handleData.bind(this)
  }

  componentDidMount() {
    this.getCampaigns();
  }

  getCampaigns() {
    this.props
      .dispatch(getCampaigns(Auth.userID))
      .then(() => {
        this.setState({
          loading: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleDelete(campaign) {
    this.props
      .dispatch(deleteCampaign(campaign.userid, campaign.id))
      .then(() => {
        this.getCampaigns();
      })
      .catch(err => {
        console.log(err);
      });
  }

  // this.handleData

  handleClick(campaigns, status) {
    if (status !== "Sent") {
      this.setState({
        show: true,
        id: campaigns
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
        <div>
          {this.state.loading === true ? (
            <Accordion
              openMulti={false}
              style={{ width: "75%", overflow: "auto", height: "750px" }}
            >
              {this.props.campaigns.campaigns.map((campaign, index) => (
                <AccordionPanel
                  key={index}
                  heading={
                    <h4>{`Status: ${campaign.status.padEnd(20)}Subject: ${
                      campaign.name
                    }  \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0
              `}</h4>
                  }
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
                      This Campaign is complete and has been sent. You can view
                      your stats here. Thanks for using Carrier.
                    </Paragraph>
                  ) : campaign.status === "Active" ? (
                    <Paragraph>
                      <Box>
                        <Value value={66} units="% Complete" align="start" />
                        <Meter
                          vertical={false}
                          value={66}
                          onActive={() => {}}
                          colorIndex="critical"
                        />
                      </Box>
                      This campaign is currently Active. (Campaign email has not
                      been sent). To complete this draft, edit the remaining
                      template and press send.
                    </Paragraph>
                  ) : campaign.status === "Draft" ? (
                    <Paragraph>
                      <Box>
                        <Value value={33} units="% Complete" align="start" />
                        <Meter
                          vertical={false}
                          value={33}
                          onActive={() => {}}
                          colorIndex="critical"
                        />
                      </Box>
                      This draft is currently incomplete.(Email Template has not
                      been saved/sent). To complete this draft, continue adding
                      more contact emails and start editing your custom campaign
                      template.
                    </Paragraph>
                  ) : (
                    <p />
                  )}
                  {campaign.status === "Sent" ? (
                    <div>
                      <Button
                        icon={<BarChartIcon />}
                        label="Data"
                        path={`/data/${campaign.id}`}
                        style={{ width: "150px" }}
                      />
                    </div>
                  ) : (
                    <div>
                      <Button
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={() => {
                          this.handleClick(campaign.id, campaign.status);
                        }}
                        style={{ width: "150px", marginRight: "5px" }}
                      />
                      <Button
                        icon={<ClearIcon />}
                        primary="true"
                        label="Delete"
                        onClick={() => {
                          this.handleDelete(campaign);
                        }}
                        style={{ width: "150px", marginRight: "5px" }}
                      />
                    </div>
                  )}
                </AccordionPanel>
              ))}
            </Accordion>
          ) : (
            <Spinning />
          )}
        </div>
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
