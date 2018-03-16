import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import BaseContent from '../components/BaseContent';
import {Test} from '../components/Test';
import * as CampaignActions from '../actions';

class App extends Component {
  render() {
    return (
      <div>
        {console.log(BaseContent)}
        <Route exact path="/" component={BaseContent} />
        <Route path="/test" component={Test} />
      </div>
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
  campaigns: state.campaigns,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(CampaignActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
