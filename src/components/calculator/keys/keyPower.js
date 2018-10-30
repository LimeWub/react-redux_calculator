import React from "react";
import { connect } from "react-redux";
import { Key } from "components/calculator/keys/key";
import { appendTo as appendToEquation } from "actions/equation.actions";

class KeyPower extends React.PureComponent {
  constructor(props) {
    super(props);
    this.powerAppend = this.powerAppend.bind(this);
  }

  render() {
    return (
      <Key onClick={this.powerAppend()} classModifiers="key--power">
        x<sup>y</sup>
      </Key>
    );
  }

  powerAppend() {
    this.props.appendToEquation({
      value: "POW",
      childrenSlotCount: 2
    });
    // TODO
    // types.equation.NEST_CHUNKS:
    // update chunk parent id
    // update chunk parent slot
    // types.equation.SLOT_CHUNKS:
    // Mwahahaha
    //this.props.trapChildrenForSlot(1); ???
  }
}

const mapDispatchToProps = dispatch => {
  return {
    appendToEquation: chunk => {
      dispatch(appendToEquation(chunk));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(KeyPower);
