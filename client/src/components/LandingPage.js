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
import InfoPage from "./InfoPage.js";
import carrierpigeon3 from "./carrier-pigeon3.png";
import style from "../index.css";
import carrierfly from "./carrierfly.png";
import { Animated } from "react-animated-css";

export default class LandingPage extends Component {
  render() {
    return (
      <Box>
        <Header />
        <Box>
          <Hero
            size="large"
            backgroundImage="https://www.emailvendorselection.com/wp-content/uploads/2015/05/personalised-campaign.png"
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
                <Heading
                  strong={true}
                  className="Roboto"
                  style={{
                    fontWeight: "bold"
                  }}
                >
                  Send eMails Faster, Easier, for Free
                </Heading>
              }
              description={
                <p
                  className="Lato"
                  style={{
                    color: "orange",
                    fontSize: "116%",
                    fontWeight: "bold"
                  }}
                >
                  Sign up for a free acount to begin
                </p>
              }
              label={
                <p
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    fontSize: "125%"
                  }}
                  className="Lato"
                >
                  CARRIER
                </p>
              }
              size="large"
              link={<Anchor path="/signup" primary={true} label="Learn More" />}
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
            <Heading
              tag="h1"
              strong={true}
              margin="none"
              className="Roboto"
              style={{ fontWeight: "medium" }}
            >
              There's MailChimp. <br />And now there's Carrier.
            </Heading>
            <Paragraph size="xlarge" width="large" className="Lato">
              With Carrier, send up to 100 custom templated emails daily for
              Free. Manage multiple campaigns, keep track of email statistics,
              send bundled emails, all in 3 steps.
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
            <Heading
              tag="h2"
              strong={true}
              className="Roboto"
              style={{ fontWeight: "bold" }}
            >
              About Us
            </Heading>
          </Box>
          <NewsFeed />
        </Box>
        <Footer justify="between" colorIndex="grey-1" size="small">
          <Title>
            <Animated
              animationIn="fadeInLeft"
              animationOut="wobble infinite"
              isVisible={true}
            >
              <img
                src={carrierfly}
                alt="LOGO"
                style={{
                  position: "relative",
                  float: "left",
                  height: "60px",
                  marginTop: "5px",
                  marginLeft: "65px",
                  marginBottom: "5px"
                }}
              />
            </Animated>
            Carrier
          </Title>
          <Box direction="row" align="center" pad={{ between: "medium" }}>
            <Paragraph margin="none">© CARRIER</Paragraph>
            <Menu
              direction="row"
              size="medium"
              dropAlign={{ right: "right" }}
              style={{ marginRight: "50px" }}
            >
              <Anchor path="/signup">Sign Up</Anchor>
              <Anchor path="/login">Login</Anchor>
              <Anchor path="/contactus">Contact Us</Anchor>
              <Anchor path="#">About</Anchor>
            </Menu>
          </Box>
        </Footer>
      </Box>
    );
  }
}
