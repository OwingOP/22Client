
import React, { useState, useEffect } from 'react';

type Player = 'X' | 'O' | null;

const TicTacToe: React.FC = () => {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const winner = calculateWinner(board);

    const handleClick = (i: number) => {
        if (winner || board[i]) return;
        const newBoard = [...board];
        newBoard[i] = 'X';
        setBoard(newBoard);
        setIsXNext(false);
    };

    useEffect(() => {
        if (!isXNext && !winner) {
            const emptySquares = board.map((sq, i) => sq === null ? i : null).filter(i => i !== null);
            if (emptySquares.length > 0) {
              const move = emptySquares[Math.floor(Math.random() * emptySquares.length)] as number;
              setTimeout(() => {
                  const newBoard = [...board];
                  newBoard[move] = 'O';
                  setBoard(newBoard);
                  setIsXNext(true);
              }, 500);
            }
        }
    }, [isXNext, board, winner]);

    const handleReset = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    const getStatus = () => {
        if (winner) return `Winner: ${winner}`;
        if (board.every(Boolean)) return "It's a draw!";
        return `Next player: ${isXNext ? 'X' : 'O'}`;
    };

    const renderSquare = (i: number) => (
        <button
            className={`w-24 h-24 text-5xl font-bold flex justify-center items-center border-2 border-gray-600
                ${board[i] === 'X' ? 'text-cyan-400' : 'text-yellow-400'}`}
            onClick={() => handleClick(i)}
        >
            {board[i]}
        </button>
    );

    return (
        <div className="flex flex-col items-center">
            <div className="text-2xl mb-4">{getStatus()}</div>
            <div className="grid grid-cols-3">
                {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
                {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
                {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
            </div>
            {(winner || board.every(Boolean)) && (
                <button
                    className="mt-6 px-6 py-2 bg-purple-600 rounded-md hover:bg-purple-700"
                    onClick={handleReset}
                >
                    Play Again
                </button>
            )}
        </div>
    );
};

function calculateWinner(squares: Player[]): Player {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default TicTacToe;
