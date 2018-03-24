import React, { Component } from "react";
import c3 from "c3";
import d3 from "d3";

class DataGraph {
  constructor(props) {
    super(props);
    this.state = {
      send: 144,
      open: 10,
      unsubscribe: 2
    };
    this.pieGraph = this.pieGraph.bind(this);
  }

  componentDidMount() {
    this.pieGraph();
  }

  pieGraph() {
    const chart = c3.generate({
      bindto: "#chart",
      data: {
        columns: [
          ["send", this.state.send],
          ["open", this.state.open],
          ["unsubscribe", this.state.unsubscribe]
        ],
        type: "pie"
      },
      pie: {
        label: {
          format: function(value, ratio, id) {
            return value;
          }
        }
      }
    });
  }

  render() {
    return (
      <div>
        <div id="chart" />
      </div>
    );
  }
}
