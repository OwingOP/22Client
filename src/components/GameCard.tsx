
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onSelect }) => {
  return (
    <div
      className="bg-gray-800 rounded-lg p-4 cursor-pointer aspect-square flex flex-col justify-center items-center text-center border-2 border-gray-700 hover:border-cyan-400 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 ease-in-out"
      onClick={() => onSelect(game)}
    >
      <h3 className="text-lg md:text-xl font-bold font-press-start text-cyan-300">{game.title}</h3>
      <p className="text-gray-400 mt-2 text-sm md:text-base">{game.description}</p>
    </div>
  );
};

export default GameCard;
