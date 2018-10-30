import React from "react";
import { connect } from "react-redux";
import { Key } from "components/calculator/keys/key";
import { appendTo as appendToEquation } from "actions/equation.actions";

class KeyPi extends React.PureComponent {
  constructor(props) {
    super(props);
    this.piAppend = this.piAppend.bind(this);
  }

  render() {
    return (
      <Key onClick={this.piAppend()} classModifiers="key--pi">
        π
      </Key>
    );
  }

  piAppend() {
    this.props.appendToEquation({
      value: "PI"
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
)(KeyPi);
