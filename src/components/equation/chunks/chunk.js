import React from "react";
import { connect } from "react-redux";

class Chunk extends React.Component {
  constructor(props) {
    super(props);
  }

  renderType = {
    ASSISTIVE: 0,
    VISUAL: 1,
    RAW: 2
  };

  render() {
    switch (this.props.renderType) {
      case this.renderType.ASSISTIVE:
        break;
      case this.renderType.VISUAL:
        break;
      case this.renderType.RAW:
        break;
      default:
        return <span style={{ color: "red" }}>Error: Invalid renderType</span>;
    }
    if (this.props.renderVersion === "Simple") {
      return <React.Fragment>{this.props.render}</React.Fragment>;
    } else {
      return (
        <React.Fragment>
          <span style={{ color: "red" }}>{this.props.render}</span>
        </React.Fragment>
      );
    }
  }
}

export default Chunk;
