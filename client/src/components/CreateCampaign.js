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
      themes: [
        { themeName: "custom" },
        { themeName: "test" },
        { themeName: "test2" }
      ],
      content: "",
      popup: false,
      text: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.exportHtml = this.exportHtml.bind(this);
    this.saveDesign = this.saveDesign.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
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
                  {/*                <FormField
                  label="Email Content"
                  style={{ width: "800px", height: "400px" }}
                >
                  <TextInput />
                </FormField>*/}
                </Form>
                <Box align="start">
                  <Button
                    label="Save Campaign"
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
                <button onClick={this.exportHtml}>Export HTML</button>
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
      console.log("exportHtml", html);
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

export default CreateCampaign;
