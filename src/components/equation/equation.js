import React from "react";
import { connect } from "react-redux";
import { renderToStaticMarkup } from "react-dom/server";
import Chunk from "components/equation/chunks/chunk"; //Base as fallback
import ChunkArithmetic from "components/equation/chunks/chunkArithmetic";
import ChunkDecimal from "components/equation/chunks/chunkDecimal";
import ChunkNumeric from "components/equation/chunks/chunkNumeric";
import ChunkParenthesis from "components/equation/chunks/chunkParenthesis";
import ChunkPercent from "components/equation/chunks/chunkPercent";
import ChunkPi from "components/equation/chunks/chunkPi";
import ChunkPower from "components/equation/chunks/chunkPower";
import ChunkRoot from "components/equation/chunks/chunkRoot";
import ChunkScientific from "components/equation/chunks/chunkScientific";
import { updateExecutable } from "actions/equation.actions";

class Equation extends React.Component {
  constructor(props) {
    super(props);
    this.renderChunks = this.renderChunks.bind(this);
    this.live = props.live;
    this.renderredChunks = {
      display: [],
      executable: ""
    };
  }

  render() {
    this.renderredChunks = this.renderChunks(
      this.props.chunks,
      this.props.unitsInDegrees
    ); // Re-construct
    return this.renderredChunks.display;
  }

  componentDidUpdate() {
    if (this.live) this.props.updateExecutable(this.renderredChunks.executable); // Send newly constructed executable to Redux state
  }

  renderChunks() {
    // Does this work?
    const unflattenForRender = (
      chunks,
      parentId = undefined,
      parentSlot = undefined
    ) => {
      let display = [];
      let executable = "";
      let uChunks = chunks.filter(
        chunk => chunk.parentId === parentId && chunk.parentSlot === parentSlot
      );
      for (let i = 0; i < uChunks.length; i++) {
        let chunk = uChunks[i];
        chunk.slots = {};
        // Loop children slots (if any)
        for (let s = 1; s <= chunk.childrenSlotCount; s++) {
          chunk.slots[s] = unflattenForRender(chunks, chunk.id, s);
        }

        //Pick component type to render
        let Component;
        let props = {};
        switch (chunk.value) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
            Component = ChunkNumeric;
            break;
          case "DECIMAL":
            Component = ChunkDecimal;
            break;
          case "PLUS":
          case "MINUS":
          case "DIVIDE":
          case "MULTIPLY":
            Component = ChunkArithmetic;
            break;
          case "PERCENT":
            Component = ChunkPercent;
            props.isFirstChunk = chunk.id === 0;
            break;
          case "PARENTHESIS":
            Component = ChunkParenthesis;
            break;
          case "SIN":
          case "COS":
          case "TAN":
            props.unitsInDegrees = this.props.unitsInDegrees || "false";
            Component = ChunkScientific;
            break;
          case "PI":
            Component = ChunkPi;
            break;
          case "POW":
            Component = ChunkPower;
            break;
          case "ROOT":
            Component = ChunkRoot;
            break;
          default:
            Component = Chunk;
            props.children = chunk.value;
        }

        // Render for display and execution
        display.push(
          <Component
            value={chunk.value}
            slots={chunk.slots}
            renderas="display"
            key={chunk.id}
            {...props}
          />
        );
        executable += renderToStaticMarkup(
          <Component
            value={chunk.value}
            slots={chunk.slots}
            renderas="executable"
            {...props}
          />
        );
      }
      return {
        display,
        executable
      };
    };
    return unflattenForRender(this.props.chunks);
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateExecutable: executable => {
      dispatch(updateExecutable(executable));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Equation);
