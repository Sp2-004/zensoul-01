import { Link } from "react-router-dom";

export default function BottomNav() {
  return (
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
        {/* Heartbeat Icon for Guide */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-6 w-6 mb-1" stroke="currentColor">
          {/* Heart shape */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 13.5L8.5 17.5L12 14L15.5 17.5L19.5 13.5" />
          {/* Heart outline */}
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
    </nav>
  );
}