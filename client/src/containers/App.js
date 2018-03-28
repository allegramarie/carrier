import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Profile from "../components/Profile";
import Dashboard from "../components/Dashboard";
import Grommet from "grommet";
import { Box, Split } from "grommet";
import Campaigns from "../components/Campaigns";
import Drop from "../components/dropzone";
import PrivateRoute from "../PrivateRoute";
import { getCampaigns } from "../actions";
import Sidebar from "../components/Sidebar";
import NewCampaign from "../components/NewCampaign";
import Editor from "../components/Editor.js";
import LandingPage from "../components/LandingPage.js";

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
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/createCampaign" component={NewCampaign} />
              <PrivateRoute path="/campaigns/:id" component={Campaigns} />
              <PrivateRoute path="/campaigns/:id/edit" component={Editor} />
              <PrivateRoute path="/drop" component={Drop} />
              <Route path="/LandingPage" component={LandingPage} />
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
