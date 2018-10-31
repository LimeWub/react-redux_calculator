import React from "react";
import { connect } from "react-redux";
import { Key } from "components/calculator/keys/key";
import { appendTo as appendToEquation } from "actions/equation.actions";

class KeyDecimal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.decimalAppend = this.decimalAppend.bind(this);
    this.key = React.createRef();
  }

  render() {
    return (
      <Key onClick={this.decimalAppend} ref={this.key}>
        .
      </Key>
    );
  }

  decimalAppend() {
    this.props.appendToEquation({
      value: "."
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
  mapDispatchToProps,
  null,
  { withRef: true }
)(KeyDecimal);
