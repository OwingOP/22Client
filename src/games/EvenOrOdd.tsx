
import React, { useState, useEffect, useCallback } from 'react';

const EvenOrOdd: React.FC = () => {
    const [number, setNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameOver, setGameOver] = useState(false);

    const generateNumber = useCallback(() => {
        setNumber(Math.floor(Math.random() * 100) + 1);
    }, []);

    useEffect(() => {
        generateNumber();
    }, [generateNumber]);
    
    useEffect(() => {
        if (timeLeft > 0 && !gameOver) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setGameOver(true);
        }
    }, [timeLeft, gameOver]);

    const handleAnswer = (choice: 'even' | 'odd') => {
        if (gameOver) return;
        
        const isEven = number % 2 === 0;
        if ((isEven && choice === 'even') || (!isEven && choice === 'odd')) {
            setScore(score + 1);
        } else {
            setScore(score - 1);
        }
        generateNumber();
    };

    const restartGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameOver(false);
        generateNumber();
    };

    if (gameOver) {
        return (
            <div className="text-center p-4">
                <h2 className="text-4xl font-bold text-red-400 mb-4">Game Over!</h2>
                <p className="text-2xl mb-6">Final Score: {score}</p>
                <button onClick={restartGame} className="text-xl font-bold px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg transition-colors">
                    Play Again
                </button>
            </div>
        );
    }
    
    return (
        <div className="text-center p-4">
            <div className="flex justify-around text-2xl mb-6">
                <p>Score: <span className="font-bold text-cyan-300">{score}</span></p>
                <p>Time Left: <span className="font-bold text-cyan-300">{timeLeft}</span></p>
            </div>
            <div className="bg-gray-700 p-8 rounded-lg">
                <p className="text-8xl font-bold mb-8">{number}</p>
                <div className="flex justify-center gap-4">
                    <button 
                        onClick={() => handleAnswer('even')}
                        className="w-32 py-4 text-2xl font-bold bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                    >
                        Even
                    </button>
                    <button 
                        onClick={() => handleAnswer('odd')}
                        className="w-32 py-4 text-2xl font-bold bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
                    >
                        Odd
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EvenOrOdd;
