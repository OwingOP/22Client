
import React, { useState, useEffect, useRef } from 'react';

type GameState = 'waiting' | 'ready' | 'clicked';

const ReactionTime: React.FC = () => {
    const [state, setState] = useState<GameState>('waiting');
    const [reactionTime, setReactionTime] = useState<number | null>(null);
    const timerRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    const startTest = () => {
        setState('waiting');
        setReactionTime(null);
        const randomDelay = Math.random() * 3000 + 1000;
        timerRef.current = window.setTimeout(() => {
            startTimeRef.current = Date.now();
            setState('ready');
        }, randomDelay);
    };

    useEffect(() => {
        startTest();
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleClick = () => {
        if (state === 'waiting') {
            if (timerRef.current) clearTimeout(timerRef.current);
            setReactionTime(-1); // Too soon
            setState('clicked');
        } else if (state === 'ready') {
            const endTime = Date.now();
            setReactionTime(endTime - startTimeRef.current);
            setState('clicked');
        } else if (state === 'clicked') {
            startTest();
        }
    };

    const getBackgroundColor = () => {
        if (state === 'waiting') return 'bg-blue-600';
        if (state === 'ready') return 'bg-green-500';
        if (state === 'clicked' && reactionTime === -1) return 'bg-red-600';
        if (state === 'clicked') return 'bg-purple-600';
        return 'bg-blue-600';
    };

    const getContent = () => {
        if (state === 'waiting') {
            return { title: "Wait for Green", subtitle: "Click anywhere to begin" };
        }
        if (state === 'ready') {
            return { title: "Click!", subtitle: "" };
        }
        if (state === 'clicked') {
            if (reactionTime === -1) {
                return { title: "Too Soon!", subtitle: "Click to try again." };
            }
            return { title: `${reactionTime} ms`, subtitle: "Click to try again." };
        }
        return { title: "", subtitle: "" };
    };
    
    const { title, subtitle } = getContent();

    return (
        <div
            className={`w-full h-96 flex flex-col justify-center items-center text-white rounded-lg cursor-pointer transition-colors duration-200 ${getBackgroundColor()}`}
            onClick={handleClick}
        >
            <h2 className="text-6xl font-bold">{title}</h2>
            {subtitle && <p className="text-2xl mt-4">{subtitle}</p>}
        </div>
    );
};

export default ReactionTime;
