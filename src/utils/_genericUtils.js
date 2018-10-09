// Credit: https://codereview.stackexchange.com/questions/179471/find-the-corresponding-closing-parenthesis/179484#179484
export const findClosingBracketMatchIndex = (str, pos) => {
  if (str[pos] !== "(") {
    throw new Error("No '(' at index " + pos);
  }
  let depth = 1;
  for (let i = pos + 1; i < str.length; i++) {
    switch (str[i]) {
      case "(":
        depth++;
        break;
      case ")":
        if (--depth == 0) {
          return i;
        }
        break;
    }
  }
  return -1; // No matching closing parenthesis
};
