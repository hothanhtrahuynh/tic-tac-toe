import React, { Fragment, useState } from "react";
import { calculateWinner } from "../calc/calculate";
import ToggleButton from "../UI/ToggleButton";
import Board from "./Board";
import Message from "./Message";
import classes from './Game.module.css'

const initialState = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  stepNumber: 0,
  currenPos: null,
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

const checkFullStep = (currentBoard) => {

  return !currentBoard.includes(null);
}

const Game = () => {
  const [game, setGame] = useState(initialState);

  const [showMessgae, setShowMessage] = useState(true);

  const history = game.history;
  const current = history[game.stepNumber];

  const jumpTo = (step) => {
    setGame({
      ...game,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
    setShowMessage(true);
  };

  const newGame=()=>{
    setGame(initialState);
    setShowMessage(true);
  }

  const closeMessgaeHandler = () => {
    setShowMessage(false);
  }

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
      currenPos: i,
      stepNumber: history.length,
      xIsNext: !game.xIsNext,
    });
  };

  const isEnd = checkFullStep(current.squares);

  const winner = calculateWinner(current.squares);
  let status;
  let message;
  if (winner) {
    status = "Winner is " + winner.winner;
    message = <Message message={status} win={true}  newGame={newGame} onClose={closeMessgaeHandler} />


  } else {
    status = "Next player: " + (game.xIsNext ? "X" : "O");
  }


  if (isEnd && !winner) {

    message = <Message message='Oh Tie...!' win={false} newGame={newGame} onClose={closeMessgaeHandler} />

  }

  let listMoves = [];

  const movesHistory = () => {

    history.map((step, move, history) => {
      const current = history[move].squares;
      const pre = history[move > 0 ? move - 1 : 0].squares;

      for (let index = 0; index < current.length; index++) {
        if (current[index] !== null && current[index] !== pre[index]) {
          listMoves.push({
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

  const moves_tmp = sortedMoves.map((move, step) => {

    const desc =
      step !== null
        ? `${move.player} go to ( ${move.position % 3}, ${parseInt(move.position / 3)})`
        : "Go to game start";
    return (
      <li key={step}>
        <button className={classes.move} onClick={() => jumpTo(step)}>{desc}</button>
      </li>
    );
  })

  return (
    <div className="total">
      <h1 className="title-game">Tic Tac Toe</h1>

    <div className="game">
      
      <div className="game-board">
        <Board squares={current.squares} selectedSquare={game.currenPos} onClick={(i) => handleClick(i)} winPath={winner ? winner.path : null} />
      </div>
      <div className="game-info">
        <h1>{status}</h1>
        <ToggleButton onClick={sortHandler} isAsc={game.isAsc} />
        <ol>{moves_tmp}</ol>
      </div>
      {showMessgae&&message}
    </div>
    </div>
  );
};

export default Game;
