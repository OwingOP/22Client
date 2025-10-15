
import React, { useState, useEffect, useRef } from 'react';

const ClickSpeedTest: React.FC = () => {
    const [clicks, setClicks] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [gameStarted, setGameStarted] = useState(false);
    const [cps, setCps] = useState(0);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (gameStarted && timeLeft > 0) {
            timerRef.current = window.setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0 && gameStarted) {
            setGameStarted(false);
            setCps(clicks / 10);
        }
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [timeLeft, gameStarted, clicks]);
    
    const startTest = () => {
        setClicks(0);
        setTimeLeft(10);
        setGameStarted(true);
        setCps(0);
    };
    
    const handleClick = () => {
        if (gameStarted) {
            setClicks(clicks + 1);
        } else if (timeLeft > 0) {
            // Start on first click
            startTest();
            setClicks(1); // Register the first click
        }
    };
    
    const getButtonText = () => {
        if (!gameStarted && timeLeft === 10) return "Click to Start";
        if (gameStarted) return "Click!";
        return "Test Over!";
    }

    const getButtonClass = () => {
      if (!gameStarted && timeLeft === 10) return "bg-green-500 hover:bg-green-600";
      if (gameStarted) return "bg-blue-500 hover:bg-blue-600 active:scale-95";
      return "bg-gray-600 cursor-not-allowed";
    }

    return (
        <div className="text-center p-4 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4">Click Speed Test</h2>
            <div className="w-full max-w-lg bg-gray-700 p-8 rounded-lg">
                <div className="flex justify-around text-2xl mb-6">
                    <p>Time Left: <span className="font-bold text-cyan-300">{timeLeft}s</span></p>
                    <p>Clicks: <span className="font-bold text-cyan-300">{clicks}</span></p>
                </div>
                <button
                    onClick={handleClick}
                    className={`w-full h-40 text-4xl font-bold text-white rounded-lg transition-all duration-100 ${getButtonClass()}`}
                    disabled={timeLeft === 0 && !gameStarted}
                >
                    {getButtonText()}
                </button>
                {cps > 0 && (
                    <div className="mt-6 text-3xl">
                        Your score: <span className="font-bold text-green-400">{cps.toFixed(2)} CPS</span>
                        <button onClick={startTest} className="block mx-auto mt-4 text-xl px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700">
                          Try Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClickSpeedTest;
