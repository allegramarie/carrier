import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import C3Chart from 'react-c3js';
// import 'c3/c3.css';
import c3 from "c3";
import d3 from "d3";
import thunk from "redux-thunk";
import { connect } from "react-redux";
// import FormField from 'grommet/components/FormField';
import {
  TextInput,
  Form,
  Button,
  Header,
  Heading,
  Footer,
  Table,
  FormFields,
  Box,
  Select
} from "grommet";
import Spinning from "grommet/components/icons/Spinning";
// import List from 'grommet/components/List';
// import ListItem from 'grommet/components/ListItem';
import Recipients from "./Recipients.js";
import Status from "grommet/components/icons/Status";
import Toast from "grommet/components/Toast";
import RevertIcon from "grommet/components/icons/base/Revert";
import { getContacts, addContact } from "../actions";

class Campaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // item:[{name:['Alex', 'Eric']},{email:['Alex@hackreactor.com','Eric@hackreactor.com']}],
      contacts: [],
      nameInput: "",
      emailInput: "",
      show: false,
      send: 144,
      open: 10,
      unsubscribe: 2
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.pieGraph = this.pieGraph.bind(this);
    // this.handleBack = this.handleBack.bind(this);
  }
  // handleBack(){
  //   // console.log(this.props.router,'router')
  //   this.props.router.goBack()
  // }
  componentWillReceiveProps(nextProps) {
    // console.log(
    //   "getting props within contacts",
    //   nextProps.contacts.contacts
    // );
    this.props.dispatch(getContacts(this.props.match.params.id));
  }

  componentDidMount() {
    this.pieGraph();
    this.props.dispatch(getContacts(this.props.match.params.id));
  }

  handleClick() {
    this.props.dispatch(
      addContact(
        this.state.nameInput,
        this.state.emailInput,
        this.props.match.params.id
      )
    );
    this.setState(
      {
        // this.state.item.concat({name: this.state.nameInput,email: this.state.emailInput})
        // [...this.state.myArray, ...[1,2,3] ]
        emailInput: "",
        nameInput: ""
        // show: true
      },
      function() {
        // console.log('reached!', this.state)
      }
    );
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
  sendEmail() {
    console.log("send");
    this.setState({
      show: true
    });
    // axios
    //   .post("/send")
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  pieGraph() {
    const chart = c3.generate({
      bindto: "#chart",
      data: {
        columns: [
          ["send", this.state.send],
          ["open", this.state.open],
          ["unsubscribe", this.state.unsubscribe]
        ],
        type: "pie"
      },
      pie: {
        label: {
          format: function(value, ratio, id) {
            return value;
          }
        }
      }
    });
  }

  render() {
    //   var currentdate = new Date();
    // var datetime = "Last Sync: "
    //                 + (currentdate.getMonth()+1)  + "/"
    //                 + (currentdate.getDate()-7) + "/"
    //                 + currentdate.getFullYear()
    //                 // + currentdate.getHours() + ":"
    //                 // + currentdate.getMinutes() + ":"
    //                 // + currentdate.getSeconds();
    //                 console.log(datetime)
    //   const time = function Last7Days() {
    //     var result = [];
    //     for (var i=0; i<7; i++) {
    //         var d = new Date();
    //         d.setDate(d.getDate() - i);
    //         result.push( formatDate(d) )
    //     }
    //
    //     return(result.join(','));
    // }
    // console.log(time)

    // console.log('here campaigns',this.props.router)
    // console.log(this.state.nameInput,"name")
    // console.log(this.state.emailInput,"email")

    // console.log(this.state.item);
    // console.log(this.state);
    return (
      // console.log(this.state.item)
      <div>
        <Button icon={<RevertIcon />} path="/" />
        <div>
          {!this.props.contacts.contacts[0] ? (
            <Spinning />
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {this.props.contacts.contacts.map((contact, index) => (
                  <Recipients contact={contact} key={index} />
                ))}
              </tbody>
            </Table>
          )}
          <Form>
            <Header>
              <Heading style={{ fontSize: "25px" }}>Input New Emails</Heading>
            </Header>
            <FormFields>
              <TextInput
                value={this.state.nameInput}
                onDOMChange={e => {
                  this.handleName(e);
                }}
                placeHolder="Name"
              />
              <TextInput
                value={this.state.emailInput}
                onDOMChange={e => {
                  this.handleEmail(e);
                }}
                placeHolder="Email"
              />
            </FormFields>
            <Footer pad={{ vertical: "medium" }}>
              <Button
                label="Add"
                onClick={() => {
                  this.handleClick();
                }}
              />
            </Footer>
            <div id="chart" />
          </Form>
          <Box align="end">
            {this.state.show === false ? (
              <Button
                label="Send"
                primary={true}
                onClick={() => {
                  this.sendEmail();
                }}
              />
            ) : (
              <Status value="ok" size="large" />
            )}
          </Box>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    contacts: state.contacts
  };
}

export default connect(mapStateToProps)(Campaigns);
