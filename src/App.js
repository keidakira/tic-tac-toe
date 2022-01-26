import React, { useEffect, useState } from "react";
import "./box.css";
import "./main.css";

const App = () => {
  const CROSS = "X";
  const CIRCLE = "O";
  const dimensions = 3;
  let emptyBoard = Array(dimensions).fill(Array(dimensions).fill(null));

  const [board, setBoard] = useState(emptyBoard);
  const [turn, setTurn] = useState(CROSS);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    var result = checkWinner();

    if (result != null) {
      // There is a winner
      setWinner(result);
    } else {
      // If all the cells are filled and there is no winner, it's a tie
      if (isBoardFull()) {
        setWinner("Tie");
      }
    }
  }, [board]);

  const checkWinner = () => {
    // Check all rows, cols and both diagonals for winner

    // Check rows
    for (let i = 0; i < dimensions; i++) {
      let row = board[i];
      if (row[0] === null) {
        continue;
      }
      // Check if all elements in row are the same
      if (row.every((element) => element === row[0])) {
        return row[0];
      }
    }

    // Check cols
    for (let i = 0; i < dimensions; i++) {
      let player = board[i][0];
      if (player === null) {
        continue;
      }
      let foundWinner = true;
      for (let j = 0; j < dimensions; j++) {
        if (board[j][i] !== player) {
          foundWinner = false;
          break;
        }
      }
      if (foundWinner) {
        return player;
      }
      break;
    }

    // Check diagonals
    let player = board[0][0];
    if (player != null) {
      let foundWinner = true;
      for (let i = 0; i < dimensions; i++) {
        if (board[i][i] !== player) {
          foundWinner = false;
          break;
        }
      }
      if (foundWinner) {
        return player;
      }
    }

    player = board[0][2];
    if (player != null) {
      let foundWinner = true;
      for (let i = 0; i < dimensions; i++) {
        if (board[i][dimensions - i - 1] !== player) {
          foundWinner = false;
          break;
        }
      }
      if (foundWinner) {
        return player;
      }
    }

    return null;
  };

  const playerClicked = (row, col) => {
    // If the square is already filled, do nothing
    if (board[row][col]) return;
    if (winner != null) return;

    // Change board state
    const newBoard = board.map((r, ri) =>
      r.map((c, ci) => {
        if (ri === row && ci === col) {
          // Replace this position
          return turn;
        }
        return c;
      })
    );

    setBoard(newBoard);
    setTurn(turn === CROSS ? CIRCLE : CROSS);
  };

  const resetBoard = () => {
    setBoard(emptyBoard);
    setTurn(CROSS);
    setWinner(null);
  };

  const isBoardFull = () => {
    for (let i = 0; i < dimensions; i++) {
      for (let j = 0; j < dimensions; j++) {
        if (!board[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <div className="container">
      {winner === null && <p>Player {turn}'s turn</p>}
      <table>
        <tbody>
          {board.map((row, rowIndex) => {
            // For each row, create a row of cells of size dimensions
            return (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    onClick={() => playerClicked(rowIndex, cellIndex)}
                  >
                    {board[rowIndex][cellIndex]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {winner != null && (
        <div>
          {winner != "Tie" ? (
            <p className="winner">Winner: {winner}</p>
          ) : (
            <p>The Game is tied!</p>
          )}
          <p className="link" onClick={resetBoard}>
            Play Again
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
