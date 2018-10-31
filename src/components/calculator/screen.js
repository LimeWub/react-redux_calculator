import React from "react";
import Equation from "components/equation/equation";
import "styles/components/calculator/screen.scss";
export default class Screen extends React.Component {
  render() {
    return (
      <div
        className="screen numeric
                    theme theme--5
                    texture texture--grid texture--over"
      >
        <Equation />
      </div>
    );
  }
}
