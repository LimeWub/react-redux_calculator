import React from "react";
import { connect } from "react-redux";
import { Key } from "components/calculator/keys/key";
import { appendTo as appendToEquation } from "actions/equation.actions";

class KeyRoot extends React.PureComponent {
  constructor(props) {
    super(props);
    this.rootAppend = this.rootAppend.bind(this);
  }

  render() {
    return (
      <Key onClick={this.rootAppend()} classModifiers="key--root">
        <span>x√y</span>
      </Key>
    );
  }

  rootAppend() {
    this.props.appendToEquation({
      value: "ROOT",
      childrenSlotCount: 2
    });
    // TODO
    // types.equation.NEST_CHUNKS:
    // update chunk parent id
    // update chunk parent slot
    // types.equation.SLOT_CHUNKS:
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
)(KeyRoot);
