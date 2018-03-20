import React, { Component } from "react";
import Section from "grommet/components/Section";
import Article from "grommet/components/Article";
import Headline from "grommet/components/Headline";
import Form from "grommet/components/Form";
import FormField from "grommet/components/FormField";
import TextInput from "grommet/components/TextInput";
import { Header, Heading, Split, Box, Paragraph, Button } from "grommet";
import Toast from "grommet/components/Toast";

class CreateCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignName: null,
      contactName: [],
      contactEmail: [],
      content: "",
      popup: false
    };
  }

  render() {
    return (
      <div>
        <Box justify="center" align="start" pad="medium">
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
                  <TextInput />
                </FormField>
                <FormField
                  label="Add Contact Email"
                  style={{ width: "70%", height: "70%" }}
                >
                  <TextInput />
                </FormField>
                <FormField
                  label="Email Content"
                  style={{ width: "800px", height: "400px" }}
                >
                  <TextInput />
                </FormField>
              </Form>
              <p />
              <Box align="end">
                <Button
                  label="Send"
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
                  onClose={() => this.setState({ popup: false })}
                >
                  Message Sent!
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
