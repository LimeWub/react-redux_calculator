import React from "react";
import { connect } from "react-redux";
import { Key } from "components/calculator/keys/key";
import {
  appendTo as appendToEquation,
  nestChunks as deepenNestLevelOfEquation,
  slotChunks as updateEditedSlotInEquation
} from "actions/equation.actions";

class KeyPower extends React.PureComponent {
  constructor(props) {
    super(props);
    this.powerAppend = this.powerAppend.bind(this);
    this.key = React.createRef();
  }

  render() {
    return (
      <Key
        onClick={this.powerAppend}
        classModifiers="key--power"
        ref={this.key}
      >
        x<sup>y</sup>
      </Key>
    );
  }

  powerAppend() {
    this.props.appendToEquation({
      value: "POW",
      childrenSlotCount: 2
    });
  }
}

const mapDispatchToProps = dispatch => {
  return {
    appendToEquation: chunk => {
      dispatch(appendToEquation(chunk));
      dispatch(deepenNestLevelOfEquation());
      dispatch(updateEditedSlotInEquation());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps,
  null,
  { withRef: true }
)(KeyPower);
