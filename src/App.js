import React, { useEffect, useState } from "react";
import "./box.css";

const App = () => {
  const CROSS = "X";
  const CIRCLE = "O";
  const dimensions = 3;
  let emptyBoard = Array(dimensions).fill(Array(dimensions).fill(null));

  const [board, setBoard] = useState(emptyBoard);
  const [turn, setTurn] = useState(CROSS);

  useEffect(() => {
    checkWinner(board);
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
        alert(row[0] + " wins!");
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
        alert(player + " wins!");
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
        alert(player + " wins!");
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
        alert(player + " wins!");
      }
    }
  };

  const playerClicked = (row, col) => {
    // If the square is already filled, do nothing
    if (board[row][col]) return;

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

  return (
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
  );
};

export default App;
