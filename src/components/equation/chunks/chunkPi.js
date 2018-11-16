import React from "react";
import Chunk from "components/equation/chunks/chunk";

class ChunkPi extends React.PureComponent {
  render() {
    let printedValue =
      this.props.renderas === "display"
        ? Math.random() > 0.95
          ? "🥧" // Easter Egg (for Dave)
          : "π"
        : "Math.PI";
    return (
      <Chunk renderas={this.props.renderas} classModifiers="chunk--pi">
        {printedValue}
      </Chunk>
    );
  }
}

export default ChunkPi;
