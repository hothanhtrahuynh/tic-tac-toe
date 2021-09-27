import React from "react";

const Square = (props) => {
  const { value, isWin, onClick, selectedSquare } = props;
  let classname = "square";
  if(isWin){
    classname='square win';
  }
  if(selectedSquare){
    classname="square selected";
  }

  return (
    <button onClick={onClick} className={classname}>
      {value}
    </button>
  );
};

export default Square;
