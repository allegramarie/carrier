import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  FormFields
} from "grommet";
// import List from 'grommet/components/List';
// import ListItem from 'grommet/components/ListItem';
import Recipients from "./Recipients.js";

class Campaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // item:[{name:['Alex', 'Eric']},{email:['Alex@hackreactor.com','Eric@hackreactor.com']}],
      item: [
        { name: "Alex", email: "Alex@hackreactor.com" },
        { name: "Eric", email: "Eric@hackreactor.com" }
      ],
      nameInput: "",
      emailInput: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
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

  render() {
    // console.log('here campaigns',this.props.router)
    // console.log(this.state.nameInput,"name")
    // console.log(this.state.emailInput,"email")

    console.log(this.state.item);
    console.log(this.state);
    return (
      // console.log(this.state.item)
      <div>
        <div className="navigationButtonsLeft">
          <Link to="/">Back</Link>
        </div>
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
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    campaigns: state.campaigns
  };
}

export default connect(mapStateToProps)(Campaigns);
