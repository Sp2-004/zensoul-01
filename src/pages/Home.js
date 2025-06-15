import React from "react";
import { useNavigate } from "react-router-dom";

const affirmations = [
  "I am strong and capable.",
  "I am worthy of love and respect.",
  "Each breath helps me feel calmer.",
  "This feeling is temporary. I can get through it.",
  "I trust myself to handle whatever comes.",
  "I am doing my best, and that is enough."
];

export default function Home() {
  const [affirmation, setAffirmation] = React.useState(affirmations[0]);
  const navigate = useNavigate();

  const nextAffirmation = () => {
    let idx;
    do {
      idx = Math.floor(Math.random() * affirmations.length);
    } while (affirmations[idx] === affirmation && affirmations.length > 1);
    setAffirmation(affirmations[idx]);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 overflow-hidden">
      <div className="w-full max-w-4xl px-4 flex flex-col items-center justify-center">
        {/* App Name */}
        <div className="mb-10 text-center">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-violet-600 dark:text-violet-300 select-none drop-shadow-lg">
            ZenSoul
          </h1>
        </div>
        {/* Affirmation box */}
        <div
          className="rounded-xl bg-white dark:bg-gray-800 shadow-lg p-8 mb-4 text-center"
          aria-live="polite"
        >
          <div className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">{affirmation}</div>
          {/* Arrow button for next affirmation */}
          <button
            onClick={nextAffirmation}
            className="mt-6 flex items-center justify-center mx-auto bg-gray-200 dark:bg-gray-700 rounded-full p-2 w-10 h-10 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Show next affirmation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 2x2 grid of buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 w-full">
          {/* Top row */}
          <button
            onClick={() => navigate("/journal")}
            className="w-full flex flex-col items-center px-5 py-6 rounded-xl bg-violet-100 dark:bg-violet-800 shadow hover:bg-violet-200 dark:hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            aria-label="Journal: Record your thoughts and feelings"
          >
            <span className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100">Journal</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Record your thoughts and feelings</span>
          </button>
          <button
            onClick={() => navigate("/anxiety-guide")}
            className="w-full flex flex-col items-center px-5 py-6 rounded-xl bg-rose-100 dark:bg-rose-800 shadow hover:bg-rose-200 dark:hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
            aria-label="Anxiety Guide: Breathing exercises and grounding techniques"
          >
            <span className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100">Anxiety Guide</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Breathing exercises and grounding techniques</span>
          </button>
          {/* Bottom row */}
          <button
            onClick={() => navigate("/relaxing-music")}
            className="w-full flex flex-col items-center px-5 py-6 rounded-xl bg-cyan-100 dark:bg-cyan-800 shadow hover:bg-cyan-200 dark:hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            aria-label="Relaxing Music: Calming sounds to help you relax"
          >
            <span className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100">Relaxing Music</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Calming sounds to help you relax</span>
          </button>
          <button
            onClick={() => navigate("/emergency")}
            className="w-full flex flex-col items-center px-5 py-6 rounded-xl bg-red-100 dark:bg-red-800 shadow hover:bg-red-200 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            aria-label="Emergency: Quick access to support resources"
          >
            <span className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100">Emergency</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Quick access to support resources</span>
          </button>
        </div>
      </div>
    </div>
  );
}