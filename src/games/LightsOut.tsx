
import React, { useState, useEffect } from 'react';

const GRID_SIZE = 5;

const LightsOut: React.FC = () => {
    const [board, setBoard] = useState<boolean[][]>([]);
    const [isWon, setIsWon] = useState(false);

    const createBoard = () => {
        let newBoard = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false));
        // Press random buttons to create a solvable puzzle
        for (let i = 0; i < 15; i++) {
            const r = Math.floor(Math.random() * GRID_SIZE);
            const c = Math.floor(Math.random() * GRID_SIZE);
            newBoard = toggleLights(r, c, newBoard);
        }
        setBoard(newBoard);
        setIsWon(false);
    };

    useEffect(() => {
        createBoard();
    }, []);

    const toggleLights = (r: number, c: number, currentBoard: boolean[][]): boolean[][] => {
        const newBoard = currentBoard.map(row => [...row]);
        const positions = [[r, c], [r-1, c], [r+1, c], [r, c-1], [r, c+1]];
        positions.forEach(([row, col]) => {
            if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
                newBoard[row][col] = !newBoard[row][col];
            }
        });
        return newBoard;
    };
    
    const handleCellClick = (r: number, c: number) => {
        if (isWon) return;
        
        const newBoard = toggleLights(r, c, board);
        setBoard(newBoard);

        if (newBoard.every(row => row.every(cell => !cell))) {
            setIsWon(true);
        }
    };

    return (
        <div className="flex flex-col items-center">
            {isWon ? (
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-green-400 mb-4">You Won!</h2>
                    <button onClick={createBoard} className="text-xl font-bold px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                        Play Again
                    </button>
                </div>
            ) : (
                <div className="p-2 bg-gray-900 rounded-lg grid gap-2" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
                    {board.map((row, r) =>
                        row.map((isOn, c) => (
                            <div
                                key={`${r}-${c}`}
                                onClick={() => handleCellClick(r, c)}
                                className={`w-16 h-16 rounded-lg cursor-pointer transition-colors duration-200 ${
                                    isOn ? 'bg-yellow-400 shadow-lg shadow-yellow-400/30' : 'bg-gray-700'
                                }`}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default LightsOut;
