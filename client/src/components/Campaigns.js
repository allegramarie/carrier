import React, { Component } from "react";
import Drop from "./dropzone";
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
  Box,
  Select
} from "grommet";
import Spinning from "grommet/components/icons/Spinning";
import Pulse from "grommet/components/icons/Pulse";
import Recipients from "./Recipients.js";
import Status from "grommet/components/icons/Status";
import RevertIcon from "grommet/components/icons/base/Revert";
import {
  getContacts,
  addContact,
  deleteContact,
  getGroups,
  groupToCampaigns
} from "../actions";
import Auth from "../Auth";
import Split from "grommet/components/Split";
import Sidebar from "./Sidebar";

class Campaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      nameInput: "",
      emailInput: "",
      value: "",
      show: false,
      badInputs: false,
      loading: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.addGroupToContacts = this.addGroupToContacts.bind(this);
  }

  componentDidMount() {
    this.props
      .dispatch(getGroups(Auth.userID))
      .then(() => {
        this.props.dispatch(getContacts(this.props.match.params.id));
      })
      .then(() => {
        this.setState({
          loading: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleClick() {
    var checker = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      checker.test(this.state.emailInput) &&
      this.state.nameInput.length > 0
    ) {
      // console.log("here")
      this.props.dispatch(
        addContact(
          this.state.nameInput,
          this.state.emailInput,
          this.props.match.params.id
        )
      );
      this.setState({
        emailInput: "",
        nameInput: "",
        badInputs: false,
        loading: true
      });
    }
  }

  handleDelete(contactid, campaignid) {
    // console.log(contactid, campaignid)
    this.props
      .dispatch(deleteContact(contactid, campaignid))
      .then(() => {
        this.props.dispatch(getContacts(this.props.match.params.id));
      })
      .catch(err => {
        console.log(err);
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
  sendEmail() {
    this.setState({
      show: true
    });
  }

  addGroupToContacts() {
    console.log(this.props);
    this.props
      .dispatch(groupToCampaigns(this.props.match.params.id, this.state.id))
      .then(() => {
        this.props
          .dispatch(getContacts(this.props.match.params.id))
          .then(() => {
            this.setState({
              value: "",
              id: ""
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Split fixed={false} separator={false} showOnResponsive="both">
          <Sidebar />
          <Box>
            <Button icon={<RevertIcon />} path="/" />
            <Form style={{ marginLeft: "50px" }}>
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
              {this.state.badInputs === true ? (
                <p>
                  <Status value="warning" /> Email must be valid.
                </p>
              ) : (
                <p />
              )}

              <Footer pad={{ vertical: "medium" }}>
                <Button
                  label="Add"
                  onClick={() => {
                    this.handleClick();
                  }}
                />
              </Footer>
              <Drop campaign={this.props.match.params.id} />
              <Heading style={{ fontSize: "25px" }}>
                Add Group Contacts to Campaign
              </Heading>
              <Select
                placeHolder="None"
                value={this.state.value}
                options={this.props.groups.map(function(group, key) {
                  return {
                    value: group.name,
                    id: group.id,
                    key: key,
                    label: (
                      <Box direction="row" justify="start">
                        <span>{group.name}</span>
                      </Box>
                    )
                  };
                })}
                onChange={event => {
                  this.setState({
                    value: event.option.value,
                    id: event.option.id
                  });
                }}
              />
              <Footer pad={{ vertical: "medium" }}>
                <Button
                  label="Add"
                  onClick={() => {
                    this.addGroupToContacts();
                  }}
                />
              </Footer>
            </Form>
            <Box align="end">
              <Button
                label="Edit Template"
                path={`/campaigns/${this.props.match.params.id}/edit`}
              />
            </Box>
          </Box>
          {this.state.loading === true ? (
            <Box
              style={{
                position: "relative",
                marginLeft: "100px",
                marginTop: "50px",
                marginRight: "50px"
              }}
            >
              {!this.props.contacts[0] ? (
                <Pulse />
              ) : (
                <Form style={{ width: "550px", overflow: "auto" }}>
                  <FormFields>
                    <Table
                      scrollable={true}
                      style={{
                        height: "700px",
                        overflow: "auto",
                        border: "solid",
                        borderRadius: "1%"
                      }}
                    >
                      <thead style={{ overflow: "auto" }}>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Subscribed</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.contacts.map((contact, index) => (
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
            </Box>
          ) : (
            <Spinning />
          )}
        </Split>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    contacts: state.contacts.contacts,
    groups: state.groups.groups
  };
}

export default connect(mapStateToProps)(Campaigns);
