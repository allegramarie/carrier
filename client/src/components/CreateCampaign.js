import React, { Component } from "react";
import {
  Header,
  Heading,
  Split,
  Box,
  Button,
  Select,
  Section,
  Article,
  Form,
  FormField,
  TextInput
} from "grommet";
import Toast from "grommet/components/Toast";
import { Redirect } from "react-router-dom";
import RevertIcon from "grommet/components/icons/base/Revert";
import { Link } from "react-router-dom";
import EmailEditor from "react-email-editor";
import test from "./test.json";
import test2 from "./test2.json";
import custom from "./custom.json";
import { connect } from "react-redux";
import axios from "axios";

class CreateCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignName: null,
      subject: null,
      nameInput: "",
      emailInput: "",
      contactInfo: [],
      sendgridEmails: [],
      themes: [
        { themeName: "custom" },
        { themeName: "test" },
        { themeName: "test2" }
      ],
      popup: false,
      show: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.exportHtml = this.exportHtml.bind(this);
    this.saveDesign = this.saveDesign.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubject = this.handleSubject.bind(this);
    this.handleCampaignName = this.handleCampaignName.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }
  handleCampaignName(e) {
    this.setState({
      campaignName: e.target.value
    });
  }

  handleName(e) {
    this.setState({
      nameInput: e.target.value
    });
  }
  handleEmail(e) {
    this.setState({
      emailInput: e.target.value
    });
  }

  handleSubject(e) {
    this.setState({
      subject: e.target.value
    });
  }

  handleClick() {
    this.setState({
      contactInfo: [
        ...this.state.contactInfo,
        { name: this.state.nameInput, email: this.state.emailInput }
      ],
      sendgridEmails: [...this.state.sendgridEmails, this.state.emailInput],
      emailInput: "",
      nameInput: "",
      show: true
    });
    // axios.post("/saveContactEmail", this.state.contactInfo);
    // console.log(this.state.item, "in onClick");
    // return <Redirect to="/" />
    // console.log(this.state)
  }

  render() {
    // console.log(this.state);
    if (this.state.show === true) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Split>
          <Box justify="center" align="start" pad="medium">
            <Link to="/">
              <Button
                icon={<RevertIcon size="large" colorIndex="neutral-2" />}
                onClick={() => {
                  return <Redirect to="/" />;
                }}
                href="/"
              />
            </Link>
            <Article ref="content" pad="none" style={{ marginLeft: "2%" }}>
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
                    <TextInput
                      placeHolder={this.state.campaignName}
                      onDOMChange={e => {
                        this.handleCampaignName(e);
                      }}
                    />
                  </FormField>
                  <FormField
                    label="Subject"
                    style={{ width: "70%", height: "70%" }}
                  >
                    <TextInput
                      placeHolder={this.state.subject}
                      onDOMChange={e => {
                        this.handleSubject(e);
                      }}
                    />
                  </FormField>
                  <FormField
                    label="Campaign Subject"
                    style={{ width: "70%", height: "70%" }}
                  >
                    <TextInput />
                  </FormField>
                  <FormField
                    label="Add Contact Name"
                    style={{ width: "70%", height: "70%" }}
                  >
                    <TextInput
                      onDOMChange={e => {
                        this.handleName(e);
                      }}
                      placeHolder={this.state.nameInput}
                    />
                  </FormField>
                  <FormField
                    label="Add Contact Email"
                    style={{ width: "70%", height: "70%" }}
                  >
                    <TextInput
                      // placeHolder={this.state.emailInput}
                      onDOMChange={e => {
                        this.handleEmail(e);
                      }}
                      defaultValue={this.state.emailInput}
                    />
                  </FormField>
                  <p />

                  <p />
                </Form>
                <Box align="start">
                  <Button
                    label="Save Contact"
                    type="submit"
                    primary={true}
                    style={{ marginRight: "15%" }}
                    onClick={() => {
                      this.handleClick();
                    }}
                  />
                  <p />
                  <Button
                    label=" Campaign"
                    type="submit"
                    primary={true}
                    style={{ marginRight: "15%" }}
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
                <Select
                  style={{ width: "37%" }}
                  placeHolder="Select Theme"
                  inline={false}
                  multiple={false}
                  onSearch={false}
                  options={this.state.themes.map(function(info, key) {
                    return {
                      value: info.themeName,
                      sub: info,
                      label: (
                        <Box direction="row" justify="start">
                          <span>{info.themeName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="secondary">
                            Test
                          </span>
                        </Box>
                      )
                    };
                  })}
                  value={undefined}
                  onChange={e => {
                    if (e.option.value === "test") {
                      return this.editor.loadDesign(test);
                    } else if (e.option.value === "test2") {
                      return this.editor.loadDesign(test2);
                    } else {
                      this.editor.loadDesign(custom);
                    }
                  }}
                />
              </Section>
            </Article>
            <div style={{ borderStyle: "solid", borderRadius: "1%" }}>
              <div style={{ width: "50%" }}>
                <EmailEditor
                  ref={editor => (this.editor = editor)}
                  onLoad={this.onLoad}
                  onDesignLoad={this.onDesignLoad}
                />
              </div>

              <div style={{ position: "absolute", right: "0px" }}>
                <button onClick={this.exportHtml}>Send Email</button>
                <button onClick={this.saveDesign}>Save Template</button>
              </div>
            </div>
          </Box>
        </Split>
      </div>
    );
  }
  exportHtml = () => {
    this.editor.exportHtml(data => {
      const { design, html } = data;
      var a = html;
      var result = a
        .replace(/>\s+|\s+</g, function(m) {
          return m.trim();
        })
        .replace(/(\r\n|\n|\r)/gm, " ");
      console.log(result);
      axios.post("/exportHTML", {
        data: a,
        sendgridEmails: this.state.sendgridEmails,
        subject: this.state.subject
      });
    });
  };

  saveDesign = () => {
    this.editor.saveDesign(design => {
      console.log("saveDesign", design);
    });
  };

  onLoad = theme => {
    return;
    this.editor.loadDesign(theme);
  };
}

function mapStateToProps(state) {
  return {
    user: state.user,
    contacts: state.contacts
  };
}

export default connect(mapStateToProps)(CreateCampaign);
