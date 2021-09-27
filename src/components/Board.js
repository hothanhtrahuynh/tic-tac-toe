import React from "react";
import Square from "./Square";

const Board = (props) => {
  const { squares, onClick, winPath, selectedSquare } = props;

  const renderSquare = (i) => {
    let isWin=false;
    let selected=selectedSquare===i?true:false;
    if(winPath){
      const check = winPath.find(item=>item===i);
     if(check||check===0){
       isWin=true;
     }
    }

    return (
      <Square key={i} isWin={isWin} selectedSquare={selected} value={squares[i]} onClick={onClick.bind(null, i)} />
    );
  };

  const gameBoard = [];

  for (let i = 0; i < 3; i++) {
    let list = [];

    for (let k = 0; k < 3; k++) {
      
        list.push(renderSquare(3 * i + k));
  
    }

    gameBoard.push(
      <div className="board-row" key={i}>
        {list}
      </div>
    );
  }

  return <div>{gameBoard}</div>;
};

export default Board;
