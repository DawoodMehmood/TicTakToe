// import React from "react";

// const Board = () => {
//   return (
//     <div>
//       <div className="grid grid-cols-3 grid-rows-3 m-5 [&>p]:h-24 [&>p]:w-24 [&>p]:border relative [&>p]:flex [&>p]:justify-center [&>p]:items-center">
//         <p>1</p>
//         <p>2</p>
//         <p className="bg-rose-600">3</p>
//         <p>4</p>
//         <p className="bg-rose-600">5</p>
//         <p>6</p>
//         <p className="bg-rose-600">7</p>
//         <p>8</p>
//         <p>9</p>
//         {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//           <div className="w-56 h-1 bg-black"></div>
//         </div> */}

//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//           <div className="grid grid-cols-2 grid-rows-2 h-52 w-52 border-t border-cyan-600 [&>span]:flex [&>span]:justify-center [&>span]:items-center"></div>
//         </div>

//         <div className="absolute top-1/3 left-0 w-full h-1 bg-black"></div>
//         <div className="absolute top-2/3 left-0 w-full h-1 bg-black"></div>

//         {/* Vertical lines */}
//         <div className="absolute top-0 left-1/3 w-1 h-full bg-black"></div>
//         <div className="absolute top-0 left-2/3 w-1 h-full bg-black"></div>

//         {/* Diagonal lines */}
//         {/* <div
//           className="absolute top-0 left-0 w-full h-full bg-black"
//           style={{ transform: "rotate(45deg)", transformOrigin: "center" }}
//         ></div>
//         <div
//           className="absolute top-0 left-0 w-full h-full bg-black"
//           style={{ transform: "rotate(-45deg)", transformOrigin: "center" }}
//         ></div> */}
//       </div>
//     </div>
//   );
// };

// export default Board;

import React, { useState } from "react";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winningLine, setWinningLine] = useState([]);
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: lines[i] }; // Return both winner and winning line
      }
    }
    return null;
  }

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    const result = calculateWinner(newSquares);
    if (result) {
      setWinningLine(result.line);
    } else {
      setWinningLine([]);
    }
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    const isWinningSquare = winningLine.includes(i);
    return (
      <button
        className={`w-24 h-24 bg-gray-200 flex items-center justify-center text-4xl font-bold rounded shadow ${
          isWinningSquare ? "bg-red-500 text-white" : "hover:bg-gray-300"
        }`}
        onClick={() => handleClick(i)}
      >
        {squares[i]}
      </button>
    );
  };

  return (
    <div className="flex flex-wrap w-72">
      {[...Array(9).keys()].map((i) => (
        <div key={i} className="w-1/3 p-0.5">
          {renderSquare(i)}
        </div>
      ))}
    </div>
  );
};

export default Board;
