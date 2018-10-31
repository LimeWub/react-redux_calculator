import React from "react";
import { connect } from "react-redux";
import { Key } from "components/calculator/keys/key";
import { appendTo as appendToEquation } from "actions/equation.actions";

class KeyNumeric extends React.PureComponent {
  constructor(props) {
    super(props);
    this.numericAppend = this.numericAppend.bind(this);

    this.test = "Test Successful";
    this.key = React.createRef();
  }

  render() {
    return (
      <Key onClick={this.numericAppend} value={this.props.value} ref={this.key}>
        {this.props.value}
      </Key>
    );
  }

  numericAppend() {
    this.props.appendToEquation({
      value: +this.props.value
    });
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
  mapDispatchToProps,
  null,
  { withRef: true }
)(KeyNumeric);
