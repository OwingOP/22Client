
import React, { useState, useEffect, useMemo } from 'react';
import { Game } from './types';
import { GAMES } from './constants';
import GameCard from './components/GameCard';
import SettingsModal from './components/SettingsModal';
import { SettingsIcon } from './components/icons/SettingsIcon';
import GameView from './components/GameView';
import { useAudio } from './hooks/useAudio';

const BGM_URL = 'https://vgmsite.com/soundtracks/wii-shop-channel/vjzylykpgf/Wii%20Shop%20Channel.mp3';

const WavyText = ({ text }: { text: string }) => {
  const letters = text.split('').map((char, index) => (
    <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
  return <div className="wavy-text">{letters}</div>;
};

export default function App() {
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const { isPlaying, toggle, setVolume, setRate, volume, rate } = useAudio(BGM_URL);

  useEffect(() => {
    // Autoplay BGM on first interaction
    const handleFirstInteraction = () => {
      if (!isPlaying) {
        toggle();
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isPlaying, toggle]);

  const shuffledGames = useMemo(() => [...GAMES].sort(() => Math.random() - 0.5), []);

  const handleGameSelect = (game: Game) => {
    setCurrentGame(game);
  };

  const handleGoHome = () => {
    setCurrentGame(null);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen antialiased overflow-x-hidden">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.07) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,.07) 2px, transparent 2px)',
          backgroundSize: '40px 40px'
        }}
      ></div>
      <main className="relative z-10 p-4 sm:p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-press-start text-cyan-400 hover:text-white transition-colors cursor-pointer" onClick={handleGoHome}>
            owing.fun
          </h1>
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Open settings"
          >
            <SettingsIcon className="w-8 h-8 text-cyan-400" />
          </button>
        </header>

        {currentGame ? (
          <GameView game={currentGame} onGoHome={handleGoHome} />
        ) : (
          <div className="flex flex-col items-center">
            <div className="my-12 sm:my-20 text-center">
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-press-start text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                <WavyText text="owing.fun" />
              </h2>
              <p className="mt-6 text-lg sm:text-xl text-gray-300">A collection of games, puzzles, and toys.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 w-full max-w-7xl">
              {shuffledGames.map((game) => (
                <GameCard key={game.id} game={game} onSelect={handleGameSelect} />
              ))}
            </div>
          </div>
        )}
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setSettingsOpen(false)}
        bgmPlaying={isPlaying}
        toggleBgm={toggle}
        volume={volume}
        onVolumeChange={setVolume}
        speed={rate}
        onSpeedChange={setRate}
      />
    </div>
  );
}
