import React from "react";
import c3 from "c3";
import d3 from "d3";
import axios from "axios";
import Anchor from "grommet/components/Anchor";
import Box from "grommet/components/Box";
import Footer from "grommet/components/Footer";
import Paragraph from "grommet/components/Paragraph";
import Title from "grommet/components/Title";
import Menu from "grommet/components/Menu";
import carrierpigeon3 from "./carrier-pigeon3.png";

class DataGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      send: 0,
      open: 0,
      unsubscribe: 0
    };
    this.pieGraph = this.pieGraph.bind(this);
    this.getData = this.getData.bind(this);
    this.barGraph = this.barGraph.bind(this);
  }

  componentDidMount() {
    this.getData()
      .then(() => {
        this.pieGraph();
        this.barGraph();
      })
      .catch(err => {
        console.log(err);
      });
  }
  // this.setState({
  //   arrayvar: [...this.state.arrayvar, newelement]
  // })
  getData() {
    return axios
      .get("/getData", {
        params: {
          campaignid: this.props.match.params.id
        }
      })
      .then(response => {
        var countOpen = 0;
        var countUnsubscribe = 0;

        // console.log(response.data.rows, "data graph")
        response.data.rows.map(contact => {
          // console.log(contact)
          if (contact.opened !== null) {
            countOpen++;
          }
          if (contact.unsubscribe !== false) {
            countUnsubscribe++;
          }
          this.setState({
            send: response.data.rows.length,
            open: countOpen,
            unsubscribe: countUnsubscribe
          });
        });
      })
      .catch(err => {
        console.log(err, "error getting data graph");
      });
  }

  pieGraph() {
    // console.log(this.state)
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
  barGraph() {
    const chart2 = c3.generate({
      bindto: "#chart2",
      data: {
        columns: [
          ["send", this.state.send],
          ["open", this.state.open],
          ["unsubscribe", this.state.unsubscribe]
        ],
        type: "bar"
      },
      bar: {
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
        <div id="chart2" />
        <Footer
          justify="between"
          colorIndex="grey-1"
          size="small"
          style={{ position: "fixed", bottom: 0 }}
        >
          <Title>
            <img
              src={carrierpigeon3}
              alt="LOGO"
              style={{
                position: "relative",
                float: "left",
                height: "60px",
                marginTop: "5px",
                marginLeft: "65px",
                marginBottom: "5px"
              }}
            />
            Carrier
          </Title>
          <Box direction="row" align="center" pad={{ between: "medium" }}>
            <Paragraph margin="none">© CARRIER</Paragraph>
            <Menu
              direction="row"
              size="medium"
              dropAlign={{ right: "right" }}
              style={{ marginRight: "50px" }}
            >
              <Anchor path="/">Home</Anchor>
              <Anchor path="/contactus">Contact Us</Anchor>
              <Anchor path="#">About</Anchor>
            </Menu>
          </Box>
        </Footer>
      </div>
    );
  }
}

export default DataGraph;
