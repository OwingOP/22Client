
import React, { useState, useEffect, useCallback } from 'react';

// Using a smaller subset for brevity. In a real app, this would be much larger.
const FLAGS: Record<string, string> = {
    'DE': 'Germany', 'US': 'United States', 'FR': 'France', 'JP': 'Japan',
    'CA': 'Canada', 'BR': 'Brazil', 'IN': 'India', 'AU': 'Australia',
    'CN': 'China', 'GB': 'United Kingdom', 'IT': 'Italy', 'MX': 'Mexico',
};
const flagCodes = Object.keys(FLAGS);

const FlagFrenzy: React.FC = () => {
    const [currentFlag, setCurrentFlag] = useState('');
    const [options, setOptions] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('');

    const generateQuestion = useCallback(() => {
        const randomCode = flagCodes[Math.floor(Math.random() * flagCodes.length)];
        setCurrentFlag(randomCode);

        const correctAnswer = FLAGS[randomCode];
        let wrongAnswers = Object.values(FLAGS).filter(c => c !== correctAnswer);
        wrongAnswers = wrongAnswers.sort(() => 0.5 - Math.random()).slice(0, 3);
        
        const newOptions = [...wrongAnswers, correctAnswer].sort(() => 0.5 - Math.random());
        setOptions(newOptions);
        setMessage('');
    }, []);

    useEffect(() => {
        generateQuestion();
    }, [generateQuestion]);

    const handleAnswer = (country: string) => {
        if (country === FLAGS[currentFlag]) {
            setScore(prev => prev + 1);
            setMessage('Correct!');
        } else {
            setMessage(`Wrong! That's the flag of ${FLAGS[currentFlag]}.`);
        }
        setTimeout(generateQuestion, 1500);
    };

    return (
        <div className="text-center p-4 flex flex-col items-center">
            <p className="text-2xl mb-4">Score: {score}</p>
            {currentFlag && (
                <div className="bg-gray-700 p-8 rounded-lg min-w-[300px] sm:min-w-[400px]">
                    <p className="text-xl mb-4">Which country's flag is this?</p>
                    <img
                        src={`https://flagsapi.com/${currentFlag}/shiny/64.png`}
                        alt="Country flag"
                        className="mx-auto mb-6 border-2 border-gray-500"
                        width="96"
                        height="64"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        {options.map(country => (
                            <button
                                key={country}
                                onClick={() => handleAnswer(country)}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded transition-colors"
                            >
                                {country}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {message && <p className="mt-6 text-lg h-6">{message}</p>}
        </div>
    );
};

export default FlagFrenzy;
