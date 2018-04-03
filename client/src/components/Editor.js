import React, { Component } from "react";
import { Box, Button, Select } from "grommet";
import Toast from "grommet/components/Toast";
import EmailEditor from "react-email-editor";
import test from "../email-templates/test.json";
import test2 from "../email-templates/test2.json";
import custom from "../email-templates/custom.json";
import { connect } from "react-redux";
import axios from "axios";
import Auth from "../Auth";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "grommet/components/Footer";
import Anchor from "grommet/components/Anchor";
import Title from "grommet/components/Title";
import Menu from "grommet/components/Menu";
import Paragraph from "grommet/components/Paragraph";
import carrierpigeon3 from "./carrier-pigeon3.png";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      sendgridEmails: [],
      themes: [
        // Includes the base email templates
        // + one user saved draft campaign templates
        { name: "test", content: test },
        { name: "test2", content: test2 },
        { name: "custom", content: custom }
      ],
      popup: false,
      sendPopup: false,
      show: false
    };
    this.exportHtml = this.exportHtml.bind(this);
    this.saveDesign = this.saveDesign.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log("component will mount!");
    const campaignId = this.props.match.params.id;
    // If the selected template is one of the base templates, load the JSON
    // into the Editor.
    // Else, load the user template from the server (via S3)
    axios
      .get(`/templates/${campaignId}`)
      .then(response => {
        const templateJSON = response.data.templateJSON;
        if (templateJSON !== "") {
          const parsedJSON = JSON.parse(templateJSON);
          const name = "Current Draft";
          this.setState({
            themes: [...this.state.themes, { name, content: parsedJSON }]
          });
          this.loadTemplateByName(name);
          // this.editor.loadDesign(parsedJSON);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  loadTemplateByName = name => {
    // If the selected template is one of the base templates, load the JSON
    // into the Editor.
    for (const theme of this.state.themes) {
      if (theme.name === name) {
        return this.editor.loadDesign(theme.content);
      }
    }
    //
    // Else, load the user template from the server (via S3)
    const campaignId = this.props.match.params.id;
    axios.get(`/templates/${campaignId}`).then(response => {
      const templateJSON = response.data.templateJSON;
      const parsedJSON = JSON.parse(templateJSON);
      this.editor.loadDesign(parsedJSON);
    });
  };

  handleChange(date) {
    this.setState({
      startDate: date,
      date: parseInt(
        moment
          .unix(date)
          .utc()
          ._i.toString()
          .slice(0, -6)
      )
    });
    console.log("date", moment.unix(date).utc()._i);
    // console.log('old date', this.state.startDate)
    // console.log('this is the date', date)
    console.log(
      "moment test",
      parseInt(
        moment
          .unix(date)
          .utc()
          ._i.toString()
          .slice(0, -6)
      )
    );
  }

  render() {
    // console.log(Auth.userID,"here")
    // if (this.state.show === true) {
    //   // console.log(this.state.cid.id)
    //   return <Redirect to="/" />;
    // }
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
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={1}
          dateFormat="LLL"
          timeCaption="time"
        />
        <Select
          style={{ width: "37%", float: "right" }}
          placeHolder="Start With a Template"
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
            marginTop: "5px"
          }}
          label="Save Template"
          type="submit"
          primary={true}
          onClick={this.saveDesign}
        />
        <Button
          style={{
            position: "relative",
            float: "right",
            marginLeft: "10px",
            marginTop: "5px"
          }}
          label="Send Scheduled Email"
          type="submit"
          primary={true}
          onClick={this.exportHtml}
        />
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
                style={{
                  position: "relative",
                  float: "left",
                  height: "60px",
                  marginTop: "5px",
                  marginLeft: "65px",
                  marginBottom: "5px"
                }}
              />
              CarrierPigeon
            </Title>
          </Anchor>
          <Box direction="row" align="center" pad={{ between: "medium" }}>
            <Paragraph margin="none">© CarrierPigeon</Paragraph>
            <Menu
              direction="row"
              size="medium"
              dropAlign={{ right: "right" }}
              style={{ marginRight: "50px" }}
            >
              <Anchor path="/">Home</Anchor>
              <Anchor path={`/campaigns/${this.props.match.params.id}`}>
                Back
              </Anchor>
              <Anchor path="/contactus">Contact Us</Anchor>
              <Anchor path="#">About</Anchor>
            </Menu>
          </Box>
        </Footer>
      </div>
    );
  }

  //Need to Keep this here to test and for Regex reference
  exportHtml = () => {
    // TODO: Scheduling?
    console.log(this.state.date);
    var sendAt = this.state.date || `${Date.now()}`.slice(0, 10);
    console.log(sendAt);
    this.setState({ sendPopup: true });
    this.editor.exportHtml(data => {
      const { html } = data;
      var a = html;
      var result = a
        .replace(/>\s+|\s+</g, function(m) {
          return m.trim();
        })
        .replace(/(\r\n|\n|\r)/gm, " ");
      console.log(result);
      console.log(this.props.contacts.contacts);
      axios.post("/exportHTML", {
        sendAt: sendAt,
        htmlEmailContent: a,
        contacts: this.props.contacts.contacts.filter(
          contact => !contact.unsubscribe
        ),
        campaignId: this.props.match.params.id
      });
    });
  };

  saveDesign = () => {
    const campaignId = this.props.match.params.id;
    const userID = Auth.userID;
    let data = { campaignId, userID };
    this.editor.saveDesign(designJSON => {
      data.designJSON = designJSON;
      this.setState({ popup: true });

      axios
        .post("/templates", data)
        .then(response => {
          this.setState({
            show: true
          });
        })
        .catch(err => {});
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
