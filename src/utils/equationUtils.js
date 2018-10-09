import { findClosingBracketMatchIndex } from "utils/_genericUtils";
/**
 * Replaces the awkward javascript parts of the equation
 * with something more readable but does not add any
 * html or styling so it's still announceable by a
 * screen reader.
 * @param {string} equation - Equation to prettify
 */
export const prettify_light = equation => {
  return equation.replace(/Math./g, "");
};

/**
 * Replaces things we don't want the user to see
 * with user friendly characters. Goes hardcore.
 * @param {string} equation - Equation to prettify
 */
export const prettify = equation => {
  return prettify_light(equation).replace(/\*/g, "×");
};

/**
 * Replaces character that don't make sense to the
 * computer (eval) with their corresponding
 * expressions.
 * @param {string} equation - Equation to ugglify
 */
export const translateForEval = equation => {
  return equation.replace(/%/g, "*1/100");
};

/**
 * Replaces/validates the equation string so that
 * evaluating feels slightly less scary.
 * @param {string} equation - Equation to cleanse
 */
export const cleanForEval = equation => {
  // TODO
  // Is there really anything I can do?
  return equation;
};

/**
 * Appends parenthesis and any other required
 * things that the user forgot to close.
 * @param {string} equation - Equation to auto-complete
 */
export const autocomplete = equation => {
  let openingParen_count = equation.replace(/[^(]/g, "").length;
  if (!openingParen_count) return equation; // Nothing to do here

  let closingParen_count = equation.replace(/[^)]/g, "").length;
  let difference = openingParen_count - closingParen_count;

  // If more opening parens than closing add as
  // many closing parens at the end
  return equation + ")".repeat(difference);
};

/**
 * Wherever there's a Math function that deals with angles,
 * wrap the contents of it within an deg -> rads function.
 * @param {string} equation - Equation to replace deg with rads
 */
export const degreesToRadians = equation => {
  let regEx = /Math\.(sin|cos|tan)\(/g;
  // Find all Math.sin( || Math.tan( || Math.cos(
  // opening and closing indexes
  let whereMathAngles = [];
  while (regEx.exec(equation) !== null) {
    let open = regEx.lastIndex - 1;
    let close = findClosingBracketMatchIndex(equation, open);
    whereMathAngles.push({
      type: "OPEN",
      value: open
    });
    whereMathAngles.push({
      type: "CLOSE",
      value: close
    });
  }

  // Reverse sort. (DESC)  Why?
  // If we add the needed strings from the end of the array,
  // the indexes don't change! :)
  whereMathAngles.sort((a, b) => {
    return b.value - a.value;
  });

  // Wrap the Math.***() contents with:
  //((angle) => angle * (Math.PI / 180))(***CONTENTS HERE***)
  for (let i = 0; i < whereMathAngles.length; i++) {
    let currentItem = whereMathAngles[i];
    let toInsert = "";
    switch (currentItem.type) {
      case "OPEN":
        toInsert = "((angle) => angle * (Math.PI / 180)) (";
        break;
      case "CLOSE":
        toInsert = ")";
        break;
    }
    equation =
      equation.slice(0, currentItem.value + 1) +
      toInsert +
      equation.slice(currentItem.value + 1);
  }
  return equation;
};
