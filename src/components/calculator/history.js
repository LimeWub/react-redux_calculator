import React from "react";
import { connect } from "react-redux";
import Equation from "components/equation/equation";

import "styles/components/calculator/history.scss";
class History extends React.Component {
  render() {
    let historyText;
    if (this.props.error) {
      historyText = `Error: ${this.props.error}`;
    } else if (this.props.chunks.length) {
      historyText = (
        <React.Fragment>
          <Equation
            chunks={this.props.chunks}
            unitsInDegreesunitsInDegrees={this.props.unitsInDegrees}
          />
          =
        </React.Fragment>
      );
    } else if (this.props.result) {
      historyText = `Ans: ${this.props.result}`;
    } else {
      return null;
    }
    return <p className="history">{historyText}</p>;
  }
}

const mapStateToProps = state => {
  return {
    error: state.equation.error,
    chunks: state.equation.history_chunks,
    unitsInDegrees: `${state.equation.history_unitsInDegrees}`,
    result: state.equation.result
  };
};

export default connect(mapStateToProps)(History);
