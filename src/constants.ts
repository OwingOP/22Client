
import { Game } from './types';

// Import all game components
import QuickMath from './games/QuickMath';
import NumberGuess from './games/NumberGuess';
import SequenceMaster from './games/SequenceMaster';
import EvenOrOdd from './games/EvenOrOdd';
import CapitalCityQuiz from './games/CapitalCityQuiz';
import GeneralKnowledgeTrivia from './games/GeneralKnowledgeTrivia';
import FlagFrenzy from './games/FlagFrenzy';
import TicTacToe from './games/TicTacToe';
import MemoryMatch from './games/MemoryMatch';
import WordScramble from './games/WordScramble';
import LightsOut from './games/LightsOut';
import SudokuSnippet from './games/SudokuSnippet';
import ClickSpeedTest from './games/ClickSpeedTest';
import ReactionTime from './games/ReactionTime';
import Snake from './games/Snake';
import WhackAMole from './games/WhackAMole';
import AimTrainer from './games/AimTrainer';
import TypingTest from './games/TypingTest';
import RockPaperScissors from './games/RockPaperScissors';
import ColorFlood from './games/ColorFlood';
import Game2048 from './games/Game2048';
import Hangman from './games/Hangman';

export const GAMES: Game[] = [
  // Maths
  { id: 'quick-math', title: 'Quick Math', description: 'Solve problems fast!', component: QuickMath },
  { id: 'number-guess', title: 'Number Guess', description: 'Guess the hidden number.', component: NumberGuess },
  { id: 'sequence-master', title: 'Sequence Master', description: 'What comes next?', component: SequenceMaster },
  { id: 'even-or-odd', title: 'Even Or Odd', description: 'Is the number even or odd?', component: EvenOrOdd },
  
  // Quiz
  { id: 'capital-city-quiz', title: 'Capital Quiz', description: 'Match countries to capitals.', component: CapitalCityQuiz },
  { id: 'general-knowledge-trivia', title: 'Trivia Time', description: 'Test your knowledge.', component: GeneralKnowledgeTrivia },
  { id: 'flag-frenzy', title: 'Flag Frenzy', description: 'Guess the country by its flag.', component: FlagFrenzy },

  // Puzzle
  { id: 'tic-tac-toe', title: 'Tic-Tac-Toe', description: 'Can you beat the AI?', component: TicTacToe },
  { id: 'memory-match', title: 'Memory Match', description: 'Find all the pairs.', component: MemoryMatch },
  { id: 'word-scramble', title: 'Word Scramble', description: 'Unscramble the letters.', component: WordScramble },
  { id: 'lights-out', title: 'Lights Out', description: 'Turn off all the lights.', component: LightsOut },
  { id: 'sudoku-snippet', title: 'Sudoku Snippet', description: 'A mini 4x4 Sudoku.', component: SudokuSnippet },

  // Gaming (Reaction/Skill)
  { id: 'click-speed-test', title: 'Click Speed Test', description: 'How fast can you click?', component: ClickSpeedTest },
  { id: 'reaction-time', title: 'Reaction Time', description: 'Click when it turns green!', component: ReactionTime },
  { id: 'snake', title: 'Snake', description: 'Classic arcade snake.', component: Snake },
  { id: 'whack-a-mole', title: 'Whack-A-Mole', description: 'Smack the pesky moles.', component: WhackAMole },
  { id: 'aim-trainer', title: 'Aim Trainer', description: 'Improve your precision.', component: AimTrainer },
  { id: 'typing-test', title: 'Typing Test', description: 'Check your WPM.', component: TypingTest },
  { id: 'rock-paper-scissors', title: 'Rock Paper Scissors', description: 'Play against the computer.', component: RockPaperScissors },
  { id: 'color-flood', title: 'Color Flood', description: 'Fill the board with one color.', component: ColorFlood },
  { id: '2048', title: '2048', description: 'Slide tiles to get to 2048.', component: Game2048 },
  { id: 'hangman', title: 'Hangman', description: 'Guess the word, save the man.', component: Hangman },
];
