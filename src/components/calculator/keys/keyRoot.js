import React from "react";
import { connect } from "react-redux";
import { Key } from "components/calculator/keys/key";
import {
  appendTo as appendToEquation,
  nestChunks as deepenNestLevelOfEquation,
  slotChunks as updateEditedSlotInEquation
} from "actions/equation.actions";

class KeyRoot extends React.PureComponent {
  constructor(props) {
    super(props);
    this.rootAppend = this.rootAppend.bind(this);
    this.key = React.createRef();
  }

  render() {
    return (
      <Key onClick={this.rootAppend} classModifiers="key--root" ref={this.key}>
        <span>x√y</span>
      </Key>
    );
  }

  rootAppend() {
    this.props.appendToEquation({
      value: "ROOT",
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
)(KeyRoot);
