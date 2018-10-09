import React from "react";
import { connect } from "react-redux";
import History from "components/calculator/history";
import Screen from "components/calculator/screen";
import Keyboard from "components/calculator/keyboard";
import { switchOn, switchOff } from "actions/calculator.actions";

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
          <Keyboard ref={this.keyboard} />
        </div>
      </form>
    );
  }

  handleClick(e) {
    if (!this.props.on) {
      this.props.switchOn();
      e.preventDefault();
    }
  }

  handleKeyDown(e) {
    const keyboard = this.keyboard.current.getWrappedInstance();
    switch (e.key) {
      case "Backspace":
        if (
          e.altKey ||
          e.metaKey ||
          (keyboard.props.chunks.length <= 1 && keyboard.props.hasValidResult)
        ) {
          keyboard.ac();
          break;
        }
        keyboard.ce();
        break;
      case "Delete":
        keyboard.ac();
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
      case ".":
      case "+":
      case "-":
      case "/":
      case "*":
      case "%":
        keyboard.justAppend(e.key);
        break;
      case "(":
        keyboard.in;
      case ")":
        keyboard.justAppend(e.key);
        break;
      case "s":
      case "S":
        keyboard.justAppend("Math.sin(");
        break;
      case "c":
      case "C":
        keyboard.justAppend("Math.cos(");
        break;
      case "t":
      case "T":
        keyboard.justAppend("Math.tan(");
        break;
      case "π":
      case "Π":
        keyboard.justAppend("Math.PI");
        break;
      //Todo: √, ** (pow)
      default:
        return false; // unhandled
    }

    e.preventDefault();
  }

  handleSubmit(e) {
    const keyboard = this.keyboard.current.getWrappedInstance();
    keyboard.triggerEvaluation();
    e.preventDefault();
  }
}

const mapStateToProps = state => {
  return {
    on: state.calculator.on
  };
};

const mapDispatchToProps = dispatch => {
  return {
    switchOn: () => {
      dispatch(switchOn());
    },
    switchOff: () => {
      dispatch(switchOff());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculator);
