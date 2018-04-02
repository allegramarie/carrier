import React from "react";
import ReactDOM from "react-dom";
//import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import App from "./containers/App";

//import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, applyMiddleware(thunk));

// Wrap this with Provider and BrowserRouter
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
//registerServiceWorker();
