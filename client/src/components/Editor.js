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

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendgridEmails: [],
      themes: [
        { themeName: "custom" },
        { themeName: "Summer Events" },
        { themeName: "HackReactor" }
      ],
      popup: false,
      sendPopup: false
    };
    this.onLoad = this.onLoad.bind(this);
    this.exportHtml = this.exportHtml.bind(this);
    this.saveDesign = this.saveDesign.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    axios.post("/saveContactEmail", this.state.contactInfo);
    console.log(this.state.item, "in onClick");
  }

  render() {
    console.log(this.state);
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
              value: info.themeName,
              sub: info,
              label: (
                <Box direction="row" justify="center">
                  <span>{info.themeName}</span>
                </Box>
              )
            };
          })}
          value={undefined}
          onChange={e => {
            if (e.option.value === "Summer Events") {
              return this.editor.loadDesign(test);
            } else if (e.option.value === "HackReactor") {
              return this.editor.loadDesign(test2);
            } else {
              this.editor.loadDesign(custom);
            }
          }}
        />
        <div>
          <EmailEditor
            style={{
              height: "900px",
              width: "100%",
              borderStyle: "solid",
              borderRadius: "1%"
            }}
            ref={editor => (this.editor = editor)}
            onLoad={this.onLoad}
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
        sendgridEmails: this.state.sendgridEmails
      });
    });
  };

  saveDesign = () => {
    this.editor.saveDesign(design => {
      console.log("saveDesign", design);
      this.setState({ popup: true });
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

export default connect(mapStateToProps)(Editor);
