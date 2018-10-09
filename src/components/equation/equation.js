import React from "react";
import { connect } from "react-redux";
import { prettify, prettify_light } from "utils/equationUtils";
// But is this how to do it though?
// redux.js.org/api/store#subscribe

class Equation extends React.Component {
  render() {
    return (
      <div
        className="screen numeric
                    theme theme--5
                    texture texture--grid texture--over"
      >
        <span className="screen__display numeric">
          {prettify(this.props.equation)}
        </span>
        <input
          className="screen__equation"
          type="text"
          aria-live="polite"
          value={prettify_light(this.props.equation)}
          placeholder="0"
          readOnly="true"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    equation: state.equation.chunks.join("")
  };
};

export default connect(mapStateToProps)(Equation);
