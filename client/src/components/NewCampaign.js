import React, { Component } from "react";
import {
  Box,
  Article,
  Section,
  Header,
  Heading,
  Form,
  Footer,
  FormFields,
  Button,
  Split,
  FormField,
  TextInput
} from "grommet";
import Auth from "../Auth";
import { addCampaign } from "../actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Sidebar from "./Sidebar";

class NewCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      subjectInput: "",
      cid: null,
      show: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Action addCampaign is kind of specific; maybe you want to handle the data
  // differently.
  handleSubmit(e) {
    e.preventDefault();
    const { nameInput, subjectInput } = this.state;
    this.props
      .dispatch(addCampaign(nameInput, "Draft", subjectInput, Auth.userID))
      .then(() => {
        this.setState({
          cid: this.props.campaigns.campaigns[
            this.props.campaigns.campaigns.length - 1
          ].id,
          nameInput: "",
          subjectInput: "",
          show: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const { name, value } = target;
    // This assigns the changed value to state using the name of the changed
    this.setState({
      [name]: value
    });
  }

  render() {
    if (this.state.show === true) {
      return <Redirect to={`/campaigns/${this.state.cid}`} />;
    }
    return (
      <Split flex="right" separator={false} fixed={false}>
        <Sidebar />
        <Box justify="center" align="start" pad="medium">
          <Article ref="content" pad="none" style={{ marginLeft: "2%" }}>
            <Section key="utilization" pad="medium" full="horizontal">
              <Form onSubmit={this.handleSubmit}>
                <Header>
                  <Heading tag="h2">Create Campaign</Heading>
                </Header>
                <FormFields>
                  <FormField label="Campaign Name">
                    <TextInput
                      onDOMChange={e => this.handleInputChange(e)}
                      name="nameInput"
                    />
                  </FormField>
                  <FormField label="Email Subject">
                    <TextInput
                      onDOMChange={e => this.handleInputChange(e)}
                      name="subjectInput"
                    />
                  </FormField>
                </FormFields>
                <Footer pad={{ vertical: "medium" }}>
                  <Button label="Submit" type="submit" primary={true} />
                </Footer>
              </Form>
            </Section>
          </Article>
        </Box>
      </Split>
    );
  }
}

const mapStateToProps = state => {
  return {
    campaigns: state.campaigns
  };
};

export default connect(mapStateToProps)(NewCampaign);
