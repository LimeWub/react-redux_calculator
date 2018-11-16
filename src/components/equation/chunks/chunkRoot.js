import React from "react";
import Chunk from "components/equation/chunks/chunk";

class ChunkRoot extends React.PureComponent {
  render() {
    let slot1 = this.props.slots[1][this.props.renderas]; // If it doesn't exist - happy for this to crash
    let slot2 = this.props.slots[2][this.props.renderas]; // If it doesn't exist - happy for this to crash
    /*
     * DISPLAY
     */
    if (this.props.renderas === "display") {
      return (
        <Chunk
          renderas={this.props.renderas}
          classModifiers="chunk--nest chunk--root"
        >
          <span
            className={`slot slot--2 ${this.props.liveSlot === 2 &&
              "slot--active"}`}
          >
            {slot2.length ? slot2 : `y`}
          </span>
          √
          <span
            className={`slot slot--1 ${this.props.liveSlot === 1 &&
              "slot--active"}`}
          >
            {slot1.length ? slot1 : `x`}
          </span>
        </Chunk>
      );
    }
    /*
     * EXECUTABLE
     */
    return (
      <Chunk renderas={this.props.renderas}>
        Math.pow({slot1 || 0},-{slot2 || 0})
      </Chunk>
    );
  }
}

export default ChunkRoot;
