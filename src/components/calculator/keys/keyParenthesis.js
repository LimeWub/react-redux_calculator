import React from "react";
import { connect } from "react-redux";
import { Key } from "components/calculator/keys/key";
import { appendTo as appendToEquation } from "actions/equation.actions";

class KeyParenthesis extends React.PureComponent {
  constructor(props) {
    super(props);
    this.parenthesisAppend = this.parenthesisAppend.bind(this);
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
      <Key onClick={this.parenthesisAppend()} value={this.props.value}>
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
        // TODO
        // types.equation.NEST_CHUNKS:
        // update chunk parent id
        // update chunk parent slot
        // types.equation.SLOT_CHUNKS:
        break;
      case "CLOSE":
        // types.equation.HOIST_CHUNKS
        break;
      default:
        throw new Error("Unsupported parenthesis type");
    }
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
)(KeyParenthesis);
