import React, { Component } from "react";
import Anchor from "grommet/components/Anchor";
import Box from "grommet/components/Box";
import Footer from "grommet/components/Footer";
import Heading from "grommet/components/Heading";
import Paragraph from "grommet/components/Paragraph";
import Headers from "./Header";
import Title from "grommet/components/Title";
import Menu from "grommet/components/Menu";
import chojnacki from "./chojnacki.png";
import Form from "grommet/components/Form";
import FormField from "grommet/components/FormField";
import Button from "grommet/components/Button";
import TextInput from "grommet/components/TextInput";
import Image from "grommet/components/Image";
import carrierpigeon3 from "./carrier-pigeon3.png";
import yuyu from "./yuyu.png";
import allegra from "./allegra.png";
import eric from "./eric.png";
import axios from "axios";

export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: ""
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("in here now");
    axios
      .post("/contactUs", this.state)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Box style={{ backgroundColor: "white" }}>
        <Headers />
        <Heading
          uppercase={true}
          align="center"
          margin="none"
          strong={true}
          style={{ marginTop: "100px", marginBottom: "20px" }}
        >
          Contact Us
        </Heading>
        <Form>
          <FormField
            label="Your Name"
            style={{
              borderRadius: "1%",
              right: "0px",
              marginLeft: "20%",
              marginTop: "20px"
            }}
          >
            <TextInput
              onDOMChange={e => {
                this.setState({ name: e.target.value });
              }}
            />
          </FormField>
          <FormField
            label="Email"
            style={{ borderRadius: "1%", marginTop: "20px", marginLeft: "20%" }}
          >
            <TextInput
              onDOMChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
          </FormField>
          <FormField
            label="Message"
            style={{
              height: "300px",
              borderRadius: "1%",
              marginTop: "20px",
              marginLeft: "20%"
            }}
          >
            <TextInput
              onDOMChange={e => {
                this.setState({ message: e.target.value });
              }}
            />
          </FormField>
          <Footer pad={{ vertical: "medium" }}>
            <Button
              style={{ marginLeft: "20%" }}
              label="Submit"
              type="submit"
              primary={true}
              onClick={() => {
                this.handleClick();
              }}
            />
          </Footer>
          <Box style={{ height: "50px" }}>
            <Box style={{ position: "absolute", right: -880, top: 39 }}>
              <Image
                src={yuyu}
                size="small"
                full="vertical"
                caption={"Developer-Eugene Dong"}
                alt="Sample alt"
              />
              <Image
                src={eric}
                size="small"
                full="vertical"
                caption={"Developer-Eric Shum"}
                alt="Sample alt"
              />
            </Box>
            <Box
              style={{
                position: "absolute",
                right: -580,
                top: 50,
                marginTop: "-50px"
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>Meet The Team</h3>
              <Image
                src={allegra}
                size="small"
                full="vertical"
                caption="Product Owner-Allegra Berndt"
                alt="Sample alt"
                style={{ textColor: "white" }}
              />
              <Image
                src={chojnacki}
                size="small"
                full="vertical"
                caption="Senior Developer-Alex chojnacki"
                alt="Sample alt"
              />
            </Box>
          </Box>
        </Form>
        <Footer
          justify="between"
          colorIndex="grey-1"
          size="small"
          style={{ marginTop: "50px" }}
        >
          <Anchor href="/">
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
              <Anchor href="/">Home</Anchor>
              <Anchor href={`/campaigns/${this.props.match.params.id}`}>
                Back
              </Anchor>
              <Anchor href="#">About</Anchor>
            </Menu>
          </Box>
        </Footer>
      </Box>
    );
  }
}
