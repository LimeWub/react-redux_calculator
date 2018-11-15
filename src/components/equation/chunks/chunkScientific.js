import React from "react";
import Chunk from "components/equation/chunks/chunk";

class ChunkScientific extends React.PureComponent {
  render() {
    let operator;
    let slot1 = this.props.slots[1][this.props.renderas]; // If it doesn't exist - happy for this to crash
    let printedValue;
    let degreesToRadians = (
      value //Wrapper
    ) => (
      <React.Fragment>
        ((angle) => angle * (Math.PI / 180)) ({value})
      </React.Fragment>
    );

    // Units in Degrees????
    switch (this.props.value) {
      case "SIN":
        operator = "sin";
        break;
      case "COS":
        operator = "cos";
        break;
      case "TAN":
        operator = "tan";
        break;
      default:
        throw new Error("Unsupported scientific operator");
    }
    if (this.props.renderas === "display") {
      let symbol = <sup>rads</sup>;
      if (this.props.unitsInDegrees === "true") {
        symbol = <sup>degs</sup>;
      }
      printedValue = (
        <React.Fragment>
          {operator}({slot1}
          {symbol})
        </React.Fragment>
      );
    } else {
      if (this.props.unitsInDegrees === "true") {
        slot1 = degreesToRadians(slot1);
      }
      printedValue = (
        <React.Fragment>
          Math.{operator}({slot1})
        </React.Fragment>
      );
    }

    return (
      <Chunk
        renderas={this.props.renderas}
        classModifiers="chunk--nest chunk--scientific"
      >
        {printedValue}
      </Chunk>
    );
  }
}

export default ChunkScientific;
