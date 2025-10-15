
// A simplified implementation of 2048
import React, { useState, useEffect, useCallback } from 'react';

type Board = (number | null)[][];

const Game2048: React.FC = () => {
    const [board, setBoard] = useState<Board>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const addRandomTile = (currentBoard: Board): Board => {
        let newBoard = currentBoard.map(row => [...row]);
        const emptyTiles: { r: number, c: number }[] = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (newBoard[r][c] === null) {
                    emptyTiles.push({ r, c });
                }
            }
        }
        if (emptyTiles.length > 0) {
            const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
        }
        return newBoard;
    };
    
    const initBoard = useCallback(() => {
        let newBoard: Board = Array(4).fill(null).map(() => Array(4).fill(null));
        newBoard = addRandomTile(newBoard);
        newBoard = addRandomTile(newBoard);
        setBoard(newBoard);
        setScore(0);
        setGameOver(false);
    },[]);

    useEffect(() => {
        initBoard();
    }, [initBoard]);

    const slide = (row: (number | null)[]): (number | null)[] => {
        let arr = row.filter(val => val);
        let missing = 4 - arr.length;
        let zeros = Array(missing).fill(null);
        return arr.concat(zeros);
    };

    const combine = (row: (number | null)[]): { newRow: (number | null)[], points: number } => {
        let points = 0;
        for (let i = 0; i < 3; i++) {
            if (row[i] !== null && row[i] === row[i + 1]) {
                const newValue = row[i]! * 2;
                row[i] = newValue;
                row[i + 1] = null;
                points += newValue;
            }
        }
        return { newRow: row, points };
    };

    const operate = (row: (number | null)[]): { newRow: (number | null)[], points: number } => {
        let newRow = slide(row);
        const { newRow: combinedRow, points } = combine(newRow);
        return { newRow: slide(combinedRow), points };
    };

    const rotate = (currentBoard: Board): Board => {
        let newBoard = Array(4).fill(null).map(() => Array(4).fill(null));
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                newBoard[r][c] = currentBoard[c][3 - r];
            }
        }
        return newBoard;
    };

    const move = (direction: 'left' | 'right' | 'up' | 'down') => {
        if (gameOver) return;
        let currentBoard = board.map(row => [...row]);
        let totalPoints = 0;
        let boardChanged = false;
        
        const rotations = { 'left': 0, 'up': 1, 'right': 2, 'down': 3 }[direction];
        for (let i = 0; i < rotations; i++) currentBoard = rotate(currentBoard);

        for (let r = 0; r < 4; r++) {
            const { newRow, points } = operate(currentBoard[r]);
            if (JSON.stringify(newRow) !== JSON.stringify(currentBoard[r])) boardChanged = true;
            totalPoints += points;
            currentBoard[r] = newRow;
        }

        for (let i = 0; i < (4 - rotations) % 4; i++) currentBoard = rotate(currentBoard);

        if (boardChanged) {
            setBoard(addRandomTile(currentBoard));
            setScore(s => s + totalPoints);
        }
    };
    
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowLeft': move('left'); break;
            case 'ArrowRight': move('right'); break;
            case 'ArrowUp': move('up'); break;
            case 'ArrowDown': move('down'); break;
        }
    }, [board, gameOver]); // dependencies are important here

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
    
    const getTileColor = (value: number | null) => {
        if (value === null) return 'bg-gray-700';
        const colors: Record<number, string> = {
            2: 'bg-gray-600 text-gray-200', 4: 'bg-yellow-800 text-white', 8: 'bg-orange-600 text-white',
            16: 'bg-orange-500 text-white', 32: 'bg-red-600 text-white', 64: 'bg-red-500 text-white',
            128: 'bg-yellow-500 text-white', 256: 'bg-yellow-400 text-white', 512: 'bg-yellow-300 text-white',
            1024: 'bg-green-400 text-white', 2048: 'bg-green-500 text-white',
        };
        return colors[value] || 'bg-black text-white';
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-between w-full max-w-sm mb-4">
                <div className="bg-gray-700 p-2 rounded">Score: {score}</div>
                <button onClick={initBoard} className="bg-purple-600 px-4 py-2 rounded">New Game</button>
            </div>
            <div className="bg-gray-900 p-2 rounded-lg grid grid-cols-4 gap-2">
                {board.map((row, r) =>
                    row.map((val, c) => (
                        <div key={`${r}-${c}`} className={`w-20 h-20 flex justify-center items-center text-3xl font-bold rounded ${getTileColor(val)}`}>
                            {val}
                        </div>
                    ))
                )}
            </div>
            <p className="mt-4 text-gray-400">Use arrow keys to move tiles.</p>
        </div>
    );
};

export default Game2048;
