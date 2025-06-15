import React, { useState, useEffect, useRef } from "react";

// Breathing step settings with enhanced animation colors
const breathingSteps = [
  { label: "Breathe In", seconds: 4, instruction: "Breathe in for 4 seconds", scale: 1.3, color: "#a7f3d0" },
  { label: "Hold", seconds: 7, instruction: "Hold your breath for 7 seconds", scale: 1.5, color: "#fde68a" },
  { label: "Exhale", seconds: 8, instruction: "Exhale for 8 seconds", scale: 1.0, color: "#fca5a5" },
];

const exercises = [
  {
    key: "breathing",
    title: "4-7-8 Breathing",
    description: "A technique to help calm your nervous system.",
    steps: breathingSteps,
    note: "This pattern helps reduce anxiety quickly.",
  },
  {
    key: "grounding",
    title: "5-4-3-2-1 Grounding Exercise",
    description: "A simple way to ground yourself in the present moment.",
    steps: [
      { label: "5 things you can see", instruction: "Look around you and identify five things you can see. Focus on details and colors.", prompt: "I notice..." },
      { label: "4 things you can feel", instruction: "Notice four things you can feel (e.g. chair, clothes, breeze).", prompt: "I feel..." },
      { label: "3 things you can hear", instruction: "Listen for three distinct sounds.", prompt: "I hear..." },
      { label: "2 things you can smell", instruction: "Notice two different smells (or recall a favorite scent).", prompt: "I smell..." },
      { label: "1 thing you can taste", instruction: "Focus on one thing you can taste (gum, air, or memory of a taste).", prompt: "I taste..." },
    ]
  }
];

// Floating SVG shapes for background
function FloatingShapes() {
  return (
    <svg
      className="pointer-events-none fixed left-0 top-0 w-full h-full z-0"
      aria-hidden="true"
      style={{ mixBlendMode: "soft-light" }}
    >
      <ellipse
        cx="15%" cy="20%" rx="180" ry="70"
        fill="#a7f3d0" opacity="0.22">
        <animate attributeName="cy" values="20%;40%;20%" dur="16s" repeatCount="indefinite" />
      </ellipse>
      <ellipse
        cx="80%" cy="25%" rx="140" ry="60"
        fill="#fbcfe8" opacity="0.13">
        <animate attributeName="cy" values="25%;38%;25%" dur="22s" repeatCount="indefinite" />
      </ellipse>
      <ellipse
        cx="50%" cy="70%" rx="220" ry="90"
        fill="#fde68a" opacity="0.14">
        <animate attributeName="cy" values="70%;55%;70%" dur="18s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}

// Vibrate, if supported
function vibrate(ms = 200) {
  if (navigator.vibrate) {
    navigator.vibrate(ms);
  }
}

// Breathing step animation circle with Start button
function BreathingStepCircle({ timer, step, isStarted, onStart }) {
  const isHolding = step.label === "Hold";
  return (
    <div className="flex flex-col items-center mb-4 select-none">
      <div className="relative flex items-center justify-center">
        <span
          className="absolute inline-block w-[210px] h-[210px] rounded-full pointer-events-none"
          style={{
            boxShadow: `0 0 0 0 ${step.color}44, 0 0 60px 30px ${step.color}55, 0 0 120px 60px ${step.color}22`,
            animation: "glowPulse 3s infinite",
            zIndex: 0,
          }}
          aria-hidden="true"
        />
        <div
          className="flex items-center justify-center rounded-full shadow-lg transition-all duration-700"
          style={{
            width: 170,
            height: 170,
            background: step.color,
            border: `6px solid ${step.color}`,
            transform: `scale(${step.scale})`,
            opacity: 0.97,
            zIndex: 1,
            boxShadow: `0 2px 32px 0 ${step.color}33`,
            transition: isHolding
              ? "none"
              : "transform 0.9s cubic-bezier(0.6,0,0.4,1), box-shadow 0.7s",
            cursor: !isStarted ? "pointer" : "default"
          }}
          onClick={!isStarted ? onStart : undefined}
        >
          {!isStarted ? (
            <button
              className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold text-lg shadow hover:bg-blue-700 focus:outline focus:outline-2 focus:outline-indigo-500 transition"
              onClick={onStart}
              tabIndex={0}
              aria-label="Start Breathing Exercise"
            >
              Start
            </button>
          ) : (
            <span
              key={timer}
              className="text-6xl font-extrabold text-gray-900 dark:text-gray-50 animate-floatNumber"
              style={{
                transition: "color 0.4s",
                filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.14))",
                zIndex: 2,
              }}
              aria-live="polite"
              aria-atomic="true"
            >
              {timer}
            </span>
          )}
        </div>
      </div>
      <div
        className="mt-5 text-xl font-semibold text-center"
        style={{ color: step.color, textShadow: `0 1px 16px ${step.color}66` }}
        aria-label={`Current step: ${step.label}`}
      >
        {isStarted ? step.label : "4-7-8 Breathing"}
      </div>
    </div>
  );
}

export default function AnxietyGuide({ showDarkModeToggle }) {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [breathStep, setBreathStep] = useState(0);
  const [timer, setTimer] = useState(breathingSteps[0].seconds);
  const [isBreathingStarted, setIsBreathingStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [groundStep, setGroundStep] = useState(0);
  const [groundingResponses, setGroundingResponses] = useState({});
  const intervalRef = useRef();

  const currentExercise = exercises[exerciseIndex];
  const isBreathing = currentExercise.key === "breathing";
  const isGrounding = currentExercise.key === "grounding";

  // Animated shifting gradient logic
  const [gradientAngle, setGradientAngle] = useState(135);
  useEffect(() => {
    const id = setInterval(() => setGradientAngle(a => (a + 0.2) % 360), 60);
    return () => clearInterval(id);
  }, []);

  // Vibrate at every breathing step change
  useEffect(() => {
    if (isBreathing && isBreathingStarted && !isPaused) {
      vibrate(150);
    }
  }, [breathStep, isBreathing, isBreathingStarted, isPaused]);

  // Set timer whenever breathStep or start state changes
  useEffect(() => {
    if (isBreathingStarted) {
      setTimer(breathingSteps[breathStep].seconds);
    }
  }, [breathStep, isBreathingStarted]);

  // Breathing animation and timer logic (single effect, fix for fast timer)
  useEffect(() => {
    if (!isBreathing || !isBreathingStarted || isPaused) return;
    intervalRef.current = setInterval(() => {
      setTimer((t) => {
        if (t > 1) return t - 1;
        clearInterval(intervalRef.current);
        setTimeout(() => {
          setBreathStep((s) => (s + 1) % breathingSteps.length);
        }, 400);
        return 0;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [breathStep, isBreathing, isBreathingStarted, isPaused]);

  // Reset state when switching exercises
  useEffect(() => {
    if (isBreathing) {
      setBreathStep(0);
      setTimer(breathingSteps[0].seconds);
      setIsBreathingStarted(false);
      setIsPaused(false);
      clearInterval(intervalRef.current);
    }
    if (isGrounding) {
      setGroundStep(0);
    }
  }, [exerciseIndex, isBreathing, isGrounding]);

  // Animated background
  const bgGradient = `linear-gradient(${gradientAngle}deg, #dbeafe 0%, #fbcfe8 100%)`;

  // Pause/resume logic (no second effect)
  const handlePause = () => {
    setIsPaused((prev) => !prev);
    clearInterval(intervalRef.current);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <FloatingShapes />
      <div
        aria-hidden="true"
        className="fixed inset-0 w-full h-full z-0 transition-colors"
        style={{
          background: bgGradient,
          transition: "background 1.5s cubic-bezier(0.6,0,0.4,1)",
        }}
      />
      {/* Show dark mode/settings at the top right, if provided */}
      {showDarkModeToggle && (
        <div className="fixed top-5 right-5 z-30">
          {showDarkModeToggle}
        </div>
      )}
      <main
        className="relative max-w-lg mx-auto p-6 rounded shadow mt-8 z-10 bg-white/80 dark:bg-slate-900/80"
        style={{
          backdropFilter: "blur(4px)",
          boxShadow: "0 8px 32px 0 rgba(120, 120, 180, 0.08)",
          transition: "background 1.2s"
        }}
        aria-label="Anxiety Relief Exercises"
        tabIndex={-1}
      >
        <h1 className="text-3xl font-extrabold mb-4 tracking-tight text-center text-gray-900 dark:text-gray-100">
          Anxiety Relief Guide
        </h1>
        {/* Tab navigation */}
        <nav className="flex justify-center mb-7 space-x-2" aria-label="Exercise Tabs">
          {exercises.map((ex, idx) => (
            <button
              key={ex.key}
              className={`px-4 py-2 rounded-t-lg font-semibold transition 
                ${exerciseIndex === idx 
                  ? "bg-blue-100 text-blue-900 dark:bg-gray-800 dark:text-blue-200 border-b-2 border-blue-500"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 border-b-2 border-transparent hover:bg-blue-50 dark:hover:bg-gray-800"} 
                focus:outline focus:outline-2 focus:outline-indigo-500`}
              onClick={() => setExerciseIndex(idx)}
              aria-current={exerciseIndex === idx ? "page" : undefined}
            >
              {ex.title}
            </button>
          ))}
        </nav>
        <h2 className="text-2xl font-semibold mb-2 text-center text-gray-900 dark:text-gray-100" id="exercise-title">
          {currentExercise.title}
        </h2>
        <p
          className="mb-8 mt-2 text-center text-base text-gray-700 dark:text-gray-300 relative z-10"
          id="exercise-desc"
          style={{ minHeight: "2.5em" }}
        >
          {currentExercise.description}
        </p>
        {/* Only one exercise shown at a time */}
        {isBreathing && (
          <section aria-labelledby="breathing-exercise" className="mb-6">
            <BreathingStepCircle
              timer={timer}
              step={breathingSteps[breathStep]}
              isStarted={isBreathingStarted}
              onStart={() => setIsBreathingStarted(true)}
            />
            <div className="text-center mb-2 text-base mt-4">
              {isBreathingStarted ? breathingSteps[breathStep].instruction : "Press Start to begin the exercise."}
            </div>
            {/* Controls below the instructions */}
            {isBreathingStarted && (
              <div className="flex flex-col items-center">
                <div className="flex justify-center gap-6 mt-2">
                  <button
                    className="px-4 py-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold shadow transition focus:outline focus:outline-2 focus:outline-indigo-500"
                    onClick={() => {
                      clearInterval(intervalRef.current);
                      setBreathStep((s) => Math.max(s - 1, 0));
                    }}
                    disabled={breathStep === 0}
                    aria-label="Previous breathing step"
                  >
                    Previous
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-600 font-semibold shadow transition focus:outline focus:outline-2 focus:outline-yellow-500"
                    onClick={handlePause}
                    aria-label={isPaused ? "Resume" : "Pause"}
                  >
                    {isPaused ? "Resume" : "Pause"}
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold shadow transition focus:outline focus:outline-2 focus:outline-indigo-500"
                    onClick={() => {
                      clearInterval(intervalRef.current);
                      setBreathStep((s) => Math.min(s + 1, breathingSteps.length - 1));
                    }}
                    disabled={breathStep === breathingSteps.length - 1}
                    aria-label="Next breathing step"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            <p className="mt-5 text-sm text-gray-500 text-center">{currentExercise.note}</p>
          </section>
        )}
        {isGrounding && (
          <section aria-labelledby="grounding-exercise" className="mb-4">
            <label
              htmlFor={`grounding-input-${groundStep}`}
              className="font-medium mb-2 text-lg block text-gray-900 dark:text-gray-100"
              id="grounding-step-label"
            >
              {currentExercise.steps[groundStep].label}
            </label>
            <div className="mb-2 text-base text-gray-800 dark:text-gray-200" id="grounding-instruction">{currentExercise.steps[groundStep].instruction}</div>
            <input
              id={`grounding-input-${groundStep}`}
              className="w-full p-3 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 transition bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              placeholder={currentExercise.steps[groundStep].prompt}
              value={groundingResponses[groundStep] || ""}
              onChange={e => setGroundingResponses({
                ...groundingResponses,
                [groundStep]: e.target.value,
              })}
              aria-label={currentExercise.steps[groundStep].prompt}
              aria-describedby="grounding-instruction"
            />
            {(groundingResponses[groundStep] && groundingResponses[groundStep].trim() !== "") && (
              <span className="inline-block ml-2 text-green-600 animate-bounce" aria-label="Step complete" role="status">✓</span>
            )}
            <div className="flex justify-between mt-3">
              <button
                className="px-4 py-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold shadow transition focus:outline focus:outline-2 focus:outline-indigo-500"
                onClick={() => setGroundStep((s) => Math.max(s - 1, 0))}
                disabled={groundStep === 0}
                aria-label="Previous grounding step"
              >
                Previous
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold shadow transition focus:outline focus:outline-2 focus:outline-indigo-500"
                onClick={() => setGroundStep((s) => Math.min(s + 1, currentExercise.steps.length - 1))}
                disabled={groundStep === currentExercise.steps.length - 1}
                aria-label="Next grounding step"
              >
                Next
              </button>
            </div>
            <div className="mt-6 text-gray-500 text-sm">
              {groundStep === currentExercise.steps.length - 1 && (
                <div>
                  <div className="font-semibold mb-1">Your Responses:</div>
                  <ul className="list-disc pl-5">
                    {currentExercise.steps.map((step, idx) => (
                      <li key={idx}>
                        <span className="font-medium">{step.label}:</span> {groundingResponses[idx] || <em>(no response)</em>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}