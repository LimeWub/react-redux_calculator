import React from "react";
import { connect } from "react-redux";
import { Key } from "components/calculator/keys/key";
import {
  appendTo as appendToEquation,
  nestChunks as deepenNestLevelOfEquation,
  hoistChunks as liftNestLevelOfEquation,
  slotChunks as updateEditedSlotInEquation
} from "actions/equation.actions";

class KeyParenthesis extends React.PureComponent {
  constructor(props) {
    super(props);
    this.parenthesisAppend = this.parenthesisAppend.bind(this);
    this.key = React.createRef();
  }

  render() {
    let printedValue;
    switch (this.props.value) {
      case "OPEN":
        printedValue = "(";
        break;
      case "CLOSE":
        printedValue = ")";
        break;
      default:
        throw new Error("Unsupported parenthesis type");
    }
    return (
      <Key
        onClick={this.parenthesisAppend}
        value={this.props.value}
        ref={this.key}
      >
        {printedValue}
      </Key>
    );
  }

  parenthesisAppend() {
    switch (this.props.value) {
      case "OPEN":
        this.props.appendToEquation({
          value: "PARENTHESIS",
          childrenSlotCount: 1
        });
        break;
      case "CLOSE":
        this.props.liftNestLevelOfEquation();
        break;
      default:
        return false;
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    appendToEquation: chunk => {
      dispatch(appendToEquation(chunk));
      dispatch(deepenNestLevelOfEquation());
      dispatch(updateEditedSlotInEquation());
    },
    liftNestLevelOfEquation: () => {
      dispatch(liftNestLevelOfEquation());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps,
  null,
  { withRef: true }
)(KeyParenthesis);
