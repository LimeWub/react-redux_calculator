import React from "react";
import { connect } from "react-redux";
import { Key } from "components/calculator/keys/key";
import "styles/components/calculator/keyboard";

class Keyboard extends React.Component {
  render() {
    return (
      <div className="keyboard">
        <ToggleDegrees />
        <div className="keyboard__numbers">
          <KeyNumeric value="7" />
          <KeyNumeric value="8" />
          <KeyNumeric value="9" />
          <KeyNumeric value="4" />
          <KeyNumeric value="5" />
          <KeyNumeric value="6" />
          <KeyNumeric value="1" />
          <KeyNumeric value="2" />
          <KeyNumeric value="3" />
          <KeyNumeric value="0" />
          <KeyDecimal />
          <KeySubmit />
        </div>
        <div className="keyboard__arithmetic">
          <KeyArithmetic value="DIVIDE" />
          <KeyArithmetic value="MULTIPLY" />
          <KeyArithmetic value="MINUS" />
          <KeyArithmetic value="PLUS" />
        </div>

        <div className="keyboard__scientific">
          <KeyScientific value="SIN" />
          <KeyScientific value="COS" />
          <KeyScientific value="TAN" />
          <KeyRoot />
          <KeyPower />
          <KeyPi />
        </div>

        <div className="keyboard__misc">
          <KeyDelete />
          <KeyPercent />
          <KeyParenthesis value="OPEN" />
          <KeyParenthesis value="CLOSE" />
        </div>
      </div>
    );
  }
  /*
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
*/
}

export default Keyboard;
