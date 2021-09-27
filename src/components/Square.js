import React from "react";

const Square = (props) => {
  const { value, isWin, onClick, selectedSquare } = props;
  let status ="";
 
  if(selectedSquare){
    status="square selected";
  }
  if(isWin){
    status='square win';
  }

  return (
    <button onClick={onClick} className={`square ${value} ${status}`}>
      {value}
    </button>
  );
};

export default Square;
