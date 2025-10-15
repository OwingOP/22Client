
import React, { useState } from 'react';

type Move = 'rock' | 'paper' | 'scissors';
const MOVES: Move[] = ['rock', 'paper', 'scissors'];

const RockPaperScissors: React.FC = () => {
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [result, setResult] = useState('Make your move!');
    const [playerMove, setPlayerMove] = useState<Move | null>(null);
    const [computerMove, setComputerMove] = useState<Move | null>(null);

    const getEmoji = (move: Move | null) => {
        if (!move) return '❔';
        const emojis: Record<Move, string> = { rock: '✊', paper: '✋', scissors: '✌️' };
        return emojis[move];
    }
    
    const playGame = (playerChoice: Move) => {
        const computerChoice = MOVES[Math.floor(Math.random() * MOVES.length)];
        setPlayerMove(playerChoice);
        setComputerMove(computerChoice);

        if (playerChoice === computerChoice) {
            setResult("It's a draw!");
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'scissors' && computerChoice === 'paper') ||
            (playerChoice === 'paper' && computerChoice === 'rock')
        ) {
            setResult('You win!');
            setPlayerScore(prev => prev + 1);
        } else {
            setResult('You lose!');
            setComputerScore(prev => prev + 1);
        }
    };
    
    const resetGame = () => {
        setPlayerScore(0);
        setComputerScore(0);
        setResult('Make your move!');
        setPlayerMove(null);
        setComputerMove(null);
    }

    return (
        <div className="text-center p-4">
            <div className="flex justify-around text-2xl font-bold mb-6">
                <p>Player: <span className="text-cyan-300">{playerScore}</span></p>
                <p>Computer: <span className="text-red-400">{computerScore}</span></p>
            </div>
            
            <div className="flex justify-center items-center gap-8 mb-6">
                <div className="text-center">
                    <p className="text-6xl">{getEmoji(playerMove)}</p>
                    <p className="text-xl mt-2">You</p>
                </div>
                <p className="text-4xl font-bold">VS</p>
                <div className="text-center">
                    <p className="text-6xl">{getEmoji(computerMove)}</p>
                    <p className="text-xl mt-2">CPU</p>
                </div>
            </div>

            <p className="text-3xl font-bold mb-8 h-10">{result}</p>
            
            <div className="flex justify-center gap-4 mb-8">
                {MOVES.map(move => (
                    <button
                        key={move}
                        onClick={() => playGame(move)}
                        className="p-4 bg-gray-600 rounded-full hover:bg-cyan-600 transition-colors"
                        aria-label={move}
                    >
                        <span className="text-4xl">{getEmoji(move)}</span>
                    </button>
                ))}
            </div>
            
            <button onClick={resetGame} className="px-6 py-2 bg-purple-600 rounded-md hover:bg-purple-700">
              Reset Scores
            </button>
        </div>
    );
};

export default RockPaperScissors;
