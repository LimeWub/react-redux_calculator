import React from "react";
import { connect } from "react-redux";
import { prettify } from "utils/equationUtils";

import "styles/components/calculator/history.scss";
class History extends React.Component {
  render() {
    return (
      <div className="history">
        <span>{prettify(this.props.error)}</span> <br />
        <span>{prettify(this.props.history)}</span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    history: state.equation.history,
    error: state.equation.error
  };
};

export default connect(mapStateToProps)(History);
