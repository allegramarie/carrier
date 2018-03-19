import React, { Component } from "react";
import {
  Header,
  NavControl,
  Article,
  Section,
  Heading,
  Tiles,
  Tile,
  Split,
  Box
} from "grommet";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
// import CampaignList from "./components/CampaignList";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar />
        <Split flex="right" separator="false" fixed="false">
          <Sidebar />
          <Box
            colorIndex="neutral-2"
            justify="center"
            align="right"
            pad="medium"
          >
            <Article ref="content" pad="none">
              <Header
                direction="row"
                justify="between"
                size="large"
                pad={{ horizontal: "medium", between: "small" }}
              />
              <Section key="utilization" pad="medium" full="horizontal">
                <Header justify="between">
                  <Heading tag="h2" margin="none">
                    Utilization
                  </Heading>
                </Header>
              </Section>
              <Section pad="medium" full="horizontal">
                <Heading tag="h2">Running Tasks</Heading>
                {/* <CampaignList campaigns={["list", "of", "campaigns"]} /> */}
              </Section>
            </Article>
          </Box>
        </Split>
      </div>
    );
  }
}

export default Dashboard;
