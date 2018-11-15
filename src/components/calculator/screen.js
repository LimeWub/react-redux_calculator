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
    unitsInDegrees: `${state.equation.unitsInDegrees}`
  };
};

export default connect(mapStateToProps)(Screen);
