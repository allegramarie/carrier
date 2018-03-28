import React, { Component } from "react";
import { Header, Article, Section, Heading, Box } from "grommet";
import CampaignTable from "./CampaignTable";
import { connect } from "react-redux";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps() {}

  render() {
    return (
      <Box justify="center" align="start" pad="medium">
        <Article ref="content" pad="none">
          <Section key="utilization" pad="medium" full="horizontal">
            <Header justify="between">
              <Heading tag="h2" margin="none">
                Campaigns
              </Heading>
            </Header>
            <CampaignTable />
          </Section>
        </Article>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    campaigns: state.campaigns
  };
}

export default connect(mapStateToProps)(Dashboard);
