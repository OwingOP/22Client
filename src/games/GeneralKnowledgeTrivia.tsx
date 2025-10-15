
import React, { useState, useEffect, useCallback } from 'react';

interface Question {
    question: string;
    options: string[];
    answer: string;
}

const TRIVIA_QUESTIONS: Question[] = [
    { question: "What is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Saturn", "Mars"], answer: "Jupiter" },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], answer: "William Shakespeare" },
    { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "G", "Go"], answer: "Au" },
    { question: "Which element has the atomic number 1?", options: ["Helium", "Oxygen", "Hydrogen", "Carbon"], answer: "Hydrogen" },
    { question: "In which year did the Titanic sink?", options: ["1905", "1912", "1918", "1923"], answer: "1912" }
];

const GeneralKnowledgeTrivia: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('');
    const [gameOver, setGameOver] = useState(false);

    const question = TRIVIA_QUESTIONS[currentQuestionIndex];

    const handleAnswer = (option: string) => {
        if (message) return; // Prevent answering while message is shown

        if (option === question.answer) {
            setScore(prev => prev + 1);
            setMessage('Correct!');
        } else {
            setMessage(`Wrong! The answer was ${question.answer}.`);
        }

        setTimeout(() => {
            if (currentQuestionIndex < TRIVIA_QUESTIONS.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setMessage('');
            } else {
                setGameOver(true);
            }
        }, 1500);
    };
    
    const restartGame = () => {
      setCurrentQuestionIndex(0);
      setScore(0);
      setMessage('');
      setGameOver(false);
    }

    if (gameOver) {
        return (
            <div className="text-center p-4">
                <h2 className="text-4xl font-bold mb-4">Trivia Complete!</h2>
                <p className="text-2xl mb-6">Your final score: {score} / {TRIVIA_QUESTIONS.length}</p>
                <button onClick={restartGame} className="text-xl font-bold px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg transition-colors">
                    Play Again
                </button>
            </div>
        );
    }

    return (
        <div className="text-center p-4 flex flex-col items-center">
            <p className="text-2xl mb-4">Score: {score}</p>
            <div className="bg-gray-700 p-8 rounded-lg min-w-[300px] sm:min-w-[500px]">
                <p className="text-xl mb-6 h-16">{question.question}</p>
                <div className="grid grid-cols-2 gap-4">
                    {question.options.map(option => (
                        <button
                            key={option}
                            onClick={() => handleAnswer(option)}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded transition-colors"
                        >
                            {option}
                        </button>
                    ))}
                </div>
                {message && <p className="mt-6 text-lg h-6">{message}</p>}
            </div>
        </div>
    );
};

export default GeneralKnowledgeTrivia;
