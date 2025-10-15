
import React, { useState, useEffect, useCallback } from 'react';

const NumberGuess: React.FC = () => {
    const [secretNumber, setSecretNumber] = useState(0);
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('Guess a number between 1 and 100');
    const [attempts, setAttempts] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const startNewGame = useCallback(() => {
        setSecretNumber(Math.floor(Math.random() * 100) + 1);
        setGuess('');
        setMessage('Guess a number between 1 and 100');
        setAttempts(0);
        setGameOver(false);
    }, []);

    useEffect(() => {
        startNewGame();
    }, [startNewGame]);
    
    const handleGuess = (e: React.FormEvent) => {
        e.preventDefault();
        if (gameOver) return;
        
        const numGuess = parseInt(guess, 10);
        if (isNaN(numGuess)) {
            setMessage('Please enter a valid number.');
            return;
        }

        setAttempts(attempts + 1);
        if (numGuess === secretNumber) {
            setMessage(`You got it in ${attempts + 1} attempts!`);
            setGameOver(true);
        } else if (numGuess < secretNumber) {
            setMessage('Too low! Guess higher.');
        } else {
            setMessage('Too high! Guess lower.');
        }
        setGuess('');
    };

    return (
        <div className="text-center p-4 max-w-sm mx-auto">
            <h2 className="text-2xl font-bold mb-4">Number Guess</h2>
            <div className="bg-gray-700 p-6 rounded-lg">
                <p className="text-lg mb-4 h-12">{message}</p>
                {gameOver ? (
                    <button onClick={startNewGame} className="w-full py-2 text-xl font-bold bg-green-500 hover:bg-green-600 rounded-lg">
                        Play Again
                    </button>
                ) : (
                    <form onSubmit={handleGuess}>
                        <input
                            type="number"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            className="w-full text-center text-2xl p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            autoFocus
                        />
                        <button type="submit" className="mt-4 w-full py-2 text-xl font-bold bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
                            Guess
                        </button>
                    </form>
                )}
                <p className="mt-4">Attempts: {attempts}</p>
            </div>
        </div>
    );
};

export default NumberGuess;
