import React from "react";

import "styles/components/equation/chunk";
class Chunk extends React.PureComponent {
  render() {
    switch (this.props.renderas) {
      case "display":
        return (
          <span
            className={`chunk
            ${this.props.classModifiers || ""}`
              .replace(/\s+/g, " ") //Useless yet OCD
              .trim()}
          >
            {this.props.children}
          </span>
        );
      case "executable":
        return this.props.children;
      default:
        throw new Error("Unsupported render method");
    }
  }
}

export default Chunk;
