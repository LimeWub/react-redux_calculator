import { combineReducers } from "redux";
import calculatorReducer from "reducers/calculator.reducer";
import equationReducer from "reducers/equation.reducer";

const rootReducer = combineReducers({
  calculator: calculatorReducer,
  equation: equationReducer
});

export default rootReducer;
