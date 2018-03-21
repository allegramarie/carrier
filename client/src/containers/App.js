import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Profile from "../components/Profile";
import Dashboard from "../components/Dashboard";
import BaseContent from "../components/BaseContent";
import Grommet from "grommet";
import * as CampaignActions from "../actions";
import Campaigns from "../components/Campaigns";
import CreateCampaign from "../components/CreateCampaign";

class App extends Component {
  render() {
    return (
      <Grommet.App centered={false}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
          <Route path="/createCampaign" component={CreateCampaign} />
          <Route path="/campaigns" component={Campaigns} />
          {/* about page -- default for unauthenticated arrivals */}
        </Switch>
      </Grommet.App>
    );
  }
}

const mapStateToProps = state => ({
  campaigns: state.campaigns
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(CampaignActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(App);
