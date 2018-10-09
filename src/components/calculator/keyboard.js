import React from "react";
import { connect } from "react-redux";
import { Key } from "components/calculator/key";
import {
  evaluate,
  appendTo,
  insertAt,
  ac,
  ce,
  degreesSwitch,
  addPower,
  removePower,
  powerNestingIncrement,
  powerNestingDecrement
} from "actions/equation.actions";

import "styles/components/calculator/keyboard";

class Keyboard extends React.Component {
  constructor(props) {
    super(props);

    //Which of these are needed:
    this.justAppend = this.justAppend.bind(this);
    this.processThenAppend = this.processThenAppend.bind(this);
    this.triggerEvaluation = this.triggerEvaluation.bind(this);
    this.ac = this.props.ac;
    this.ce = this.props.ce;
  }

  render() {
    // Show CE or AC?
    let clearButtonHtml = <Key onClick={e => this.props.ce()} text="CE" />;
    if (this.props.chunks.length <= 1) {
      clearButtonHtml = <Key onClick={e => this.props.ac()} text="AC" />;
    }

    return (
      <div className="keyboard">
        <label className="switch">
          <input
            type="checkbox"
            value={this.props.unitsInDegrees}
            onClick={this.props.degreesSwitch}
          />
          Degrees
        </label>
        <div className="keyboard__numbers">
          <Key onClick={e => this.justAppend("7")} text="7" />
          <Key onClick={e => this.justAppend("8")} text="8" />
          <Key onClick={e => this.justAppend("9")} text="9" />
          <Key onClick={e => this.justAppend("4")} text="4" />
          <Key onClick={e => this.justAppend("5")} text="5" />
          <Key onClick={e => this.justAppend("6")} text="6" />
          <Key onClick={e => this.justAppend("1")} text="1" />
          <Key onClick={e => this.justAppend("2")} text="2" />
          <Key onClick={e => this.justAppend("3")} text="3" />
          <Key onClick={e => this.justAppend("0")} text="0" />
          <Key onClick={e => this.justAppend(".")} text="." />
          <Key type="submit" text="=" />
        </div>
        <div className="keyboard__arithmetic">
          <Key onClick={e => this.justAppend("/")} text="÷" />
          <Key onClick={e => this.justAppend("*")} text="×" />
          <Key onClick={e => this.justAppend("-")} text="-" />
          <Key onClick={e => this.justAppend("+")} text="+" />
        </div>

        <div className="keyboard__scientific">
          <Key onClick={e => this.justAppend("Math.sin(")} text="sin" />
          <Key onClick={e => this.justAppend("Math.cos(")} text="cos" />
          <Key onClick={e => this.justAppend("Math.tan(")} text="tan" />
          <Key onClick={e => this.processThenAppend("rt")} text="√" />
          <Key onClick={e => this.processThenAppend("pow")} text="pow" />
          <Key onClick={e => this.justAppend("Math.PI")} text="π" />
        </div>

        <div className="keyboard__misc">
          {clearButtonHtml}
          <Key onClick={e => this.justAppend("%")} text="%" />
          <Key onClick={e => this.justAppend("(")} text="(" />
          <Key onClick={e => this.justAppend(")")} text=")" />
        </div>
      </div>
    );
  }

  processThenAppend(value) {
    switch (value) {
      case "pow":
        // Reverse the chunks cause we're looking from the ending
        let reverseChunks = [...this.props.chunks].reverse();

        // While the chunk doesn't match the regex (numerics, % or .)
        // Add to the index count (starting from 0)
        let regEx = /[0-9]|%|\.|,/g;
        let i = 0;
        while (regEx.test(reverseChunks[i])) {
          i++;
        }
        if (i === 0) break;

        // Once found
        // Chunk length - index count
        // Insert at index
        this.props.insertToEquationAtIndex(
          "Math.pow(",
          this.props.chunks.length - i
        );
        this.props.appendToEquation(","); // Append comma
        this.props.addPower();

        //Mark that we are in a nest somehow and
        // expected list of characters to free
        // (! 0-9, ., %, pow)

        break;
      case "rt":
        value = "Math.pow(";

        break;
      default:
        value = "";
        break;
    }
    return;
  }

  justAppend(value) {
    this.props.appendToEquation(value);
  }

  triggerEvaluation() {
    this.props.evaluateEquation(
      this.props.chunks.join(""),
      this.props.unitsInDegrees
    );
  }
}

const mapStateToProps = state => {
  return {
    chunks: state.equation.chunks,
    hasValidResult: state.equation.result && !state.equation.error,
    unitsInDegrees: state.equation.unitsInDegrees
  };
};

const mapDispatchToProps = dispatch => {
  return {
    evaluateEquation: (value, unitsInDegrees) => {
      dispatch(evaluate(value, unitsInDegrees));
    },
    appendToEquation: value => {
      dispatch(appendTo(value));
    },
    insertToEquationAtIndex: (value, index) => {
      dispatch(insertAt(value, index));
    },
    ac: () => {
      dispatch(ac());
    },
    ce: () => {
      dispatch(ce());
    },
    degreesSwitch: () => {
      dispatch(degreesSwitch());
    },
    addPower: () => {
      dispatch(addPower());
    },
    removePower: () => {
      dispatch(removePower());
    },
    powerNestingIncrement: () => {
      dispatch(powerNestingIncrement());
    },
    powerNestingDecrement: () => {
      dispatch(powerNestingDecrement());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(Keyboard);
