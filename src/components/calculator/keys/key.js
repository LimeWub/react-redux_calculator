import React from "react";

import "styles/components/calculator/key";
export const Key = props => {
  return (
    <button
      className={`key ${props.classModifiers}`}
      type={props.type ? props.type : "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
