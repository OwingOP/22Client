
import React, { useState, useEffect, useCallback } from 'react';

const AimTrainer: React.FC = () => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [targetPosition, setTargetPosition] = useState({ top: '50%', left: '50%' });
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const moveTarget = useCallback(() => {
        const top = Math.random() * 85 + 5;
        const left = Math.random() * 85 + 5;
        setTargetPosition({ top: `${top}%`, left: `${left}%` });
    }, []);

    useEffect(() => {
        if (!gameStarted || gameOver) return;
        
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setGameOver(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameStarted, gameOver]);

    const handleTargetClick = () => {
        if (gameOver) return;
        setScore(prev => prev + 1);
        moveTarget();
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameStarted(true);
        setGameOver(false);
        moveTarget();
    };

    return (
        <div className="text-center p-4">
            <div className="mb-4 text-2xl font-bold">
                <span className="mr-8">Score: {score}</span>
                <span>Time: {timeLeft}s</span>
            </div>
            <div className="relative w-full h-96 bg-gray-900 rounded-lg border-2 border-cyan-400 overflow-hidden">
                {!gameStarted || gameOver ? (
                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                        {gameOver && <p className="text-4xl mb-4">Final Score: {score}</p>}
                        <button
                            onClick={startGame}
                            className="text-2xl font-bold px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                        >
                            {gameOver ? 'Play Again' : 'Start'}
                        </button>
                    </div>
                ) : (
                    <div
                        className="absolute w-12 h-12 bg-red-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out"
                        style={{ top: targetPosition.top, left: targetPosition.left }}
                        onClick={handleTargetClick}
                    />
                )}
            </div>
        </div>
    );
};

export default AimTrainer;
