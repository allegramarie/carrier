import React, { Component } from "react";
import { Header, Article, Section, Heading, Split, Box } from "grommet";
import Sidebar from "./Sidebar";
import CampaignTable from "./CampaignTable";

const campaigns = [
  {
    status: "active",
    name: "My Cooking Newsletter #4",
    groups: ["PTA", "Baking Club"]
  },
  {
    status: "draft",
    name: "SaaS Platform Mailer",
    groups: ["Tech Nerds", "MailChimp"]
  },
  {
    status: "draft",
    name: "CarrierPigeon Platform Advert",
    groups: ["Impressed Recruiters"]
  }
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
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
                <CampaignTable campaigns={campaigns} />
              </Section>
            </Article>
          </Box>
        </Split>
      </div>
    );
  }
}

export default Dashboard;
