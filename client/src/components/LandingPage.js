import React, { Component } from "react";
import Anchor from "grommet/components/Anchor";
import Box from "grommet/components/Box";
import Card from "grommet/components/Card";
import Footer from "grommet/components/Footer";
import Heading from "grommet/components/Heading";
import Hero from "grommet/components/Hero";
import Paragraph from "grommet/components/Paragraph";
import Header from "./Header";
import NewsFeed from "./NewsFeed";
import Title from "grommet/components/Title";
import Menu from "grommet/components/Menu";
import SendIcon from "grommet/components/icons/base/Send";
import InfoPage from "./InfoPage.js";

export default class LandingPage extends Component {
  render() {
    return (
      <Box>
        <Header />
        <Box>
          <Hero
            size="large"
            backgroundImage="https://www.emailvendorselection.com/wp-content/uploads/2015/05/personalised-campaign.png"
            // backgroundImage="https://www.colourflutter.com/images/email-marketing-colour-flutter.jpg?crc=232461541"
            colorIndex="light-1"
          >
            <Card
              style={{
                color: "orange",
                position: "absolute",
                left: "0px",
                bottom: "0px"
              }}
              heading={
                <Heading strong={true}>
                  Sending eMails Faster, Easier, for Free
                </Heading>
              }
              description={
                <p style={{ color: "orange" }}>
                  Sign Up for a free acount for a full User experience
                </p>
              }
              label={<p style={{ color: "orange" }}>Thesis Name</p>}
              size="large"
              link={<Anchor href="#" primary={true} label="Learn More" />}
            />
          </Hero>
        </Box>
        <Box align="center">
          <Box
            pad="large"
            align="center"
            textAlign="center"
            size={{ width: { max: "xxlarge" } }}
          >
            <Heading tag="h1" strong={true} margin="none">
              There's MailChimp, then there's Us.
            </Heading>
            <Paragraph size="xlarge" width="large">
              Lorem ipsum dolor sit amet, dicat sonet congue ei mei, est summo
              copiosae facilisi an. Sumo accumsan mel ea, eu ignota hendrerit
              consequuntur me.
            </Paragraph>
          </Box>
        </Box>
        <InfoPage />
        <Box colorIndex="light-2" pad={{ vertical: "large" }} align="center">
          <Box
            align="center"
            size={{ width: "xxlarge" }}
            pad={{ horizontal: "large" }}
          >
            <Heading tag="h2" strong={true}>
              About Us
            </Heading>
          </Box>
          <NewsFeed />
        </Box>
        <Footer justify="between" colorIndex="grey-1" size="large">
          <Title>
            <SendIcon style={{ marginLeft: "50px" }} />
            Come Up With a Name Allegra
          </Title>
          <Box direction="row" align="center" pad={{ between: "medium" }}>
            <Paragraph margin="none">© Our Thesis Group</Paragraph>
            <Menu direction="row" size="medium" dropAlign={{ right: "right" }}>
              <Anchor href="#">Sign Up</Anchor>
              <Anchor href="#">Login</Anchor>
              <Anchor href="#">About</Anchor>
            </Menu>
          </Box>
        </Footer>;
      </Box>
    );
  }
}
