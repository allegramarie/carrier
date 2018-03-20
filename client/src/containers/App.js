import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Dashboard from "../components/Dashboard";
import * as CampaignActions from "../actions";
import CreateCampaign from "../components/CreateCampaign";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/createCampaign" component={CreateCampaign} />
        {/* about page -- default for unauthenticated arrivals */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  campaigns: state.campaigns
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(CampaignActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
