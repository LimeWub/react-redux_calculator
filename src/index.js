import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "src/reducers/root.reducer";
import Calculator from "components/calculator/calculator";
import Instructions from "components/instructions/instructions";
import { composeWithDevTools } from "redux-devtools-extension"; // Not working

import "./styles/base/site.scss";

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(ReduxThunk)
    // other store enhancers if any
  )
);

const App = () => (
  <Provider store={store}>
    <section className="section section--vertical-center section--horizontal-center  theme theme--1">
      <Calculator />
      <Instructions />
    </section>
  </Provider>
);

render(<App />, document.getElementById("app"));
