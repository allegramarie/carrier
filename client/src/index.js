import React from "react";
import ReactDOM from "react-dom";
//import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";
import App from "./containers/App";

//import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);

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
