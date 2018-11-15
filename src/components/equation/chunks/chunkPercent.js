import React from "react";
import Chunk from "components/equation/chunks/chunk";

class ChunkPercent extends React.PureComponent {
  render() {
    let printedValue =
      this.props.renderas === "display"
        ? "%"
        : this.props.isFirstChunk
        ? "1/100"
        : "*1/100";
    return <Chunk renderas={this.props.renderas}>{printedValue}</Chunk>;
  }
}

export default ChunkPercent;
