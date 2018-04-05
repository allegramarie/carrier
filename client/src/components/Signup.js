import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { LoginForm, Anchor, Section, Box } from "grommet";
import Auth from "../Auth";
import Status from "grommet/components/icons/Status";
import carrierpigeon3 from "./carrier-pigeon3.png";
import Title from "grommet/components/Title";
import Menu from "grommet/components/Menu";
import Footer from "grommet/components/Footer";
import Paragraph from "grommet/components/Paragraph";

// TODO: Refactor into single Authentication component
// to handle login and signup on one route.
class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { redirect: false, errors: [] };
  }

  handleSubmit(event) {
    const { username, password } = event;
    var checker = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (checker.test(username)) {
      Auth.signup({ username, password })
        .then(results => {
          this.setState({ redirect: true });
        })
        .catch(error => {
          this.setState({
            errors: ["Something went wrong. Do you have an account?"]
          });
        });
    } else {
      this.setState({
        errors: [
          <p>
            <Status value="warning" /> Email must be valid.
          </p>
        ]
      });
    }
  }

  render() {
    return this.state.redirect ? (
      <Redirect to="/login" />
    ) : (
      <Section align="center">
        <Box flex="center" seperator={false} fixed={false}>
          <LoginForm
            errors={this.state.errors}
            onSubmit={this.handleSubmit}
            title="Signup"
            forgotPassword={
              <Anchor path="/login" label="Looking for the login?" />
            }
          />
        </Box>
        <Footer
          justify="between"
          colorIndex="grey-1"
          size="small"
          style={{ position: "fixed", bottom: 0 }}
        >
          <Anchor path="/about">
            <Title>
              <img
                src={carrierpigeon3}
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
              CARRIER
            </Title>
          </Anchor>
          <Box direction="row" align="center" pad={{ between: "medium" }}>
            <Paragraph margin="none">© CARRIER</Paragraph>
            <Menu
              direction="row"
              size="medium"
              dropAlign={{ right: "right" }}
              style={{ marginRight: "50px" }}
            >
              <Anchor path="/">Home</Anchor>
              <Anchor path={`/campaigns/${this.props.match.params.id}`}>
                Back
              </Anchor>
              <Anchor path="/contactus">Contact Us</Anchor>
              <Anchor path="#">About</Anchor>
            </Menu>
          </Box>
        </Footer>
      </Section>
    );
  }
}

export default Signup;
