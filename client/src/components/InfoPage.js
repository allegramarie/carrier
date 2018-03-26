import React, { Component } from "react";
import Responsive from "grommet/utils/Responsive";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import Headline from "grommet/components/Headline";
import Button from "grommet/components/Button";
import LinkNext from "grommet/components/icons/base/LinkNext";
import people from "./people.svg";
import Meter from "grommet/components/Meter";
import Legend from "grommet/components/Legend";
import Value from "grommet/components/Value";
import FormFields from "grommet/components/FormFields";
// import iMap from './iMap.js'
import WorldMap from "grommet/components/WorldMap";

export default class infoPage extends Component {
  constructor() {
    super();

    this._onResponsive = this._onResponsive.bind(this);

    this.state = {
      layout: "large"
    };
  }

  componentDidMount() {
    this._responsive = Responsive.start(this._onResponsive);
  }

  componentWillUnmount() {
    this._responsive.stop();
  }

  _onResponsive(small) {
    this.setState({
      layout: small ? "small" : "large"
    });
  }

  render() {
    const statImg = (
      <img
        style={{ maxWidth: "752px", width: "100%", height: "200px" }}
        src={people}
      />
    );

    return (
      <Box
        className="dashboard"
        justify="center"
        align="center"
        full={true}
        pad="medium"
        colorIndex="neutral-3-a"
      >
        <Box className="infographic-start" direction="column">
          <Box justify="center" align="start">
            <Box direction="row">
              <Headline size="medium" strong={true}>
                Worldwide Email Usage
              </Headline>
            </Box>
            <Box direction="column">
              <Heading tag="h3">
                Email use worldwide will top 3 billion users by 2020. Currently
                205 billion emails are sent every day. This figure is expected
                to grow at an average annual rate of 3%, reaching over 246
                billion by the end of 2019.
              </Heading>
              <Box align="start" direction="row" responsive={false}>
                <Button
                  href="#"
                  label="Learn More"
                  plain={true}
                  icon={<LinkNext />}
                />
              </Box>
            </Box>
          </Box>
          <Box
            justify="start"
            className="infographic-stat"
            responsive={false}
            direction="row"
            style={{ padding: "20px 0" }}
          >
            {statImg}
            <Box direction="column" style={{ marginLeft: "100px" }}>
              <Heading tag="h4" strong={true} margin="none">
                Nearly
              </Heading>
              <Heading tag="h1" strong={true}>
                88
                <span className="unit">%</span>
                <span className="support"> (or 2.22B people)</span>
              </Heading>
              <Heading tag="h3">
                of smartphone users actively check emails on their phones.
              </Heading>
            </Box>
          </Box>
        </Box>
        <Box
          className="stacked-row"
          direction="row"
          pad={{ vertical: "medium" }}
        >
          <Box
            className="meter-box col__span-25"
            justify="start"
            pad={{ horizontal: "medium" }}
            align="center"
          >
            <Meter
              type="circle"
              label={<Value value={2.7} colorIndex="graph-3" units="Bil" />}
              threshold={3}
              max={3.2}
              value={2.7}
              onActive={() => {}}
            />
            <Heading tag="h3">
              Based on Statistics, eMail has an Average ROI of $38/dollar spent.
              80% of professionals said email marketing drives customer
              aquisition and retention. And most importantly, eMail has a higher
              conversion rate than social mediaand search combined.
            </Heading>
          </Box>

          <Box
            className="area-box col__span-25"
            justify="start"
            pad={{ horizontal: "medium" }}
            align="center"
          >
            <Meter
              type="circle"
              label={<Value value={40} units="GB" />}
              threshold={90}
              max={100}
              value={40}
              onActive={() => {}}
            />
            <Heading tag="h3">
              {
                "Based on Statistics, eMail has an Average ROI of $38/dollar spent. 80% of professionals said email marketing drives customer aquisition and retention. And most importantly, eMail has a higher conversion rate than social mediaand search combined."
              }
            </Heading>
          </Box>
          <Box
            className="map-box col__span-50"
            justify="start"
            pad={{ horizontal: "medium" }}
            align="center"
          >
            {/*            <Meter type='circle'
              label={<Value value={40}
              units='GB' />}
              threshold={90}
              max={100}
              value={40}
              onActive={()=>{}} />*/}
            <WorldMap
              zoom={false}
              colorIndex=""
              series={[
                {
                  continent: "NorthAmerica",
                  label: "North America",
                  colorIndex: "graph-1",
                  flag: (
                    <Box pad="small" colorIndex="graph-1">
                      {" "}
                      North America
                    </Box>
                  ),
                  onClick: "..."
                },
                {
                  continent: "SouthAmerica",
                  label: "South America",
                  colorIndex: "accent-2",
                  flag: (
                    <Box pad="small" colorIndex="accent-2">
                      {" "}
                      SouthAmerica
                    </Box>
                  ),
                  onClick: "..."
                },
                {
                  continent: "Europe",
                  label: "Europe",
                  colorIndex: "unset",
                  flag: (
                    <Box pad="small" colorIndex="unset">
                      {" "}
                      Europe
                    </Box>
                  ),
                  onClick: "..."
                },
                {
                  continent: "Africa",
                  label: "Africa",
                  colorIndex: "graph-2",
                  flag: (
                    <Box pad="small" colorIndex="graph-2">
                      {" "}
                      Africa
                    </Box>
                  ),
                  onClick: "..."
                },
                {
                  continent: "Asia",
                  label: "Asia",
                  colorIndex: "graph-3",
                  flag: (
                    <Box pad="small" colorIndex="graph-3">
                      {" "}
                      Asia
                    </Box>
                  ),
                  onClick: "..."
                },
                {
                  continent: "Australia",
                  label: "Australia",
                  colorIndex: "graph-4",
                  flag: (
                    <Box pad="small" colorIndex="graph-4">
                      {" "}
                      Australia
                    </Box>
                  ),
                  onClick: "...",
                  onHover: "..."
                }
              ]}
            />
            <Heading tag="h3">
              {
                "Based on Statistics, eMail has an Average ROI of $38/dollar spent. 80% of professionals said email marketing drives customer aquisition and retention. And most importantly, eMail has a higher conversion rate than social mediaand search combined."
              }
            </Heading>
          </Box>
        </Box>
      </Box>
    );
  }
}
