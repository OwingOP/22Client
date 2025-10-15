
import React, { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const DIRECTIONS: { [key: string]: { x: number; y: number } } = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

const Snake: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(DIRECTIONS.ArrowRight);
  const [speed, setSpeed] = useState(200);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const generateFood = useCallback((currentSnake: {x: number, y: number}[]) => {
    while (true) {
      const newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        setFood(newFood);
        return;
      }
    }
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(DIRECTIONS.ArrowRight);
    generateFood(INITIAL_SNAKE);
    setSpeed(200);
    setGameOver(false);
    setScore(0);
  }, [generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if(DIRECTIONS[e.key]) {
            // Prevent snake from reversing
            if (
                (e.key === 'ArrowUp' && direction.y === 1) ||
                (e.key === 'ArrowDown' && direction.y === -1) ||
                (e.key === 'ArrowLeft' && direction.x === 1) ||
                (e.key === 'ArrowRight' && direction.x === -1)
            ) {
                return;
            }
            setDirection(DIRECTIONS[e.key]);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;
    const gameInterval = setInterval(() => {
      const newSnake = [...snake];
      const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

      // Wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        return;
      }
      
      // Self collision
      for (let i = 1; i < newSnake.length; i++) {
        if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
          setGameOver(true);
          return;
        }
      }

      newSnake.unshift(head);

      // Food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 1);
        setSpeed(prev => Math.max(50, prev - 5));
        generateFood(newSnake);
      } else {
        newSnake.pop();
      }
      
      setSnake(newSnake);
    }, speed);

    return () => clearInterval(gameInterval);
  }, [snake, direction, speed, food, gameOver, generateFood]);

  return (
    <div className="flex flex-col items-center">
        <p className="text-2xl mb-2">Score: {score}</p>
      <div
        className="grid bg-gray-900 border-2 border-cyan-400"
        style={{
          width: GRID_SIZE * 20,
          height: GRID_SIZE * 20,
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {gameOver && (
            <div className="col-span-full row-span-full flex flex-col justify-center items-center bg-black/70 z-10">
                <p className="text-4xl text-red-500 font-bold">Game Over</p>
                <button onClick={resetGame} className="mt-4 px-4 py-2 bg-purple-600 rounded">Play Again</button>
            </div>
        )}
        {snake.map((segment, index) => (
          <div
            key={index}
            className="bg-green-500"
            style={{ gridColumn: segment.x + 1, gridRow: segment.y + 1 }}
          />
        ))}
        <div
          className="bg-red-500"
          style={{ gridColumn: food.x + 1, gridRow: food.y + 1 }}
        />
      </div>
      <p className="mt-4 text-gray-400">Use arrow keys to move.</p>
    </div>
  );
};

export default Snake;
