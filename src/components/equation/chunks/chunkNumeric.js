import React from "react";
import Chunk from "components/equation/chunks/chunk";

class ChunkNumeric extends React.PureComponent {
  render() {
    return <Chunk renderas={this.props.renderas}>{this.props.value}</Chunk>;
  }
}

export default ChunkNumeric;
