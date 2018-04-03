import React from "react";
import NewGroup from "./NewGroup";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinning from "grommet/components/icons/Spinning";
import Sidebar from "./Sidebar";
// import { createBrowserHistory } from "history";
import { Heading } from "grommet";
import Split from "grommet/components/Split";
import Accordion from "grommet/components/Accordion";
import AccordionPanel from "grommet/components/AccordionPanel";
import Button from "grommet/components/Button";
import EditIcon from "grommet/components/icons/base/Edit";
import Auth from "../Auth";
import { getGroups, deleteGroup } from "../actions";
import ClearIcon from "grommet/components/icons/base/Clear";

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      campaigns: [],
      id: 0,
      addCampaign: false,
      loading: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getGroups = this.getGroups.bind(this);
  }

  componentDidMount() {
    this.getGroups();
  }
  getGroups() {
    this.props
      .dispatch(getGroups(Auth.userID))
      .then(() => {
        this.setState({
          loading: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleDelete(group) {
    this.props
      .dispatch(deleteGroup(group.id, group.userid))
      .then(() => {
        this.getGroups();
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleClick(group) {
    this.setState({
      show: true,
      id: group
    });
  }

  render() {
    if (this.state.show === true) {
      return <Redirect to={`/groups/${this.state.id}`} />;
    } else {
      return (
        <div>
          <Split flex="right" separator={false} fixed={false}>
            <Sidebar />
            {this.state.loading === true ? (
              <div>
                <NewGroup />
                <Heading tag="h2">All Groups</Heading>
                <Accordion
                  openMulti={true}
                  style={{ width: "70%", height: "625px", overflow: "auto" }}
                >
                  {this.props.groups.map((group, index) => (
                    <AccordionPanel
                      key={index}
                      heading={`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Group Name: ${
                        group.name
                      }`}
                    >
                      {group.status === "Sent" ? (
                        <p />
                      ) : (
                        <div>
                          <Button
                            icon={<EditIcon />}
                            label="Edit"
                            onClick={() => {
                              this.handleClick(group.id);
                            }}
                            style={{ width: "150px" }}
                          />
                          <Button
                            icon={<ClearIcon />}
                            primary="true"
                            label="Delete"
                            onClick={() => {
                              this.handleDelete(group);
                            }}
                            style={{ width: "150px" }}
                          />
                        </div>
                      )}
                    </AccordionPanel>
                  ))}
                </Accordion>
              </div>
            ) : (
              <div>
                <Spinning />
              </div>
            )}
          </Split>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    contacts: state.contacts,
    groups: state.groups.groups
  };
}

export default connect(mapStateToProps)(Groups);
