import React from "react";
import { Table, Paragraph, Box, Value } from "grommet";
import NewGroup from "./NewGroup";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinning from "grommet/components/icons/Spinning";
import Pulse from "grommet/components/icons/Pulse";
import Sidebar from "./Sidebar";
// import { createBrowserHistory } from "history";
import { Header, Heading } from "grommet";
import Split from "grommet/components/Split";
import Accordion from "grommet/components/Accordion";
import AccordionPanel from "grommet/components/AccordionPanel";
import Button from "grommet/components/Button";
import EditIcon from "grommet/components/icons/base/Edit";
import Meter from "grommet/components/Meter";
import Auth from "../Auth";
import { getGroups } from "../actions";

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
  }

  componentDidMount() {
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
  componentWillReceiveProps(nextProps) {
    // console.log(
    //   "getting props within campaign table",
    //   nextProps.campaigns.campaigns,
    //   this.props
    // );
  }

  handleClick(group) {
    // console.log(campaigns, status)
    this.setState({
      show: true,
      id: group
    });
  }

  render() {
    console.log("groups", this.props.groups.groups, "state", this.state.id);
    const that = this;
    if (this.state.show === true) {
      console.log("show", this.state.show);
      return <Redirect to={`/groups/${this.state.id}`} />;
    } else {
      // if (this.state.addCampaign === true) {
      //   return <Redirect to={"/createCampaign"} />;
      // }
      // if (!this.props.campaigns.campaigns[0]) {
      //   return (
      //     <Pulse
      //       onClick={() => {
      //         this.setState({ addCampaign: true });
      //       }}
      //     />
      //   );
      // }
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
                  {this.props.groups.groups.map((group, index) => (
                    <AccordionPanel
                      key={index}
                      heading={`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Group Name: ${
                        group.name
                      }`}
                    >
                      {group.status === "Sent" ? (
                        <p />
                      ) : (
                        <Button
                          icon={<EditIcon />}
                          label="Edit"
                          onClick={() => {
                            this.handleClick(group.id);
                          }}
                          style={{ width: "150px" }}
                        />
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
    groups: state.groups,
    allContacts: state.allContacts
  };
}

export default connect(mapStateToProps)(Groups);
