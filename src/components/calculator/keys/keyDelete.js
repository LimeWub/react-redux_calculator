import React from "react";
import { connect } from "react-redux";
import { Key } from "components/calculator/keys/key";
import {
  ce as clearEquation,
  ac as allClearEquation
} from "actions/equation.actions";

class KeyDelete extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Key
          onClick={this.props.clearEquation()}
          classModifiers={!this.props.chunkCount && "key--invisible"}
        >
          CE
        </Key>
        <Key
          onClick={this.props.allClearEquation()}
          classModifiers={this.props.chunkCount && "key--invisible"}
        >
          AC
        </Key>
      </React.Fragment>
    );
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
  mapDispatchToProps
)(KeyDelete);
