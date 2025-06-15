import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import JournalEntryDetails from "./pages/JournalEntryDetails";
import JournalEntryEdit from "./pages/JournalEntryEdit";
import Settings from "./pages/Settings";
import AnxietyGuide from "./pages/AnxietyGuide";
import RelaxingSounds from "./pages/RelaxingSounds";
import EmergencyContacts from "./pages/EmergencyContacts";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg">Page not found.</p>
      </div>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ||
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const darkModeToggle = (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setDark((d) => !d)}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {dark ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx={12} cy={12} r={5} stroke="currentColor" strokeWidth={2} />
          <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )}
    </button>
  );

  return (
    <Router>
      <div className="min-h-screen pb-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 relative">
        {/* Top bar with Settings and Dark Mode */}
        <div className="flex justify-end gap-2 px-4 pt-4">
          <Link
            to="/settings"
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Settings"
          >
            {/* Cog Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.25 2.25a.75.75 0 011.5 0v1.006a7.497 7.497 0 013.334.965l.711-.711a.75.75 0 111.061 1.06l-.711.712A7.5 7.5 0 0120.743 9.75h1.007a.75.75 0 110 1.5h-1.007a7.5 7.5 0 01-1.092 3.334l.712.711a.75.75 0 11-1.06 1.061l-.712-.711A7.497 7.497 0 0112.75 20.743v1.007a.75.75 0 11-1.5 0v-1.007a7.497 7.497 0 01-3.334-.965l-.711.711a.75.75 0 11-1.061-1.06l.711-.712A7.5 7.5 0 013.257 14.25H2.25a.75.75 0 110-1.5h1.007A7.5 7.5 0 014.35 9.416l-.712-.711a.75.75 0 111.06-1.061l.712.711A7.497 7.497 0 0111.25 3.257V2.25z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </Link>
          {darkModeToggle}
        </div>
        <main className="flex justify-center items-start mt-8 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:id" element={<JournalEntryDetails />} />
            <Route path="/journal/edit/:id" element={<JournalEntryEdit />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/anxiety-guide" element={<AnxietyGuide showDarkModeToggle={darkModeToggle} />} />
            <Route path="/relaxing-music" element={<RelaxingSounds />} />
            <Route path="/emergency" element={<EmergencyContacts />} />
            <Route path="/playlist" element={<Navigate to="/relaxing-music" replace />} />
            <Route path="/contacts" element={<Navigate to="/emergency" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {/* Bottom navigation bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-around py-2">
          <Link to="/" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
            {/* Home Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3M7 21h10" />
            </svg>
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/journal" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400">
            {/* Book Icon for Journal */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 00-2 2v10a2 2 0 002 2m0-14a2 2 0 012 2v10a2 2 0 01-2 2m0-14h4m-4 0H8" />
            </svg>
            <span className="text-xs">Journal</span>
          </Link>
          <Link to="/anxiety-guide" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400">
            {/* Heart/Heartbeat Icon for Guide */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-6 w-6 mb-1" stroke="currentColor">
              <polyline points="4.5,13.5 8.5,17.5 12,14 15.5,17.5 19.5,13.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21C12 21 4 13.5 4 8.5A4.5 4.5 0 0112 5.5A4.5 4.5 0 0120 8.5C20 13.5 12 21 12 21Z" />
            </svg>
            <span className="text-xs">Guide</span>
          </Link>
          <Link to="/relaxing-music" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400">
            {/* Music Note Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            <span className="text-xs">Music</span>
          </Link>
          <Link to="/emergency" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">
            {/* Phone Call Icon for Emergency */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2a2 2 0 012 2v3a2 2 0 01-2 2h-.293l-.853 3.414a1 1 0 001.707.707L8.707 13.707A2 2 0 0111 15.414l.293.293a2 2 0 002.828 0l.293-.293a2 2 0 012.707-2.707l1.293 1.293a1 1 0 00.707-1.707L19.586 15.586A2 2 0 0121 13.586V12a2 2 0 00-2-2h-3a2 2 0 01-2-2V5z" />
            </svg>
            <span className="text-xs">Emergency</span>
          </Link>
          <Link to="/settings" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400">
            {/* Settings Cog Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.25 2.25a.75.75 0 011.5 0v1.006a7.497 7.497 0 013.334.965l.711-.711a.75.75 0 111.061 1.06l-.711.712A7.5 7.5 0 0120.743 9.75h1.007a.75.75 0 110 1.5h-1.007a7.5 7.5 0 01-1.092 3.334l.712.711a.75.75 0 11-1.06 1.061l-.712-.711A7.497 7.497 0 0112.75 20.743v1.007a.75.75 0 11-1.5 0v-1.007a7.497 7.497 0 01-3.334-.965l-.711.711a.75.75 0 11-1.061-1.06l.711-.712A7.5 7.5 0 013.257 14.25H2.25a.75.75 0 110-1.5h1.007A7.5 7.5 0 014.35 9.416l-.712-.711a.75.75 0 111.06-1.061l.712.711A7.497 7.497 0 0111.25 3.257V2.25z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="text-xs">Settings</span>
          </Link>
        </nav>
      </div>
    </Router>
  );
}