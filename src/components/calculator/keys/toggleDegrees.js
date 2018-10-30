import React from "react";
import { connect } from "react-redux";
import { degreesSwitch } from "actions/equation.actions";

class ToggleDegrees extends React.PureComponent {
  render() {
    return (
      <label className="switch">
        <input
          type="checkbox"
          value={this.props.unitsInDegrees}
          onClick={this.props.degreesSwitch}
        />
        Degrees
      </label>
    );
  }
}

const mapStateToProps = state => {
  return {
    unitsInDegrees: state.equation.unitsInDegrees
  };
};

const mapDispatchToProps = dispatch => {
  return {
    degreesSwitch: () => {
      dispatch(degreesSwitch());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleDegrees);
