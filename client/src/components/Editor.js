import React, { Component } from "react";
import { Box, Button, Select } from "grommet";
import Toast from "grommet/components/Toast";
import EmailEditor from "react-email-editor";
import test from "./test.json";
import test2 from "./test2.json";
import custom from "./custom.json";
import { connect } from "react-redux";
import axios from "axios";
import { $, jQuery } from "jquery";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
// import DateTimePicker from 'react-datetime-picker';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      sendgridEmails: ["eshum89@gmail.com"],
      themes: [
        { themeName: "custom" },
        { themeName: "Summer Events" },
        { themeName: "HackReactor" },
        { themeName: "Draft" }
      ],
      popup: false,
      sendPopup: false,
      draft: ""
    };
    this.onLoad = this.onLoad.bind(this);
    this.exportHtml = this.exportHtml.bind(this);
    this.saveDesign = this.saveDesign.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log(this.state.startDate);
    var asdf;
    axios
      .get("/retrieveDraft")
      .then(response => {
        console.log(response.data);
        axios
          .get("/getThatShit", { params: { fook: response.data } })
          .then(res => {
            console.log("yoyoyoy", res.data);
            this.state.draft = res.data;
            // this.state.themes.push({themeName: ""})
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  //   componentDidMount(){
  //     console.log('Fetch');
  //     fetch("https://horizons-json-cors.s3.amazonaws.com/products.json")
  //     .then((resp) => (resp.json()))
  //     .then((json) => {
  //       var productUrlArr = [];
  //       for (var i = 0; i < json.length; i++) {
  //         productUrlArr.push(json[i].url);
  //       }
  //       console.log(productUrlArr);
  //     }).catch((err) => {
  //       console.log('error', err);
  //     });
  // }

  handleChange(date) {
    // this.setState({
    //   startDate: moment.unix(date).utc()._i.toString().slice(0,-6)
    // });
    // this.setState({startDate: 213})

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
    console.log("doodoo", this.state.draft);
    var draft;
    if (this.state.draft) {
      draft = this.state.draft;
    }
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
            } else if (e.option.value == "custom") {
              return this.editor.loadDesign(custom);
            } else if (e.option.value === "Draft") {
              return this.editor.loadDesign(this.state.draft);
            }
          }}
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
    var temp = this.state.date;
    this.setState({ sendPopup: true });
    this.editor.exportHtml(data => {
      const { html } = data;
      // console.log("exportHtml", html);
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
        sendTime: temp
      });
    });
  };

  saveDesign = () => {
    this.editor.saveDesign(design => {
      console.log("saveDesign", design);
      this.setState({ popup: true });
      axios
        .post("/dropTemp", design)
        .then(response => {
          console.log("eugenes", response);
        })
        .catch(err => {
          console.log("not send");
        });
    });
  };

  onLoad = theme => {
    console.log("fuck");
    // this.editor.addEventListener('onDesignLoad', this.onDesignLoad)
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

export default connect(mapStateToProps)(Editor);
