import React from "react";
import KeyArithmetic from "components/calculator/keys/keyArithmetic";
import KeyDecimal from "components/calculator/keys/keyDecimal";
import KeyDelete from "components/calculator/keys/keyDelete";
import KeyNumeric from "components/calculator/keys/keyNumeric";
import KeyParenthesis from "components/calculator/keys/keyParenthesis";
import KeyPercent from "components/calculator/keys/keyPercent";
import KeyPi from "components/calculator/keys/keyPi";
import KeyPower from "components/calculator/keys/keyPower";
import KeyRoot from "components/calculator/keys/keyRoot";
import KeyScientific from "components/calculator/keys/keyScientific";
import KeySubmit from "components/calculator/keys/keySubmit";
import ToggleDegrees from "components/calculator/keys/toggleDegrees";
import "styles/components/calculator/keyboard";

export default class Keyboard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.keys = {
      key1: React.createRef(),
      key2: React.createRef(),
      key3: React.createRef(),
      key4: React.createRef(),
      key5: React.createRef(),
      key6: React.createRef(),
      key7: React.createRef(),
      key8: React.createRef(),
      key9: React.createRef(),
      key0: React.createRef(),
      keyDecimal: React.createRef(),
      keySubmit: React.createRef(),
      keyDivide: React.createRef(),
      keyMultiply: React.createRef(),
      keyMinus: React.createRef(),
      keyPlus: React.createRef(),
      keySin: React.createRef(),
      keyCos: React.createRef(),
      keyTan: React.createRef(),
      keyRoot: React.createRef(),
      keyPower: React.createRef(),
      keyPi: React.createRef(),
      keyCE: React.createRef(),
      keyAC: React.createRef(),
      keyPercent: React.createRef(),
      keyParenthesisOpen: React.createRef(),
      keyParenthesisClose: React.createRef()
    };
  }
  render() {
    return (
      <div className="keyboard">
        <ToggleDegrees />
        <div className="keyboard__numbers">
          <KeyNumeric ref={this.keys.key7} value="7" />
          <KeyNumeric ref={this.keys.key8} value="8" />
          <KeyNumeric ref={this.keys.key9} value="9" />
          <KeyNumeric ref={this.keys.key4} value="4" />
          <KeyNumeric ref={this.keys.key5} value="5" />
          <KeyNumeric ref={this.keys.key6} value="6" />
          <KeyNumeric ref={this.keys.key1} value="1" />
          <KeyNumeric ref={this.keys.key2} value="2" />
          <KeyNumeric ref={this.keys.key3} value="3" />
          <KeyNumeric ref={this.keys.key0} value="0" />
          <KeyDecimal ref={this.keys.keyDecimal} />
          <KeySubmit ref={this.keys.keySubmit} />
        </div>
        <div className="keyboard__arithmetic">
          <KeyArithmetic ref={this.keys.keyDivide} value="DIVIDE" />
          <KeyArithmetic ref={this.keys.keyMultiply} value="MULTIPLY" />
          <KeyArithmetic ref={this.keys.keyMinus} value="MINUS" />
          <KeyArithmetic ref={this.keys.keyPlus} value="PLUS" />
        </div>

        <div className="keyboard__scientific">
          <KeyScientific ref={this.keys.keySin} value="SIN" />
          <KeyScientific ref={this.keys.keyCos} value="COS" />
          <KeyScientific ref={this.keys.keyTan} value="TAN" />
          <KeyRoot ref={this.keys.keyRoot} />
          <KeyPower ref={this.keys.keyPower} />
          <KeyPi ref={this.keys.keyPi} />
        </div>

        <div className="keyboard__misc">
          <KeyDelete ref={this.keys.keyAC} value="AC" />
          <KeyDelete ref={this.keys.keyCE} value="CE" />
          <KeyPercent ref={this.keys.keyPercent} />
          <KeyParenthesis ref={this.keys.keyParenthesisOpen} value="OPEN" />
          <KeyParenthesis ref={this.keys.keyParenthesisClose} value="CLOSE" />
        </div>
      </div>
    );
  }
}
