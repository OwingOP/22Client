
import React, { useState, useEffect, useMemo, useCallback } from 'react';

const COUNTRIES: Record<string, string> = {
    "Japan": "Tokyo",
    "France": "Paris",
    "Germany": "Berlin",
    "Egypt": "Cairo",
    "Brazil": "Brasília",
    "Canada": "Ottawa",
    "Australia": "Canberra",
    "India": "New Delhi",
    "China": "Beijing",
    "Russia": "Moscow",
    "United Kingdom": "London",
    "United States": "Washington, D.C."
};

const countryNames = Object.keys(COUNTRIES);
const allCapitals = Object.values(COUNTRIES);

const CapitalCityQuiz: React.FC = () => {
    const [currentCountry, setCurrentCountry] = useState('');
    const [options, setOptions] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('');

    const generateQuestion = useCallback(() => {
        const randomCountry = countryNames[Math.floor(Math.random() * countryNames.length)];
        setCurrentCountry(randomCountry);
        
        const correctAnswer = COUNTRIES[randomCountry];
        let wrongAnswers = allCapitals.filter(c => c !== correctAnswer);
        wrongAnswers = wrongAnswers.sort(() => 0.5 - Math.random()).slice(0, 3);
        
        const newOptions = [...wrongAnswers, correctAnswer].sort(() => 0.5 - Math.random());
        setOptions(newOptions);
        setMessage('');
    }, []);

    useEffect(() => {
        generateQuestion();
    }, [generateQuestion]);

    const handleAnswer = (city: string) => {
        if (city === COUNTRIES[currentCountry]) {
            setScore(prev => prev + 1);
            setMessage('Correct! Next question...');
        } else {
            setMessage(`Wrong! The capital of ${currentCountry} is ${COUNTRIES[currentCountry]}.`);
        }
        setTimeout(generateQuestion, 1500);
    };

    return (
        <div className="text-center p-4 flex flex-col items-center">
            <p className="text-2xl mb-4">Score: {score}</p>
            <div className="bg-gray-700 p-8 rounded-lg min-w-[300px] sm:min-w-[400px]">
                <p className="text-xl mb-6">What is the capital of <span className="font-bold text-cyan-300">{currentCountry}</span>?</p>
                <div className="grid grid-cols-2 gap-4">
                    {options.map(city => (
                        <button
                            key={city}
                            onClick={() => handleAnswer(city)}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded transition-colors"
                        >
                            {city}
                        </button>
                    ))}
                </div>
                {message && <p className="mt-6 text-lg h-6">{message}</p>}
            </div>
        </div>
    );
};

export default CapitalCityQuiz;
