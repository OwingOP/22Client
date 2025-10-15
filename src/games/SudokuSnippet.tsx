
import React, { useState, useEffect } from 'react';

// Basic 4x4 Sudoku logic
const SudokuSnippet: React.FC = () => {
    const [board, setBoard] = useState<(number | null)[][]>([]);
    const [solution, setSolution] = useState<number[][]>([]);
    const [initialBoard, setInitialBoard] = useState<(number | null)[][]>([]);
    const [isWon, setIsWon] = useState(false);

    const generatePuzzle = () => {
        // Simple pre-defined puzzle for this example
        const sol = [
            [1, 2, 3, 4],
            [3, 4, 1, 2],
            [2, 1, 4, 3],
            [4, 3, 2, 1],
        ];
        const puzzle = sol.map(row => row.map(cell => Math.random() > 0.5 ? cell : null));
        
        setBoard(puzzle);
        setInitialBoard(puzzle.map(row => [...row])); // Deep copy
        setSolution(sol);
        setIsWon(false);
    };

    useEffect(() => {
        generatePuzzle();
    }, []);

    const handleChange = (r: number, c: number, val: string) => {
        if (isWon) return;
        const num = val === '' ? null : parseInt(val, 10);
        if (num !== null && (isNaN(num) || num < 1 || num > 4)) return;

        const newBoard = board.map(row => [...row]);
        newBoard[r][c] = num;
        setBoard(newBoard);

        // Check for win
        let won = true;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (newBoard[i][j] !== solution[i][j]) {
                    won = false;
                    break;
                }
            }
            if (!won) break;
        }
        if (won) setIsWon(true);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-4 gap-1 p-1 bg-gray-900 border-2 border-cyan-400">
                {board.map((row, r) =>
                    row.map((cell, c) => (
                        <input
                            key={`${r}-${c}`}
                            type="text"
                            maxLength={1}
                            value={cell === null ? '' : cell}
                            onChange={e => handleChange(r, c, e.target.value)}
                            readOnly={initialBoard[r][c] !== null}
                            className={`w-16 h-16 text-3xl text-center border
                                ${ (r===1 || r===3) ? 'border-b-cyan-400' : 'border-b-gray-600'}
                                ${ (c===1 || c===3) ? 'border-r-cyan-400' : 'border-r-gray-600'}
                                ${ (initialBoard[r][c] !== null) ? 'bg-gray-700 text-gray-300' : 'bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-400'}
                            `}
                        />
                    ))
                )}
            </div>
            {isWon && (
                <div className="mt-4 text-center">
                    <h2 className="text-3xl font-bold text-green-400">You Solved It!</h2>
                    <button onClick={generatePuzzle} className="mt-2 px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700">New Puzzle</button>
                </div>
            )}
        </div>
    );
};

export default SudokuSnippet;
