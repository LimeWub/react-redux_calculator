import React from "react";
import { connect } from "react-redux";
import { Key } from "components/calculator/keys/key";
import { appendTo as appendToEquation } from "actions/equation.actions";

class KeyPercent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.percentAppend = this.percentAppend.bind(this);
  }

  render() {
    return (
      <Key onClick={this.percentAppend()} classModifiers="key--percent">
        %
      </Key>
    );
  }

  percentAppend() {
    this.props.appendToEquation({
      value: "PERCENT"
    });
  }
}

const mapDispatchToProps = dispatch => {
  return {
    appendToEquation: chunk => {
      dispatch(appendToEquation(chunk));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(KeyPercent);
