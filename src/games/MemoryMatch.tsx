
import React, { useState, useEffect } from 'react';

const EMOJIS = ['🍕', '🚀', '🎸', '⚽️', '💻', '💡', '📚', '🎉'];

const MemoryMatch: React.FC = () => {
    const [cards, setCards] = useState<(string | null)[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matched, setMatched] = useState<string[]>([]);
    const [isChecking, setIsChecking] = useState(false);
    
    const setupGame = () => {
        const duplicatedEmojis = [...EMOJIS, ...EMOJIS];
        const shuffled = duplicatedEmojis.sort(() => Math.random() - 0.5);
        setCards(shuffled);
        setFlipped([]);
        setMatched([]);
        setIsChecking(false);
    };

    useEffect(() => {
        setupGame();
    }, []);

    useEffect(() => {
        if (flipped.length === 2) {
            setIsChecking(true);
            const [firstIndex, secondIndex] = flipped;
            if (cards[firstIndex] === cards[secondIndex]) {
                setMatched(prev => [...prev, cards[firstIndex]!]);
                setFlipped([]);
                setIsChecking(false);
            } else {
                setTimeout(() => {
                    setFlipped([]);
                    setIsChecking(false);
                }, 1000);
            }
        }
    }, [flipped, cards]);

    const handleCardClick = (index: number) => {
        if (isChecking || flipped.includes(index) || matched.includes(cards[index]!)) {
            return;
        }
        setFlipped(prev => [...prev, index]);
    };
    
    const isWon = matched.length === EMOJIS.length;

    return (
        <div className="flex flex-col items-center">
            {isWon && (
                <div className="text-center mb-4">
                    <h2 className="text-3xl font-bold text-green-400">You Won!</h2>
                    <button onClick={setupGame} className="mt-2 px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700">Play Again</button>
                </div>
            )}
            <div className="grid grid-cols-4 gap-4">
                {cards.map((emoji, index) => {
                    const isFlipped = flipped.includes(index) || matched.includes(emoji!);
                    return (
                        <div
                            key={index}
                            onClick={() => handleCardClick(index)}
                            className={`w-20 h-24 sm:w-24 sm:h-28 flex justify-center items-center text-4xl rounded-lg cursor-pointer transition-transform duration-500`}
                            style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : '' }}
                        >
                            <div className="absolute w-full h-full backface-hidden flex justify-center items-center bg-cyan-600 rounded-lg">
                            </div>
                            <div className="absolute w-full h-full backface-hidden flex justify-center items-center bg-gray-700 rounded-lg" style={{ transform: 'rotateY(180deg)' }}>
                                {emoji}
                            </div>
                        </div>
                    );
                })}
            </div>
            <style>{`.backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }`}</style>
        </div>
    );
};

export default MemoryMatch;
