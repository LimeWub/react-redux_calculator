import React from "react";
import Chunk from "components/equation/chunks/chunk";

class ChunkScientific extends React.PureComponent {
  render() {
    let operator;
    let slot1 = this.props.slots[1][this.props.renderas]; // If it doesn't exist - happy for this to crash
    let degreesToRadians = (
      value //Wrapper for unitsInDegrees case
    ) => (
      <React.Fragment>
        ((angle) => angle * (Math.PI / 180)) ({value})
      </React.Fragment>
    );

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
    /*
     * DISPLAY
     */
    if (this.props.renderas === "display") {
      let symbol = this.props.unitsInDegrees === "true" ? "degs" : "rads";
      return (
        <Chunk
          renderas={this.props.renderas}
          classModifiers="chunk--nest chunk--scientific"
        >
          {operator}(
          <span
            className={`slot slot--1 ${this.props.liveSlot === 1 &&
              "slot--active"}`}
          >
            {slot1}
          </span>
          <sup>{symbol}</sup>)
        </Chunk>
      );
    }
    /*
     * EXECUTABLE
     */
    if (this.props.unitsInDegrees === "true") {
      slot1 = degreesToRadians(slot1);
    }
    return (
      <Chunk renderas={this.props.renderas}>
        Math.{operator}({slot1})
      </Chunk>
    );
  }
}

export default ChunkScientific;
