import React from "react";
import { connect } from "react-redux";
import { Key } from "components/calculator/keys/key";
import {
  ce as clearEquation,
  ac as allClearEquation
} from "actions/equation.actions";

class KeyDelete extends React.PureComponent {
  constructor(props) {
    super(props);
    this.key = React.createRef();
  }
  render() {
    switch (this.props.value) {
      case "CE":
        return (
          <Key
            onClick={this.props.clearEquation}
            classModifiers={!this.props.chunkCount && "key--invisible"}
            ref={this.key}
          >
            CE
          </Key>
        );
      case "AC":
        return (
          <Key
            onClick={this.props.allClearEquation}
            classModifiers={this.props.chunkCount && "key--invisible"}
            ref={this.key}
          >
            AC
          </Key>
        );
      default:
        throw new Error("Unsupported delete method");
    }
  }
}

const mapStateToProps = state => {
  return {
    chunkCount: state.equation.chunks.length
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearEquation: chunk => {
      dispatch(clearEquation(chunk));
    },
    allClearEquation: chunk => {
      dispatch(allClearEquation(chunk));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(KeyDelete);
