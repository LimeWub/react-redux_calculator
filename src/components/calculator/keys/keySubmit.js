import React from "react";
import { Key } from "components/calculator/keys/key";

class KeySubmit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.key = React.createRef();
  }

  render() {
    return (
      <Key type="submit" ref={this.key}>
        =
      </Key>
    );
  }
}

export default KeySubmit;
