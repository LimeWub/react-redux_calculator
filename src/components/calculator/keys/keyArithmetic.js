import React from "react";
import { connect } from "react-redux";
import { Key } from "components/calculator/keys/key";
import { appendTo as appendToEquation } from "actions/equation.actions";

class KeyArithmetic extends React.PureComponent {
  constructor(props) {
    super(props);
    this.arithmeticAppend = this.arithmeticAppend.bind(this);
    this.key = React.createRef();
  }

  render() {
    let printedValue;
    switch (this.props.value) {
      case "PLUS":
        printedValue = "+";
        break;
      case "MINUS":
        printedValue = "-";
        break;
      case "DIVIDE":
        printedValue = "÷";
        break;
      case "MULTIPLY":
        printedValue = "×";
        break;
      default:
        throw new Error("Unsupported arithmetic operator");
    }
    return (
      <Key
        onClick={this.arithmeticAppend}
        value={this.props.value}
        ref={this.key}
      >
        {printedValue}
      </Key>
    );
  }

  arithmeticAppend() {
    this.props.appendToEquation({
      value: this.props.value
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
)(KeyArithmetic);
