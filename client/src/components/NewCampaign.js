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
  FormField,
  TextInput
} from "grommet";
import axios from "axios";
import Auth from "../Auth";
import { addCampaign } from "../actions";
import { connect } from "react-redux";

class NewCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      subjectInput: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Action addCampaign is kind of specific; maybe you want to handle the data
  // differently.
  handleSubmit(e) {
    e.preventDefault();
    const { nameInput, subjectInput } = this.state;
    const userID = Auth.userID;
    this.props.dispatch(
      addCampaign(nameInput, "Draft", subjectInput, Auth.userID)
    );
    this.setState({
      nameInput: "",
      subjectInput: ""
    });
  }

  handleInputChange(event) {
    const target = event.target;
    // Get the name of the inputfield
    const { name, value } = target;

    // This assigns the changed value to state using the name of the changed
    // input field
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
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
    );
  }
}

const mapStateToProps = state => {
  return {
    campaigns: state.campaigns
  };
};

export default connect(mapStateToProps)(NewCampaign);
