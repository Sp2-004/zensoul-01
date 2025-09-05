'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ChatBot from './ChatBot'

const affirmations = [
  "I am strong and capable.",
  "I am worthy of love and respect.",
  "Each breath helps me feel calmer.",
  "This feeling is temporary. I can get through it.",
  "I trust myself to handle whatever comes.",
  "I am doing my best, and that is enough."
]

export default function HomePage() {
  const [affirmation, setAffirmation] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Generate AI-powered affirmation
    const generateAffirmation = async () => {
      try {
        const response = await fetch('/api/ai/affirmation')
        const data = await response.json()
        setAffirmation(data.affirmation)
      } catch (error) {
        // Fallback to static affirmations
        setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)])
      }
    }
    generateAffirmation()
  }, [])

  const nextAffirmation = async () => {
    try {
      const response = await fetch('/api/ai/affirmation')
      const data = await response.json()
      setAffirmation(data.affirmation)
    } catch (error) {
      let idx
      do {
        idx = Math.floor(Math.random() * affirmations.length)
      } while (affirmations[idx] === affirmation && affirmations.length > 1)
      setAffirmation(affirmations[idx])
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 overflow-hidden relative">
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
          <div className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
            {affirmation || "Loading your personalized affirmation..."}
          </div>
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
          <button
            onClick={() => router.push('/journal')}
            className="w-full flex flex-col items-center px-5 py-6 rounded-xl bg-violet-100 dark:bg-violet-800 shadow hover:bg-violet-200 dark:hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          >
            <span className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100">Journal</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Record your thoughts with AI insights</span>
          </button>

          <button
            onClick={() => router.push('/anxiety-guide')}
            className="w-full flex flex-col items-center px-5 py-6 rounded-xl bg-rose-100 dark:bg-rose-800 shadow hover:bg-rose-200 dark:hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
          >
            <span className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100">Anxiety Guide</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">AI-guided breathing and grounding</span>
          </button>

          <button
            onClick={() => router.push('/relaxing-sounds')}
            className="w-full flex flex-col items-center px-5 py-6 rounded-xl bg-cyan-100 dark:bg-cyan-800 shadow hover:bg-cyan-200 dark:hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          >
            <span className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100">Relaxing Sounds</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Curated calming audio experiences</span>
          </button>

          <button
            onClick={() => router.push('/emergency')}
            className="w-full flex flex-col items-center px-5 py-6 rounded-xl bg-red-100 dark:bg-red-800 shadow hover:bg-red-200 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          >
            <span className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100">Emergency</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Quick access to support resources</span>
          </button>
        </div>
      </div>

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  )
}