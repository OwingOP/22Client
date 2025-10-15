
import React, { useState, useEffect, useRef } from 'react';

const TEXT_TO_TYPE = "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet. Practice makes perfect, so type this as fast and as accurately as you can. Good luck!";

const TypingTest: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!gameOver) {
            inputRef.current?.focus();
        }
    }, [gameOver]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (gameOver) return;

        if (!startTime) {
            setStartTime(Date.now());
        }
        
        setUserInput(value);
        
        if (value.length >= TEXT_TO_TYPE.length) {
            calculateResults(value);
        }
    };
    
    const calculateResults = (finalText: string) => {
        setGameOver(true);
        const endTime = Date.now();
        const durationInMinutes = (endTime - startTime!) / 1000 / 60;
        const wordsTyped = finalText.split(' ').length;
        const calculatedWpm = Math.round(wordsTyped / durationInMinutes);
        setWpm(calculatedWpm);

        let correctChars = 0;
        for (let i = 0; i < TEXT_TO_TYPE.length; i++) {
            if (finalText[i] === TEXT_TO_TYPE[i]) {
                correctChars++;
            }
        }
        const calculatedAccuracy = Math.round((correctChars / TEXT_TO_TYPE.length) * 100);
        setAccuracy(calculatedAccuracy);
    };
    
    const resetTest = () => {
        setUserInput('');
        setStartTime(null);
        setWpm(0);
        setAccuracy(0);
        setGameOver(false);
    };
    
    const getHighlightedText = () => {
        return TEXT_TO_TYPE.split('').map((char, index) => {
            let color = 'text-gray-500';
            if (index < userInput.length) {
                color = char === userInput[index] ? 'text-green-400' : 'text-red-500 bg-red-900';
            }
            return <span key={index} className={color}>{char}</span>;
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-gray-800 p-4 rounded-lg mb-4 text-xl font-mono leading-relaxed">
                {getHighlightedText()}
            </div>
            <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                className="w-full p-2 text-lg bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Start typing here..."
                disabled={gameOver}
            />
            {gameOver && (
                <div className="mt-6 text-center">
                    <h3 className="text-3xl font-bold mb-4">Results</h3>
                    <div className="flex justify-around text-2xl">
                        <p>WPM: <span className="font-bold text-cyan-300">{wpm}</span></p>
                        <p>Accuracy: <span className="font-bold text-cyan-300">{accuracy}%</span></p>
                    </div>
                    <button onClick={resetTest} className="mt-6 px-6 py-2 bg-purple-600 rounded-md hover:bg-purple-700">
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default TypingTest;
