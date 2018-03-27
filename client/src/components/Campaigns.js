import React, { Component } from "react";
import Drop from "./dropzone";
import axios from "axios";
import { connect } from "react-redux";
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
import Spinning from "grommet/components/icons/Spinning";
import Recipients from "./Recipients.js";
import Status from "grommet/components/icons/Status";
import RevertIcon from "grommet/components/icons/base/Revert";
import {
  getContacts,
  addContact,
  deleteContact,
  updateCampaign
} from "../actions";

class Campaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      nameInput: "",
      emailInput: "",
      show: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.shouldCampaignUpdate = this.shouldCampaignUpdate.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // console.log("current contacts", this.props.contacts.contacts);
    // console.log("getting props within contacts", nextProps.contacts.contacts);
    //   this.props.dispatch(getContacts(this.props.match.params.id));
  }

  componentDidMount() {
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
        emailInput: "",
        nameInput: ""
      },
      function() {
        // console.log('reached!', this.state)
      }
    );
    // if (this.props.contacts.contacts[0]) {
    this.shouldCampaignUpdate();
    // }
  }

  shouldCampaignUpdate() {
    console.log("Campaign update is running");
    axios
      .get("/shouldCampaignUpdate", {
        params: {
          id: this.props.match.params.id
        }
      })
      .then(response => {
        console.log("should campaign update?", response.data);
        if (response.data === true) {
          this.props.dispatch(updateCampaign(this.props.match.params.id));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(id, contactid, campaignid) {
    // console.log('here', id, contactid, campaignid)
    this.props.dispatch(deleteContact(id, contactid, campaignid));
    this.props.dispatch(getContacts(this.props.match.params.id));

    // axios.post('/heyhey',{
    //   id:id,
    //   contactid:contactid,
    //   campaignid:campaignid
    // })
    // .then((response)=>{
    //   console.log(response,"dlete")
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
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
  }

  render() {
    return (
      <div>
        <Button icon={<RevertIcon />} path="/" />
        <div>
          {!this.props.contacts.contacts[0] ? (
            <Spinning />
          ) : (
            <Form>
              <FormFields>
                <Table
                  scrollable={true}
                  style={{ height: "350px", overflow: "auto" }}
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.contacts.contacts.map((contact, index) => (
                      <Recipients
                        contact={contact}
                        key={index}
                        handleDelete={this.handleDelete}
                      />
                    ))}
                  </tbody>
                </Table>
              </FormFields>
            </Form>
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
          </Form>
          <Drop campaign={this.props.match.params.id} />
          <Box align="end">
            {this.state.show === false ? (
              <Button
                label="Save"
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
