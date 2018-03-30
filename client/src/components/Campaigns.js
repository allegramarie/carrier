import React, { Component } from "react";
import Drop from "./dropzone";
import axios from "axios";
import { connect } from "react-redux";
import {
  TextInput,
  Form,
  Button,
  Header,
  Anchor,
  Heading,
  Footer,
  Table,
  FormFields,
  Box
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
  updateCampaign
} from "../actions";
import Auth from "../Auth";
import Notification from "grommet/components/Notification";
import Split from "grommet/components/Split";
import Sidebar from "./Sidebar";

class Campaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      nameInput: "",
      emailInput: "",
      show: false,
      badInputs: false,
      loading: false
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
    // console.log(Auth.userID,"here")

    this.props
      .dispatch(getContacts(this.props.match.params.id))
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
    if (
      this.state.emailInput.indexOf("@") !== -1 &&
      this.state.nameInput.length > 0
    ) {
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
          nameInput: "",
          badInputs: false
        },
        function() {
          // console.log('reached!', this.state)
        }
      );
      if (this.props.contacts.contacts.length === 0) {
        this.shouldCampaignUpdate();
      }
    } else {
      this.setState({ badInputs: true });
    }
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
    console.log("here", id, contactid, campaignid);
    this.props.dispatch(deleteContact(id, contactid, campaignid));
    this.props.dispatch(getContacts(this.props.match.params.id));
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
          {this.state.badInputs === true ? (
            <Notification
              style={{ width: "100%" }}
              message="Please Enter a Valid Email"
              size="small"
              status="critical"
            />
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
        </Form>
        <Drop campaign={this.props.match.params.id} />
        <Box align="end">
          <Button
            label="Edit Template"
            path={`/campaigns/${this.props.match.params.id}/edit`}
          />
        </Box>
        {this.state.loading === true ? (
          <div style={{ position: "absolute", right: 70, top: 60 }}>
            {!this.props.contacts.contacts[0] ? (
              <Pulse />
            ) : (
              <Form style={{ width: "500px" }}>
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
          </div>
        ) : (
          <div>
            <Spinning />
          </div>
        )}
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
