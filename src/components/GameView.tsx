
import React from 'react';
import { Game } from '../types';
import { HomeIcon } from './icons/HomeIcon';

interface GameViewProps {
  game: Game;
  onGoHome: () => void;
}

const GameView: React.FC<GameViewProps> = ({ game, onGoHome }) => {
  const GameComponent = game.component;
  return (
    <div className="flex flex-col items-center animate-fade-in">
      <div className="w-full max-w-4xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-press-start text-cyan-300">{game.title}</h2>
          <button
            onClick={onGoHome}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Go to home screen"
          >
            <HomeIcon className="w-6 h-6" />
            <span className="hidden sm:inline">Home</span>
          </button>
        </div>
        <div className="game-container">
          <GameComponent />
        </div>
      </div>
    </div>
  );
};

export default GameView;
