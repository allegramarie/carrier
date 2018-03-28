import React, { Component } from "react";
import { Box, Button, Select } from "grommet";
import Toast from "grommet/components/Toast";
import EmailEditor from "react-email-editor";
import test from "./test.json";
import test2 from "./test2.json";
import custom from "./custom.json";
import { connect } from "react-redux";
import axios from "axios";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendgridEmails: [],
      themes: [
        // Includes the base email templates
        // + one user saved draft campaign templates
        { name: "basic" },
        { name: "test2" },
        { name: "test" }
      ],
      popup: false,
      sendPopup: false
    };
    this.exportHtml = this.exportHtml.bind(this);
    this.saveDesign = this.saveDesign.bind(this);
  }

  componentWillMount() {
    // TODO: Get the themes from server
  }

  loadTemplateByName = name => {
    const campaignId = this.props.match.campaignId;
    // If the selected template is one of the base templates, load the JSON
    // into the Editor.
    // Else, load the user template from the server (via S3)
    axios.get(`/templates/${campaignId}`).then(response => {
      const templateJSON = response.data.templateJSON;
      const parsedJSON = JSON.parse(templateJSON);
      this.editor.loadDesign(parsedJSON);
    });
  };

  render() {
    return (
      <div>
        {this.state.popup === true ? (
          <Toast
            status="ok"
            onClose={() => {
              this.setState({ popup: false });
            }}
          >
            Template Saved!
          </Toast>
        ) : (
          <p />
        )}
        {this.state.sendPopup === true ? (
          <Toast
            status="ok"
            onClose={() => {
              this.setState({ sendPopup: false });
            }}
          >
            Emails Sent!
          </Toast>
        ) : (
          <p />
        )}
        <Select
          style={{ width: "37%", float: "right" }}
          placeHolder="Select Theme"
          inline={false}
          multiple={false}
          onSearch={false}
          options={this.state.themes.map(function(info, key) {
            return {
              value: info.name,
              sub: info,
              label: (
                <Box direction="row" justify="center">
                  <span>{info.name}</span>
                </Box>
              )
            };
          })}
          value={undefined}
          onChange={e => this.loadTemplateByName(e.option.value)}
        />
        <div>
          <EmailEditor
            style={{
              height: "900px",
              width: "1300px",
              borderStyle: "solid",
              borderRadius: "1%"
            }}
            ref={editor => (this.editor = editor)}
            onDesignLoad={this.onDesignLoad}
          />
        </div>
        <Button
          style={{
            position: "relative",
            float: "right",
            marginLeft: "10px",
            marginTop: "5px",
            marginRight: "10px"
          }}
          label="Send Email"
          type="submit"
          primary={true}
          onClick={this.exportHtml}
        />
        <Button
          style={{
            position: "relative",
            float: "right",
            marginLeft: "10px",
            marginTop: "5px"
          }}
          label="Save Template"
          type="submit"
          primary={true}
          onClick={this.saveDesign}
        />
      </div>
    );
  }

  exportHtml = () => {
    this.setState({ sendPopup: true });
    this.editor.exportHtml(data => {
      const { htmlString } = data;
      axios.post("/exportHTML", {
        htmlString,
        sendgridEmails: this.state.sendgridEmails
      });
    });
  };

  saveDesign = () => {
    const campaignId = this.props.match.campaignId;
    let data = { campaignId };
    this.editor.saveDesign(designJSON => {
      data.designJSON = designJSON;
      this.setState({ popup: true });
      axios
        .post("/templates", data)
        .then(response => {
          console.log("send");
        })
        .catch(err => {
          console.log("not send");
        });
    });
  };
}

function mapStateToProps(state) {
  return {
    user: state.user,
    contacts: state.contacts
  };
}

export default connect(mapStateToProps)(Editor);
