import React, { useState } from "react";
import { calculateWinner } from "../calc/calculate";
import ToggleButton from "../UI/ToggleButton";
import Board from "./Board";

const initialState = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  stepNumber: 0,
  currenPos:null,
  isAsc: true,
  xIsNext: true,
};

const sortMoves = (moves, ascending) => {
  return moves.sort((moveA, moveB) => {
    if (ascending) {
      return moveA.step > moveB.step ? 1 : -1;
    } else {
      return moveA.step < moveB.step ? 1 : -1;
    }
  });
};

const Game = () => {
  const [game, setGame] = useState(initialState);

  const history = game.history;
  const current = history[game.stepNumber];

  const jumpTo = (step) => {
    setGame({
      ...game,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };

  const sortHandler = () => {
    setGame({ ...game, isAsc: !game.isAsc });
  };

  const handleClick = (i) => {
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = game.xIsNext ? "X" : "O";

    setGame({
      ...game,
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      currenPos:i,
      stepNumber: history.length,
      xIsNext: !game.xIsNext,
    });
  };

  const winner = calculateWinner(current.squares);
  let status;
  if (winner) {
    status = "Winner: " + winner.winner;
  } else {
    status = "Next player: " + (game.xIsNext ? "X" : "O");
  }

  let listMoves = [];

  const movesHistory = () => {

   history.map((step, move, history) => {
      const current = history[move].squares;
      const pre = history[move > 0 ? move - 1 : 0].squares;

      for (let index = 0; index < current.length; index++) {
        if (current[index] !== null && current[index] !== pre[index]) {
          listMoves.push( {
            step: move,
            player: current[index],
            position: index,
          });
         
        }
      }
    });
  };

  movesHistory();

  const sortedMoves = sortMoves(listMoves, game.isAsc);

  const moves_tmp = sortedMoves.map((move, step)=>{

    const desc =
      step !== null
        ? `${move.player} go to ( ${move.position % 3}, ${parseInt(move.position / 3)})`
        : "Go to game start";
    return (
      <li key={step}>
        <button onClick={() => jumpTo(step)}>{desc}</button>
      </li>
    );
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} selectedSquare={game.currenPos} onClick={(i) => handleClick(i)} winPath={winner?winner.path:null}/>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ToggleButton onClick={sortHandler} isAsc={game.isAsc} />
        <ol>{moves_tmp}</ol>
      </div>
    </div>
  );
};

export default Game;
