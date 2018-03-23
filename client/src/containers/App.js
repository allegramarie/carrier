import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import thunk from "redux-thunk";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Profile from "../components/Profile";
import Dashboard from "../components/Dashboard";
import BaseContent from "../components/BaseContent";
import Grommet from "grommet";
import { Box, Split } from "grommet";
import * as CampaignActions from "../actions";
import Campaigns from "../components/Campaigns";
import CreateCampaign from "../components/CreateCampaign";
import Drop from "../components/dropzone";
import PrivateRoute from "../PrivateRoute";
import { getCampaigns, getContacts } from "../actions";
import Sidebar from "../components/Sidebar";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(getCampaigns(this.props.user.user.id));
  }

  render() {
    return (
      <Grommet.App centered={false}>
        <Split flex="right" separator={false} fixed={false}>
          <Sidebar />
          <Box justify="center" align="start" pad="medium">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute path="/profile" component={Profile} />
              <Route path="/createCampaign" component={CreateCampaign} />
              <Route path="/campaigns/:id" component={Campaigns} />
              <Route path="/drop" component={Drop} />
              {/* about page -- default for unauthenticated arrivals */}
            </Switch>
          </Box>
        </Split>
      </Grommet.App>
    );
  }
}

function mapStateToProps(state) {
  return {
    campaigns: state.campaigns,
    user: state.user,
    contacts: state.contacts
  };
}

export default withRouter(connect(mapStateToProps)(App));
