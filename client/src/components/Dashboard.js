import React, { Component } from "react";
import { Header, Article, Section, Heading, Split, Box } from "grommet";
import Sidebar from "./Sidebar";
import CampaignTable from "./CampaignTable";
import { connect } from "react-redux";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Split flex="right" separator={false} fixed={false}>
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
      </div>
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
