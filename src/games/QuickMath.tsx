
import React, { useState, useEffect, useCallback, useRef } from 'react';

type Operator = '+' | '-' | '*';

const QuickMath: React.FC = () => {
    const [problem, setProblem] = useState('');
    const [answer, setAnswer] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [gameOver, setGameOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const generateProblem = useCallback(() => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operators: Operator[] = ['+', '-', '*'];
        const operator = operators[Math.floor(Math.random() * operators.length)];

        let problemString = `${num1} ${operator} ${num2}`;
        let result: number;

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                // Ensure result is not negative
                if (num1 < num2) {
                  problemString = `${num2} ${operator} ${num1}`;
                  result = num2 - num1;
                } else {
                  result = num1 - num2;
                }
                break;
            case '*':
                result = num1 * num2;
                break;
        }
        setProblem(problemString);
        setAnswer(result);
        setUserInput('');
    }, []);

    useEffect(() => {
        generateProblem();
        inputRef.current?.focus();
    }, [generateProblem]);
    
    useEffect(() => {
        if (timeLeft > 0 && !gameOver) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setGameOver(true);
        }
    }, [timeLeft, gameOver]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (parseInt(userInput) === answer) {
            setScore(score + 1);
        }
        generateProblem();
    };
    
    const restartGame = () => {
        setScore(0);
        setTimeLeft(60);
        setGameOver(false);
        generateProblem();
        inputRef.current?.focus();
    };

    if (gameOver) {
        return (
            <div className="text-center p-4">
                <h2 className="text-4xl font-bold text-red-400 mb-4">Time's Up!</h2>
                <p className="text-2xl mb-6">Final Score: {score}</p>
                <button onClick={restartGame} className="text-xl font-bold px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg transition-colors">
                    Play Again
                </button>
            </div>
        );
    }

    return (
        <div className="text-center p-4 max-w-sm mx-auto">
            <div className="flex justify-around text-2xl mb-6">
                <p>Score: <span className="font-bold text-cyan-300">{score}</span></p>
                <p>Time: <span className="font-bold text-cyan-300">{timeLeft}s</span></p>
            </div>
            <div className="bg-gray-700 p-8 rounded-lg">
                <p className="text-5xl font-mono mb-6">{problem} = ?</p>
                <form onSubmit={handleSubmit}>
                    <input
                        ref={inputRef}
                        type="number"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="w-full text-center text-3xl p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        autoFocus
                    />
                </form>
            </div>
        </div>
    );
};

export default QuickMath;
