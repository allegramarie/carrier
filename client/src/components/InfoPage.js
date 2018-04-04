import React, { Component } from "react";
import Responsive from "grommet/utils/Responsive";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import Headline from "grommet/components/Headline";
import Button from "grommet/components/Button";
import LinkNext from "grommet/components/icons/base/LinkNext";
import people from "./people.svg";
import Meter from "grommet/components/Meter";
import Value from "grommet/components/Value";
import WorldMap from "grommet/components/WorldMap";
import Label from "grommet/components/Label";

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
        alt="people"
      />
    );

    return (
      <Box
        className="dashboard"
        justify="center"
        align="center"
        full={false}
        pad="medium"
        colorIndex="neutral-3"
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
              label={<Value value={95} colorIndex="graph-3" units="%" />}
              threshold={95}
              max={100}
              value={95}
              onActive={() => {}}
            />
            <Heading tag="h4">
              The most common reason that emails never reach the inbox is spam
              complaints. Every time a subscriber reports an email as spam–even
              if it isn’t really spam–this complaint gets recorded by the
              mailbox provider. Once the complaints exceed a certain threshold,
              all future campaigns skip the inbox and get sent directly to the
              spam folder. With Carrier, ensure all your email get delivered to
              an Inbox.
            </Heading>
          </Box>
          <Box
            className="meter-box col__span-25"
            justify="start"
            pad={{ horizontal: "medium" }}
            align="center"
          >
            <Box responsive={false} align="center">
              <Meter
                type="arc"
                threshold={10}
                max={12}
                value={11}
                onActive={() => {}}
              />
              <Value value={5} units="Sec : <" />
            </Box>
            <Heading tag="h4">
              Consumers want to hear from you. 61 percent of consumers enjoy
              receiving promotional emails weekly. 38 percent would like emails
              to come even more frequently. Keep this in mind the next time
              you’re fretting that customers will get turned off by sending
              emails too often. With Carrier, send emails near instantly or on a
              set schedule down to the minute.
            </Heading>
          </Box>

          <Box
            className="map-box col__span-50"
            justify="start"
            pad={{ horizontal: "medium" }}
            align="center"
            style={{ marginTop: "-85px" }}
          >
            <WorldMap
              zoom={false}
              colorIndex=""
              series={[
                {
                  continent: "NorthAmerica",
                  label: "North America",
                  colorIndex: "graph-1",
                  flag: <Box colorIndex="graph-1" />,
                  onClick: "..."
                },
                {
                  continent: "SouthAmerica",
                  label: "South America",
                  colorIndex: "accent-2",
                  flag: <Box colorIndex="accent-2" />,
                  onClick: "..."
                },
                {
                  continent: "Europe",
                  label: "Europe",
                  colorIndex: "unset",
                  flag: <Box colorIndex="unset" />,
                  onClick: "..."
                },
                {
                  continent: "Africa",
                  label: "Africa",
                  colorIndex: "graph-2",
                  flag: <Box colorIndex="graph-2" />,
                  onClick: "..."
                },
                {
                  continent: "Asia",
                  label: "Asia",
                  colorIndex: "graph-1",
                  flag: <Box colorIndex="graph-1" />,
                  onClick: "..."
                },
                {
                  continent: "Australia",
                  label: "Australia",
                  colorIndex: "graph-4",
                  flag: <Box colorIndex="graph-4" />,
                  onClick: "...",
                  onHover: "..."
                }
              ]}
            />

            <Heading tag="h4" style={{ marginTop: "50px" }}>
              {
                "Based on Statistics, eMail has an Average ROI of $38/dollar spent and most importantly, eMail has a higher conversion rate than social media and search combined. These email marketing stats prove just how valuable email can be for your business. Whether you want to increase your number of customers or strengthen your relationship with existing customers, email marketing will give you the tools you need."
              }
            </Heading>
          </Box>
        </Box>
      </Box>
    );
  }
}
