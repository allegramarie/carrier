import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import thunk from 'redux-thunk'
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
  Box
} from "grommet";
// import List from 'grommet/components/List';
// import ListItem from 'grommet/components/ListItem';
import Recipients from "./Recipients.js";
import Status from "grommet/components/icons/Status";
import Toast from "grommet/components/Toast";
import RevertIcon from "grommet/components/icons/base/Revert";

class Campaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // item:[{name:['Alex', 'Eric']},{email:['Alex@hackreactor.com','Eric@hackreactor.com']}],
      item: [
        { name: "Jerry", email: "jieningjchen@gmail.com" },
        { name: "Adam", email: "adammateo@gmail.com" },
        { name: "Chris", email: "christopher.rigoli@gmail.com" },
        { name: "Riley", email: "rileyalsman@gmail.com" },
        { name: "Juan", email: "juangalan.a.s@gmail.com" },
        { name: "Sin", email: "sin11eric@gmail.com" },
        { name: "Manos", email: "manolaki@gmail.com" },
        { name: "Quack", email: "qisforq@gmail.com" },
        { name: "Levine", email: "aalexlevine@gmail.com" },
        { name: "Brent", email: "brent.timothy.hagen@gmail.com" },
        { name: "Rory", email: "rory.eagan@gmail.com" }
      ],
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
    // this.handleBack = this.handleBack.bind(this);
  }
  // handleBack(){
  //   // console.log(this.props.router,'router')
  //   this.props.router.goBack()
  // }
  handleClick() {
    this.setState({
      item: [
        ...this.state.item,
        { name: this.state.nameInput, email: this.state.emailInput }
      ],
      // this.state.item.concat({name: this.state.nameInput,email: this.state.emailInput})
      // [...this.state.myArray, ...[1,2,3] ]
      emailInput: "",
      nameInput: ""
      // show: true
    });
    console.log(this.state.item, "in onClick");
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

  render() {
    // console.log('here campaigns',this.props.router)
    // console.log(this.state.nameInput,"name")
    // console.log(this.state.emailInput,"email")

    console.log(this.state.item);
    console.log(this.state);
    return (
      // console.log(this.state.item)
      <div>
        <Button icon={<RevertIcon />} path="/" />
        <div>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {this.state.item.map((items, index) => (
                <Recipients items={items} key={index} />
              ))}
            </tbody>
          </Table>
          <Form>
            <Header>
              <Heading style={{ fontSize: "25px" }}>Input New Emails</Heading>
            </Header>
            <FormFields>
              <TextInput
                onDOMChange={e => {
                  this.handleName(e);
                }}
                placeHolder="Name"
              />
              <TextInput
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

export default Campaigns;
