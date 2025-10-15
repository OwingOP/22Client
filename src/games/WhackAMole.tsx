
import React, { useState, useEffect } from 'react';

const WhackAMole: React.FC = () => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [moles, setMoles] = useState<boolean[]>(Array(9).fill(false));
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (timeLeft > 0 && !gameOver) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setGameOver(true);
        }
    }, [timeLeft, gameOver]);

    useEffect(() => {
        if (gameOver) return;
        
        const moleInterval = setInterval(() => {
            const newMoles = Array(9).fill(false);
            const randomIndex = Math.floor(Math.random() * 9);
            newMoles[randomIndex] = true;
            setMoles(newMoles);
        }, 800);

        return () => clearInterval(moleInterval);
    }, [gameOver]);
    
    const whackMole = (index: number) => {
        if (gameOver || !moles[index]) return;
        setScore(score + 1);
        setMoles(Array(9).fill(false));
    };

    const restartGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameOver(false);
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
        <div className="flex flex-col items-center">
            <div className="flex justify-around text-2xl mb-4 w-full max-w-sm">
                <p>Score: <span className="font-bold text-cyan-300">{score}</span></p>
                <p>Time: <span className="font-bold text-cyan-300">{timeLeft}</span></p>
            </div>
            <div className="grid grid-cols-3 gap-4 p-4 bg-yellow-900 rounded-lg">
                {moles.map((isMole, index) => (
                    <div key={index} className="w-24 h-24 bg-yellow-700 rounded-full flex justify-center items-center overflow-hidden">
                        {isMole && (
                            <div 
                                className="w-20 h-20 bg-gray-600 rounded-full cursor-pointer animate-popup"
                                onClick={() => whackMole(index)}
                            >
                              {/* Mole Face */}
                              <div className="relative w-full h-full">
                                <div className="absolute top-6 left-5 w-3 h-3 bg-black rounded-full"></div>
                                <div className="absolute top-6 right-5 w-3 h-3 bg-black rounded-full"></div>
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-6 h-3 bg-pink-300 rounded-b-full"></div>
                              </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <style>{`
              @keyframes popup {
                0% { transform: translateY(100%); }
                100% { transform: translateY(0); }
              }
              .animate-popup { animation: popup 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default WhackAMole;
