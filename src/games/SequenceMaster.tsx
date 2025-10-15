
import React, { useState, useEffect, useCallback } from 'react';

interface Sequence {
    sequence: number[];
    answer: number;
    type: string;
}

const generateSequence = (): Sequence => {
    const start = Math.floor(Math.random() * 10) + 1;
    const diff = Math.floor(Math.random() * 5) + 1;
    const type = Math.floor(Math.random() * 3);

    switch (type) {
        case 0: // Arithmetic
            return {
                sequence: [start, start + diff, start + 2 * diff],
                answer: start + 3 * diff,
                type: `Arithmetic (+${diff})`
            };
        case 1: // Geometric
            return {
                sequence: [start, start * diff, start * diff * diff],
                answer: start * diff * diff * diff,
                type: `Geometric (x${diff})`
            };
        case 2: // Square
            return {
                sequence: [start*start, (start+1)*(start+1), (start+2)*(start+2)],
                answer: (start+3)*(start+3),
                type: `Squares`
            };
        default: // Fallback
            return { sequence: [1, 2, 3], answer: 4, type: 'Arithmetic (+1)' };
    }
};

const SequenceMaster: React.FC = () => {
    const [currentSequence, setCurrentSequence] = useState<Sequence | null>(null);
    const [userInput, setUserInput] = useState('');
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);

    const newQuestion = useCallback(() => {
        setCurrentSequence(generateSequence());
        setUserInput('');
        setMessage('');
    }, []);

    useEffect(() => {
        newQuestion();
    }, [newQuestion]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numInput = parseInt(userInput, 10);
        if (isNaN(numInput)) {
            setMessage("Please enter a number.");
            return;
        }

        if (numInput === currentSequence?.answer) {
            setScore(prev => prev + 1);
            setMessage('Correct!');
        } else {
            setMessage(`Wrong! The answer was ${currentSequence?.answer}.`);
        }
        setTimeout(newQuestion, 1500);
    };

    if (!currentSequence) return <div>Loading...</div>;

    return (
        <div className="text-center p-4 max-w-md mx-auto">
            <p className="text-2xl mb-4">Score: {score}</p>
            <div className="bg-gray-700 p-8 rounded-lg">
                <p className="text-xl mb-2">What is the next number in the sequence?</p>
                <p className="text-5xl font-mono mb-6">
                    {currentSequence.sequence.join(', ')}, ?
                </p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="w-full text-center text-3xl p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        autoFocus
                    />
                </form>
                <p className="mt-4 h-6 text-lg">{message}</p>
            </div>
        </div>
    );
};

export default SequenceMaster;
