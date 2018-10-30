import React from "react";
import { connect } from "react-redux";
import { Key } from "components/calculator/keys/key";
import { appendTo as appendToEquation } from "actions/equation.actions";

class KeyScientific extends React.PureComponent {
  constructor(props) {
    super(props);
    this.scientificAppend = this.scientificAppend.bind(this);
  }

  render() {
    let printedValue;
    switch (this.props.value) {
      case "SIN":
        printedValue = "sin()";
        break;
      case "COS":
        printedValue = "cos()";
        break;
      case "TAN":
        printedValue = "tan()";
        break;
      default:
        throw new Error("Unsupported scientific operator");
    }
    return (
      <Key onClick={this.scientificAppend()} value={this.props.value}>
        {printedValue}
      </Key>
    );
  }

  scientificAppend() {
    this.props.appendToEquation({
      value: this.props.value,
      childrenSlotCount: 1
    });
    // TODO
    // types.equation.NEST_CHUNKS:
    // update chunk parent id
    // update chunk parent slot
    // types.equation.SLOT_CHUNKS:
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
)(KeyScientific);
