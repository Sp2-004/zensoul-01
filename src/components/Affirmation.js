import React, { useState } from "react";

const AFFIRMATIONS = [
  "You are enough, just as you are.",
  "Breathe in calm, breathe out tension.",
  "You are strong and resilient.",
  "It's okay to take a break.",
  "Your feelings are valid.",
  "You are worthy of love and care.",
  "Storms don't last forever.",
  "Gentleness is strength.",
  "You have overcome so much already.",
];

export default function Affirmation() {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * AFFIRMATIONS.length)
  );
  function refresh() {
    let next = Math.floor(Math.random() * AFFIRMATIONS.length);
    while(next === index) next = Math.floor(Math.random() * AFFIRMATIONS.length);
    setIndex(next);
  }
  return (
    <div className="mb-6 flex flex-col items-center z-10">
      <div className="italic text-lg text-purple-700 font-medium text-center drop-shadow">
        “{AFFIRMATIONS[index]}”
      </div>
      <button
        onClick={refresh}
        className="mt-2 text-xs text-blue-500 underline focus:outline-none"
      >
        Refresh affirmation
      </button>
    </div>
  );
}