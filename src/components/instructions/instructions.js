import React from "react";
import { connect } from "react-redux";

import "styles/components/instructions/instructions";
class Instructions extends React.Component {
  constructor(props) {
    super(props);

    //    this.getNewQuote = this.getNewQuote.bind(this);
  }

  render() {
    return (
      <section
        className="calculator
                    theme theme--1-reverse
                    spacing"
        style={{ display: "none" }}
      >
        Instuctions Go Here
      </section>
    );
  }

  //  getNewQuote() {
  //    this.props.getQuote();
  //  }
}

const mapStateToProps = state => {
  return {
    //    quote: state.quote.quote.whatTheySaid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    /*    getQuote: config => {
      dispatch(getQuote(config));
   }
 */
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Instructions);
