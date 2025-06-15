import React from "react";

const sounds = [
  {
    section: "Relaxing Sounds",
    tracks: [
      {
        title: "Calm Ocean Waves",
        description: "Gentle ocean waves for relaxation.",
        youtube: "https://www.youtube.com/watch?v=1ZYbU82GVz4"
      },
      {
        title: "Nature Sounds",
        description: "Rain, birds, and nature ambiance.",
        youtube: "https://www.youtube.com/watch?v=OdIJ2x3nxzQ"
      }
    ]
  },
  {
    section: "Relaxing Piano Music",
    tracks: [
      {
        title: "Piano Relaxation",
        description: "Soothing piano for peace and sleep.",
        youtube: "https://www.youtube.com/watch?v=4D9G9bD4zQk"
      }
    ]
  },
  {
    section: "Meditation Music",
    tracks: [
      {
        title: "Calm Meditation",
        description: "Ambient music for meditation.",
        youtube: "https://www.youtube.com/watch?v=2OEL4P1Rz04"
      }
    ]
  },
  {
    section: "Forest Sounds",
    tracks: [
      {
        title: "Nature Meditation",
        description: "Forest ambience for focus and mindfulness.",
        youtube: "https://www.youtube.com/watch?v=OdIJ2x3nxzQ"
      }
    ]
  }
];

// Helper to extract the YouTube video ID from any valid YouTube URL
function getYouTubeVideoId(url) {
  // Handles ?v=, /embed/, /shorts/, youtu.be/ etc.
  const regExp =
    /(?:youtube\.com\/.*(?:\?|&)v=|youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  if (match && match[1]) return match[1];
  // fallback: try to get v param
  try {
    const u = new URL(url);
    return u.searchParams.get("v");
  } catch {
    return "";
  }
}

export default function RelaxingSounds() {
  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold mb-2 text-center">Relaxing Sounds</h1>
      <p className="mb-8 text-center text-gray-600 dark:text-gray-300">
        Listen to these calming sounds to help you relax, focus, or sleep.
      </p>
      {sounds.map((group, idx) => (
        <section key={idx} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{group.section}</h2>
          <div className="grid gap-6">
            {group.tracks.map((track, tIdx) => {
              const videoId = getYouTubeVideoId(track.youtube);
              return (
                <div
                  key={tIdx}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col items-center"
                >
                  <div className="font-bold text-lg mb-1 text-center">{track.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-300 mb-4 text-center">{track.description}</div>
                  {videoId && (
                    <a
                      href={track.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-4 relative block"
                      aria-label={`Watch ${track.title} on YouTube`}
                    >
                      <div className="overflow-hidden rounded-lg shadow-lg w-72 h-40 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-transform transform hover:scale-105 relative">
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                          alt={`${track.title} YouTube thumbnail`}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-xs font-semibold bottom-3 right-3 flex items-center">
                          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M10 15l5.19-3L10 9v6zm12-3c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-6zm-2 6H4v-6h16v6z"></path>
                          </svg>
                          YouTube
                        </span>
                      </div>
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}