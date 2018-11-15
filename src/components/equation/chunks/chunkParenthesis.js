import React from "react";
import Chunk from "components/equation/chunks/chunk";

class ChunkParenthesis extends React.PureComponent {
  render() {
    let slot1 = this.props.slots[1][this.props.renderas]; // If it doesn't exist - happy for this to crash
    return (
      <Chunk
        renderas={this.props.renderas}
        classModifiers="chunk--nest chunk--parenthesis"
      >
        ({slot1})
      </Chunk>
    );
  }
}

export default ChunkParenthesis;
