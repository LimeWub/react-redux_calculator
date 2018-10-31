import React from "react";
import { connect } from "react-redux";
import { prettify, prettify_light } from "utils/equationUtils";
// But is this how to do it though?
// redux.js.org/api/store#subscribe

class Equation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readable: "0",
      display: "0",
      executable: "0"
    };
  }
  render() {
    return (
      <React.Fragment>
        <span className="equation equation--display numeric">
          {/* prettify(this.props.equation) */}
        </span>
        <input
          className="equation equation--readable"
          type="text"
          aria-live="polite"
          value={"hey" /* prettify_light(this.props.equation) */}
          placeholder="0"
          readOnly="true"
        />
        // executable? // processChunks and set executable version into state //
        WIll this be ok or will it cause a re-render loop?
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    chunks: state.equation.chunks
  };
};

export default connect(mapStateToProps)(Equation);
