import React, { Component } from "react";
import { connect } from "react-redux";
import {
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
import Pulse from "grommet/components/icons/Pulse";
import GroupMembers from "./GroupMembers.js";
import RevertIcon from "grommet/components/icons/base/Revert";
import {
  getGroupContacts,
  deleteGroupContact,
  getAllContacts,
  addGroupContacts
} from "../actions";
import Auth from "../Auth";
import Split from "grommet/components/Split";
import Sidebar from "./Sidebar";

class GroupDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      value: "",
      sub: "",
      contactid: "",
      show: false,
      badInputs: false,
      loading: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props
      .dispatch(getGroupContacts(this.props.match.params.id))
      .then(() => {
        this.props.dispatch(getAllContacts(Auth.userID));
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
    this.props
      .dispatch(
        addGroupContacts(
          this.props.match.params.id,
          this.state.contactid,
          this.state.value,
          this.state.sub
        )
      )
      .then(() => {
        this.setState({
          value: "",
          sub: "",
          contactid: "",
          badInputs: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleDelete(contact) {
    this.props
      .dispatch(
        deleteGroupContact(contact.id, contact.contactid, contact.groupid)
      )
      .then(() => {
        this.props.dispatch(getGroupContacts(this.props.match.params.id));
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    var thing = [];
    var emailchecker = [];
    if (this.props.allContacts) {
      var arr = this.props.allContacts;
      for (var i = 0; i < arr.length; i++) {
        if (emailchecker.indexOf(arr[i].email) === -1) {
          emailchecker.push(arr[i].email);
          thing.push(arr[i]);
        }
      }
    }

    return (
      <div>
        <Split flex="right" separator={false} fixed={false}>
          <Sidebar />
          <Box>
            <Button icon={<RevertIcon />} path="/groups" />
            <Form style={{ marginLeft: "50px" }}>
              <Header>
                <Heading style={{ fontSize: "25px" }}>
                  Add Contacts to Group
                </Heading>
              </Header>
              <FormFields>
                <Select
                  placeHolder="None"
                  value={this.state.value}
                  options={thing.map(function(contact, key) {
                    return {
                      value: contact.name,
                      sub: contact.email,
                      contactid: contact.id,
                      label: (
                        <Box direction="row" justify="start">
                          <span>{contact.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="secondary">
                            {contact.email}
                          </span>
                        </Box>
                      )
                    };
                  })}
                  onChange={event => {
                    this.setState(
                      {
                        value: event.option.value,
                        sub: event.option.sub,
                        contactid: event.option.contactid
                      },
                      function() {
                        console.log("clicked!", this.state.contactid);
                      }
                    );
                  }}
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
          </Box>
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
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subscribed</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.contacts.map((contact, index) => (
                        <GroupMembers
                          contact={contact}
                          key={index}
                          handleDelete={() => {
                            this.handleDelete(contact);
                          }}
                        />
                      ))}
                    </tbody>
                  </Table>
                </FormFields>
              </Form>
            )}
          </Box>
        </Split>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    contacts: state.contacts.contacts,
    groups: state.groups,
    allContacts: state.allContacts.allContacts
  };
}

export default connect(mapStateToProps)(GroupDetails);
