import React, { Component } from "react";
import {
  Header,
  Heading,
  // Split,
  Box,
  // Paragraph,
  Button,
  Select,
  Section,
  Article,
  // Headline,
  Form,
  FormField,
  TextInput
} from "grommet";
import Toast from "grommet/components/Toast";
import { Redirect } from "react-router-dom";
// import FormPreviousIcon from "grommet/components/icons/base/FormPrevious";
import RevertIcon from "grommet/components/icons/base/Revert";

class CreateCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignName: null,
      contactName: ["Eric", "Allegra", "Alex", "Yuyu"],
      contactEmail: [
        "eric@eric.com",
        "allegra@allegra.com",
        "alex.com",
        "yuyu@yuyu.com"
      ],
      contactInfo: [
        { name: "Eric", email: "eric@eric.com" },
        { name: "Allegra", email: "allegra@allegra.com" },
        { name: "Alex", email: "alex@alex.com" },
        { name: "Yuyu", email: "yuyu@yuyu.com" }
      ],
      content: "",
      popup: false
    };
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Box justify="center" align="start" pad="medium">
          <Button
            icon={<RevertIcon />}
            onClick={() => {
              return <Redirect to="/" />;
            }}
            href="localhost:3000"
          />
          <Article ref="content" pad="none">
            <Section key="utilization" pad="medium" full="horizontal">
              <Header justify="between">
                <Heading tag="h2" margin="none">
                  Create Campaign
                </Heading>
              </Header>
              <Form>
                <FormField
                  label="Campaign Name"
                  style={{ width: "70%", height: "70%" }}
                >
                  <TextInput />
                </FormField>
                <FormField
                  label="Add Contact Name"
                  style={{ width: "70%", height: "70%" }}
                >
                  <TextInput
                    onKeyPress={event => {
                      if (event.key === "Enter")
                        this.state.contactInfo.push({
                          name: "test",
                          email: "testing"
                        });
                    }}
                  />
                </FormField>
                <FormField
                  label="Add Contact Email"
                  style={{ width: "70%", height: "70%" }}
                >
                  <TextInput />
                </FormField>
                <p />
                <Select
                  placeHolder="All Contacts"
                  inline={false}
                  multiple={false}
                  onSearch={false}
                  options={this.state.contactInfo.map(function(info, key) {
                    return {
                      value: info.name,
                      sub: info.email,
                      label: (
                        <Box direction="row" justify="start">
                          <span>{info.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="secondary">
                            {info.email}
                          </span>
                        </Box>
                      )
                    };
                  })}
                  value={undefined}
                  onChange={() => {}}
                />
                <p />
                <FormField
                  label="Email Content"
                  style={{ width: "800px", height: "400px" }}
                >
                  <TextInput />
                </FormField>
              </Form>
              <Box align="end">
                <Button
                  label="Save Campaign"
                  type="submit"
                  primary={true}
                  onClick={() => {
                    this.setState({ popup: true });
                  }}
                />
              </Box>

              {this.state.popup === true ? (
                <Toast
                  status="ok"
                  onClose={() => {
                    this.setState({ popup: false });
                  }}
                >
                  Campaign Saved!
                </Toast>
              ) : (
                <p />
              )}
            </Section>
          </Article>
        </Box>
      </div>
    );
  }
}

export default CreateCampaign;
