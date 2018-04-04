import React, { Component } from "react";
import { Section, Heading, Paragraph } from "grommet";

class NotFound extends React.Component {
  render() {
    return (
      <Section align="center" alignContent="center">
        <Heading align="center">404: Page Not Found</Heading>
        <Paragraph align="center" size="large">
          Maybe you meant to go somewhere else?
        </Paragraph>
      </Section>
    );
  }
}

export default NotFound;
