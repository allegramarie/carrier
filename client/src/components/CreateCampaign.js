import React, { Component } from "react";
import {
  Header,
  Heading,
  Split,
  Box,
  Paragraph,
  Button,
  Select,
  Section,
  Article,
  Headline,
  Form,
  FormField,
  TextInput
} from "grommet";
import Toast from "grommet/components/Toast";
import { Redirect } from "react-router-dom";
import FormPreviousIcon from "grommet/components/icons/base/FormPrevious";
import RevertIcon from "grommet/components/icons/base/Revert";
import { Link } from "react-router-dom";
import { render } from "react-dom";
import EmailEditor from "react-email-editor";
import test from "./test.json";
import test2 from "./test2.json";
import custom from "./custom.json";
import thunk from "redux-thunk";
import { connect } from "react-redux";
import axios from "axios";
// import config from "./config.js";
import { addCampaign } from "../actions";

class CreateCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignName: "",
      campaignSubject: "",
      campaignStatus: "Draft",
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
      subject: null,
      nameInput: "",
      emailInput: "",
      contactInfo: [],
      sendgridEmails: [],
      themes: [
        { themeName: "Newsletter" },
        { themeName: "Personal Note" },
        { themeName: "Event Flyer" }
      ],
      popup: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.exportHtml = this.exportHtml.bind(this);
    this.saveDesign = this.saveDesign.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubject = this.handleSubject.bind(this);
    this.handleCampaignName = this.handleCampaignName.bind(this);
  }

  handleClick(value) {
    this.props.dispatch(
      addCampaign(
        this.state.campaignName,
        this.state.campaignStatus,
        this.state.campaignSubject,
        this.props.user.user.id
      )
    );
    this.setState(
      {
        campaignName: "",
        campaignSubject: ""
      },
      function() {
        console.log("added campaign!", this.state);
      }
    );
  }

  handleName(e) {
    this.setState({
      campaignName: e.target.value
    });
  }
  handleSubject(e) {
    this.setState({
      campaignSubject: e.target.value
    });
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
      nameInput: ""
    });
    console.log(this.state.item, "in onClick");
  }

  render() {
    console.log(this.state);
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
                href="localhost:3000/"
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
<<<<<<< HEAD
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
=======
                      value={this.state.campaignName}
                      onDOMChange={e => {
                        this.handleName(e);
>>>>>>> Create new campaigns works
                      }}
                    />
                  </FormField>
                  <FormField
                    label="Campaign Subject"
                    style={{ width: "70%", height: "70%" }}
                  >
                    <TextInput
                      value={this.state.campaignSubject}
                      onDOMChange={e => {
                        this.handleSubject(e);
                      }}
                      placeHolder={this.state.nameInput}
                      // onKeyPress={event => {
                      //   if (event.key === "Enter")
                      //     this.state.contactInfo.push({
                      //       name: "test",
                      //       email: "testing"
                      //     });
                      // }}
                    />
                  </FormField>
                  <p />

                  <p />
                  {/*                <FormField
                  label="Email Content"
                  style={{ width: "800px", height: "400px" }}
                >
                  <TextInput />
                </FormField>*/}
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
                    label="Save Campaign"
                    type="submit"
                    primary={true}
                    style={{ marginRight: "15%" }}
                    onClick={() => {
                      this.handleClick();
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
              {/*        <ReactQuill

            value={this.state.text}
            onChange={this.handleChange}
            theme="snow"
            style={{width: '50%', height: '600px', position: 'absolute', marginRight: '70px',
                    marginBottom: '100px', top: '0px', right: '0px', marginTop: '10%'

            }}
            />*/}
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
      // console.log("exportHtml", html);
      var a = html;
      var result = a
        .replace(/>\s+|\s+</g, function(m) {
          return m.trim();
        })
        .replace(/(\r\n|\n|\r)/gm, " ");
      console.log(result);
      //minify, escape double quotes, and remove line breaks
      // var b = a.replace(/\s{2,}/g, '').replace(/\'/g, '"').replace(/(\r\n|\n|\r)/gm,"")
      // var escaper = b.replace(/\"/g,"\\\"");
      // console.log(escaper)

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
    console.log("fuck");
    // this.editor.addEventListener('onDesignLoad', this.onDesignLoad)
    return;
    this.editor.loadDesign(theme);
  };

  // onDesignLoad = (data) => {
  //   console.log('onDesignLoad', data)
  // }
  // setTimeout(function(){this.onLoad()}, 3000)
}

function mapStateToProps(state) {
  return {
    user: state.user,
    contacts: state.contacts
  };
}

export default connect(mapStateToProps)(CreateCampaign);
