import React from "react";

import "styles/components/calculator/key";
export class Key extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.triggerClick = this.triggerClick.bind(this);
    this.button = React.createRef();
  }

  render() {
    return (
      <button
        className={`key
        ${this.props.classModifiers || ""} 
        ${this.state.isActive ? "active" : ""}`
          .replace(/\s+/g, " ") //Useless yet OCD
          .trim()}
        type={this.props.type || "button"}
        onClick={this.handleClick}
        ref={this.button}
      >
        {this.props.children}
      </button>
    );
  }

  handleClick() {
    this.props.onClick();
    // Button press animation
    this.setState({
      isActive: true
    });
    setTimeout(() => {
      this.setState({
        isActive: false
      });
    }, 1000);
  }

  triggerClick() {
    this.button.current.click();
  }
}
