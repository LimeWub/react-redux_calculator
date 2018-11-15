import React from "react";
import { connect } from "react-redux";
import History from "components/calculator/history";
import Screen from "components/calculator/screen";
import Keyboard from "components/calculator/keyboard";
import { switchOn, switchOff } from "actions/calculator.actions";
import {
  slotChunks as updateEditedSlotInEquation,
  evaluate as evaluateEquation
} from "actions/equation.actions";

import "styles/components/calculator/calculator";
class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.keyboard = React.createRef();
  }

  render() {
    return (
      <form
        className="calculator
                    theme theme--2
                    spacing"
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onSubmit={this.handleSubmit}
        tabIndex="0"
      >
        <div className="FRAME">
          <History />
          <Screen />
          {this.props.executable}
          <Keyboard ref={this.keyboard} />
        </div>
      </form>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only check properties which
    // *might* matter to rendering
    //return this.props.on !== nextProps.on;
    // TODO: Remove temp block!
    return true;
  }

  handleClick(e) {
    if (!this.props.on) {
      this.props.switchOn();
      e.preventDefault();
    }
  }

  handleKeyDown(e) {
    const getKeyButton = id => {
      const keyWrapper = this.keyboard.current.keys[id].current;
      if (typeof keyWrapper.getWrappedInstance === "function") {
        return keyWrapper.getWrappedInstance().key.current;
      }
      return keyWrapper.key.current;
    };

    // Map key press with calculator key press
    // Separate switch statements for the case where ALT/CMND/CTRL
    // is held at the same time - so as to not accidentally block
    // client shortcuts
    if (e.altKey || e.metaKey || e.ctrlKey) {
      switch (e.key) {
        case "Backspace":
          getKeyButton(`keyAC`).triggerClick();
          break;
        default:
          return;
      }
    } else {
      switch (e.key) {
        case "Backspace":
          getKeyButton(`keyCE`).triggerClick();
          break;
        case "Delete":
          getKeyButton(`keyAC`).triggerClick();
          break;
        case "=":
          this.handleSubmit(e);
          break;
        case "Enter":
          if (!this.props.on) {
            this.props.switchOn();
          } else {
            this.handleSubmit(e);
          }
          break;
        case "Space":
          if (!this.props.on) {
            this.props.switchOn();
          }
          break;
        case "Escape":
          if (this.props.on) {
            this.props.switchOff();
          }
          break;
        case "ArrowLeft": //Should I support going back as well?
          //this.props.updateEditedSlotInEquation('BACKWARD');
          break;
        case "ArrowRight": //Should I support going back as well?
          this.props.updateEditedSlotInEquation();
          break;
        case "Tab":
          if (!this.props.nested) return; // Nothing to do here! Let the user tab normally.
          //  if (e.shiftKey) this.props.updateEditedSlotInEquation('BACKWARD');
          this.props.updateEditedSlotInEquation();
          break;
        //Todo: Show scientific calc button ? (Alt/Meta + ->)?
        //Everything allowed in the calculator:
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          getKeyButton(`key${e.key}`).triggerClick();
          break;
        case ".":
          getKeyButton(`keyDecimal`).triggerClick();
          break;
        case "+":
          getKeyButton(`keyPlus`).triggerClick();
          break;
        case "-":
          getKeyButton(`keyMinus`).triggerClick();
          break;
        case "/":
          getKeyButton(`keyDivide`).triggerClick();
          break;
        case "*":
          getKeyButton(`keyMultiply`).triggerClick();
          break;
        case "%":
          getKeyButton(`keyPercent`).triggerClick();
          break;
        case "(":
          getKeyButton(`keyParenthesisOpen`).triggerClick();
          break;
        case ")":
          getKeyButton(`keyParenthesisClose`).triggerClick();
          break;
        case "s":
        case "S":
          getKeyButton(`keySin`).triggerClick();
          break;
        case "c":
        case "C":
          getKeyButton(`keyCos`).triggerClick();
          break;
        case "t":
        case "T":
          getKeyButton(`keyTan`).triggerClick();
          break;
        case "π":
        case "Π":
          getKeyButton(`keyPi`).triggerClick();
          break;
        case "r":
        case "R":
          getKeyButton(`keyRoot`).triggerClick();
          break;
        case "p":
        case "P":
          getKeyButton(`keyPower`).triggerClick();
          break;
        default:
          return false; // unhandled
      }
    }
    e.preventDefault();
  }

  handleSubmit(e) {
    this.props.evaluateEquation(this.props.executable);
    e.preventDefault();
  }
}

const mapStateToProps = state => {
  return {
    on: state.calculator.on,
    executable: state.equation.executable,
    nested: state.equation.chunks_parentId !== undefined
  };
};

const mapDispatchToProps = dispatch => {
  return {
    switchOn: () => {
      dispatch(switchOn());
    },
    switchOff: () => {
      dispatch(switchOff());
    },
    updateEditedSlotInEquation: () => {
      dispatch(updateEditedSlotInEquation());
    },
    evaluateEquation: equation => {
      dispatch(evaluateEquation(equation));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculator);
