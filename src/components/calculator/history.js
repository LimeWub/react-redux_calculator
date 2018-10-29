import React from "react";
import { connect } from "react-redux";
import { prettify } from "utils/equationUtils";

import "styles/components/calculator/history.scss";
class History extends React.Component {
  render() {
    let historyText;
    if (this.props.error) {
      historyText = `Error: ${this.props.error}`;
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
    result: state.equation.result,
    error: state.equation.error
  };
};

export default connect(mapStateToProps)(History);
