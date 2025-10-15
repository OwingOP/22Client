
import React, { useState, useCallback, useEffect } from 'react';

const BOARD_SIZE = 12;
const COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#ec4899'];
const MAX_MOVES = 25;

const generateBoard = () => {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => COLORS[Math.floor(Math.random() * COLORS.length)])
  );
};

const ColorFlood: React.FC = () => {
  const [board, setBoard] = useState(generateBoard());
  const [moves, setMoves] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');

  const floodFill = useCallback((newColor: string) => {
    if (gameState !== 'playing') return;

    const oldColor = board[0][0];
    if (newColor === oldColor) return;

    setMoves(prev => prev + 1);

    const newBoard = board.map(row => [...row]);
    const stack: [number, number][] = [[0, 0]];
    const visited = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(false));
    visited[0][0] = true;

    while (stack.length > 0) {
      const [r, c] = stack.pop()!;
      newBoard[r][c] = newColor;

      const neighbors = [[r-1, c], [r+1, c], [r, c-1], [r, c+1]];
      for (const [nr, nc] of neighbors) {
        if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && !visited[nr][nc]) {
          if (newBoard[nr][nc] === oldColor) {
            stack.push([nr, nc]);
            visited[nr][nc] = true;
          }
        }
      }
    }
    setBoard(newBoard);
  }, [board, gameState]);

  useEffect(() => {
    const firstColor = board[0][0];
    const isWon = board.every(row => row.every(cell => cell === firstColor));
    if (isWon) {
      setGameState('won');
    } else if (moves >= MAX_MOVES) {
      setGameState('lost');
    }
  }, [board, moves]);
  
  const handleReset = () => {
    setBoard(generateBoard());
    setMoves(0);
    setGameState('playing');
  }

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 text-xl">
        Moves: {moves} / {MAX_MOVES}
      </div>
      <div className="grid gap-1 mb-4" style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)` }}>
        {board.map((row, r) =>
          row.map((color, c) => (
            <div key={`${r}-${c}`} className="w-6 h-6 sm:w-8 sm:h-8" style={{ backgroundColor: color }} />
          ))
        )}
      </div>
      {gameState === 'playing' ? (
        <div className="flex gap-2">
          {COLORS.map(color => (
            <button
              key={color}
              className="w-10 h-10 rounded-full"
              style={{ backgroundColor: color }}
              onClick={() => floodFill(color)}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
            <p className={`text-4xl font-bold mb-4 ${gameState === 'won' ? 'text-green-400' : 'text-red-400'}`}>
                {gameState === 'won' ? 'You Win!' : 'Game Over'}
            </p>
            <button onClick={handleReset} className="text-xl font-bold px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                Play Again
            </button>
        </div>
      )}
    </div>
  );
};

export default ColorFlood;
