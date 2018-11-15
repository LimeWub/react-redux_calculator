import React from "react";
import Chunk from "components/equation/chunks/chunk";

class ChunkDecimal extends React.PureComponent {
  render() {
    return <Chunk renderas={this.props.renderas}>.</Chunk>;
  }
}

export default ChunkDecimal;
