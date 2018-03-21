import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import thunk from "redux-thunk";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Profile from "../components/Profile";
import Dashboard from "../components/Dashboard";
import BaseContent from "../components/BaseContent";
import Grommet from "grommet";
import * as CampaignActions from "../actions";
import Campaigns from "../components/Campaigns";
import CreateCampaign from "../components/CreateCampaign";
import { getCampaigns, getContacts } from "../actions";

class App extends Component {
  componentWillMount() {
    this.props.dispatch(getCampaigns(this.props.user.user[0].id));
  }
  componentDidMount() {
    console.log(this.props);
    this.props.dispatch(getCampaigns(this.props.user.user[0].id));
    // this.props.dispatch(getContacts())
  }

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
  campaigns: state.campaigns,
  user: state.user,
  contacts: state.contacts
});

export default connect(mapStateToProps)(App);
