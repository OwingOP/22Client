
import React from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bgmPlaying: boolean;
  toggleBgm: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  bgmPlaying,
  toggleBgm,
  volume,
  onVolumeChange,
  speed,
  onSpeedChange,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 border border-cyan-400 rounded-lg shadow-xl shadow-cyan-400/20 p-8 w-full max-w-md m-4 relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close settings"
        >
          <CloseIcon className="w-8 h-8" />
        </button>

        <h2 className="text-3xl font-press-start text-center mb-8 text-cyan-300">Settings</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-lg text-gray-200">BGM</label>
            <button
              onClick={toggleBgm}
              className={`px-6 py-2 rounded-md font-bold transition-colors ${
                bgmPlaying
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {bgmPlaying ? 'PAUSE' : 'PLAY'}
            </button>
          </div>

          <div>
            <label htmlFor="volume" className="block text-lg text-gray-200 mb-2">
              BGM Volume: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              id="volume"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          <div>
            <label htmlFor="speed" className="block text-lg text-gray-200 mb-2">
              BGM Speed: {speed.toFixed(2)}x
            </label>
            <input
              type="range"
              id="speed"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
