import React from "react";
import { connect } from "react-redux";
import Equation from "components/equation/equation";
import "styles/components/calculator/screen.scss";
export class Screen extends React.Component {
  render() {
    return (
      <div
        className="screen numeric
                    theme theme--5
                    texture texture--grid texture--over"
      >
        <Equation
          live="true"
          liveChunk={this.props.chunks_parentId}
          liveSlot={this.props.chunks_parentSlot}
          chunks={this.props.chunks}
          unitsInDegrees={this.props.unitsInDegrees}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    chunks: state.equation.chunks,
    chunks_parentId: state.equation.chunks_parentId,
    chunks_parentSlot: state.equation.chunks_parentSlot,
    unitsInDegrees: `${state.equation.unitsInDegrees}`
  };
};

export default connect(mapStateToProps)(Screen);
