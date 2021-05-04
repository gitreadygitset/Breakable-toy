import React from "react";

const ErrorList = ({errors}) => {
  if (errors.length > 0) {
    const listItems = errors.map(error => {
      return (
        <li>{error}</li>
      );
    });
    return (
      <div>
        <ul>{listItems}</ul>
      </div>
    );
  } else {
    return "";
  }
};

export default ErrorList;
