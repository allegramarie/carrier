import React, { Component } from "react";
import Anchor from "grommet/components/Anchor";

class AnchorLink extends Component {
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }

  _onClick(event) {
    event.preventDefault();
    this.context.router.push(this.props.path);
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    const { path } = this.props;
    const { router } = this.context;
    let className = this.props.className || "";
    if (router.isActive(path)) {
      className += " active";
    }
    let href = router.createPath(path);
    return (
      <Anchor
        {...this.props}
        className={className}
        href={href}
        onClick={this._onClick}
      />
    );
  }
}

export default AnchorLink;
