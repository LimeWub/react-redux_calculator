import React from "react";
import { connect } from "react-redux";
import { Key } from "components/calculator/keys/key";
import {
  appendTo as appendToEquation,
  nestChunks as deepenNestLevelOfEquation,
  slotChunks as updateEditedSlotInEquation
} from "actions/equation.actions";

class KeyScientific extends React.PureComponent {
  constructor(props) {
    super(props);
    this.scientificAppend = this.scientificAppend.bind(this);
    this.key = React.createRef();
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
      <Key
        onClick={this.scientificAppend}
        value={this.props.value}
        ref={this.key}
      >
        {printedValue}
      </Key>
    );
  }

  scientificAppend() {
    // Apparently dispatches are synchronous.
    // The following code depends on that.
    // But are they?
    // Order matters
    this.props.appendToEquation({
      value: this.props.value,
      childrenSlotCount: 1
    });
  }
}

const mapDispatchToProps = dispatch => {
  return {
    appendToEquation: chunk => {
      dispatch(appendToEquation(chunk));
      dispatch(deepenNestLevelOfEquation());
      dispatch(updateEditedSlotInEquation());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps,
  null,
  { withRef: true }
)(KeyScientific);
