import React, { Component } from "react";
import { Header, Article, Section, Heading, Box, Split } from "grommet";
import CampaignTable from "./CampaignTable";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Split flex="right" separator={false} fixed={false}>
        <Sidebar />
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
      </Split>
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
