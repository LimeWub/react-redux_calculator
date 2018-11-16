import React from "react";
import Chunk from "components/equation/chunks/chunk";

class ChunkPower extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

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
          classModifiers="chunk--nest chunk--power"
        >
          <span
            className={`slot slot--1 ${this.props.liveSlot === 1 &&
              "slot--active"}`}
            onClick={e => this.handleClick(e, 1)}
          >
            {slot1.length ? slot1 : `x`}
          </span>
          <sup>
            <span
              className={`slot slot--2 ${this.props.liveSlot === 2 &&
                "slot--active"}`}
              onClick={e => this.handleClick(e, 2)}
            >
              {slot2.length ? slot2 : `y`}
            </span>
          </sup>
        </Chunk>
      );
    }
    /*
     * EXECUTABLE
     */
    return (
      <Chunk renderas={this.props.renderas}>
        Math.pow({slot1 || 0},{slot2 || 0})
      </Chunk>
    );
  }

  handleClick(e, slotClicked) {
    if (this.props.slotChunks && typeof this.props.slotChunks === "function") {
      this.props.slotChunks(this.props.id, slotClicked);
      e.preventDefault();
      e.stopPropagation();
    }
  }
}

export default ChunkPower;
