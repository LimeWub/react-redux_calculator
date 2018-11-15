import React from "react";
import Chunk from "components/equation/chunks/chunk";

class ChunkArithmetic extends React.PureComponent {
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
        printedValue = "/";
        break;
      case "MULTIPLY":
        printedValue = this.props.renderas === "display" ? "×" : "*";
        break;
      default:
        throw new Error("Unsupported arithmetic operator");
    }
    return <Chunk renderas={this.props.renderas}>{printedValue}</Chunk>;
  }
}

export default ChunkArithmetic;
