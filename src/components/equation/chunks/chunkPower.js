import React from "react";
import Chunk from "components/equation/chunks/chunk";

class ChunkPower extends React.PureComponent {
  render() {
    let slot1 = this.props.slots[1][this.props.renderas]; // If it doesn't exist - happy for this to crash
    let slot2 = this.props.slots[2][this.props.renderas]; // If it doesn't exist - happy for this to crash
    if (this.props.renderas === "display") {
      return (
        <Chunk
          renderas={this.props.renderas}
          classModifiers="chunk--nest chunk--power"
        >
          {slot1}
          <sup>{slot2}</sup>
        </Chunk>
      );
    }
    return (
      <Chunk
        renderas={this.props.renderas}
        classModifiers="chunk--nest chunk--power"
      >
        Math.pow({slot1},{slot2})
      </Chunk>
    );
  }
}

export default ChunkPower;
