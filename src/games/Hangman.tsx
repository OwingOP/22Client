
import React, { useState, useEffect, useCallback } from 'react';

const WORDS = ["react", "tailwind", "typescript", "component", "javascript", "developer"];
const MAX_WRONG_GUESSES = 6;

const Hangman: React.FC = () => {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);

  const startNewGame = useCallback(() => {
    setWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const displayedWord = word.split('').map(letter => guessedLetters.has(letter) ? letter : '_').join(' ');

  const isWon = word && word.split('').every(letter => guessedLetters.has(letter));
  const isLost = wrongGuesses >= MAX_WRONG_GUESSES;
  const gameOver = isWon || isLost;

  const handleGuess = (letter: string) => {
    if (gameOver || guessedLetters.has(letter)) return;
    
    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!word.includes(letter)) {
      setWrongGuesses(prev => prev + 1);
    }
  };

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-4xl tracking-widest font-mono mb-4">{displayedWord}</p>
      <p className="mb-4">Wrong Guesses: {wrongGuesses} / {MAX_WRONG_GUESSES}</p>
      
      {gameOver ? (
        <div className="my-4">
          <p className={`text-3xl font-bold ${isWon ? 'text-green-400' : 'text-red-400'}`}>
            {isWon ? 'You Won!' : 'You Lost!'}
          </p>
          {!isWon && <p className="text-xl mt-2">The word was: <span className="font-bold">{word}</span></p>}
          <button onClick={startNewGame} className="mt-4 px-6 py-2 bg-purple-600 rounded-md hover:bg-purple-700">
            Play Again
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-2 max-w-lg">
          {alphabet.map(letter => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.has(letter)}
              className="w-10 h-10 text-xl font-bold bg-gray-600 rounded disabled:bg-gray-800 disabled:text-gray-500 hover:enabled:bg-cyan-600"
            >
              {letter.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hangman;
