
import React, { useState, useEffect, useCallback } from 'react';

const WORDS = ["apple", "banana", "cherry", "orange", "grape", "lemon", "react"];

const scrambleWord = (word: string): string => {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // ensure it's not the same word
    if (arr.join('') === word) {
      return scrambleWord(word);
    }
    return arr.join('');
};

const WordScramble: React.FC = () => {
    const [originalWord, setOriginalWord] = useState('');
    const [scrambledWord, setScrambledWord] = useState('');
    const [userInput, setUserInput] = useState('');
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);

    const newWord = useCallback(() => {
        const word = WORDS[Math.floor(Math.random() * WORDS.length)];
        setOriginalWord(word);
        setScrambledWord(scrambleWord(word));
        setUserInput('');
        setMessage('');
    }, []);

    useEffect(() => {
        newWord();
    }, [newWord]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userInput.toLowerCase() === originalWord) {
            setScore(prev => prev + 1);
            setMessage('Correct!');
            setTimeout(newWord, 1000);
        } else {
            setMessage('Try again!');
        }
    };
    
    return (
        <div className="text-center p-4 max-w-md mx-auto">
            <p className="text-2xl mb-4">Score: {score}</p>
            <div className="bg-gray-700 p-8 rounded-lg">
                <p className="text-xl mb-2">Unscramble the word:</p>
                <p className="text-5xl font-mono tracking-widest mb-6">{scrambledWord}</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="w-full text-center text-3xl p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        autoFocus
                    />
                     <button type="submit" className="mt-4 w-full py-2 text-xl font-bold bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
                        Submit
                    </button>
                </form>
                <p className="mt-4 h-6 text-lg">{message}</p>
            </div>
             <button onClick={newWord} className="mt-4 px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700">
                Skip Word
            </button>
        </div>
    );
};

export default WordScramble;
