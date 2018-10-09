import React from "react";

import "styles/components/calculator/key";
export const Key = props => {
  return (
    <button
      className="key default"
      type={props.type ? props.type : "button"}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
