import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Profile from "../components/Profile";
import Dashboard from "../components/Dashboard";
import Grommet from "grommet";
import * as CampaignActions from "../actions";

class App extends Component {
  render() {
    return (
      <Grommet.App centered={false}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" compoment={Profile} />
          {/* about page -- default for unauthenticated arrivals */}
        </Switch>
      </Grommet.App>
    );
  }
}

//const App = ({todos, actions}) => (
//<div>
//<Header addTodo={actions.addTodo} />
//<MainSection todos={todos} actions={actions} />
//</div>
//)

const mapStateToProps = state => ({
  campaigns: state.campaigns
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(CampaignActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(App);
