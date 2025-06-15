import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const LOCAL_KEY = "zensoul_journal_entries";

function getEntries() {
  return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
}
function saveEntries(entries) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(entries));
}

export default function JournalEntryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const entries = getEntries();
  // Match by unique id, not by index
  const entry = entries.find(entry => String(entry.id) === id);

  if (!entry) {
    return (
      <div className="p-8">
        <h2 className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-100">Entry Not Found</h2>
        <button onClick={() => navigate("/")} className="text-blue-500 underline">
          Back to Journal
        </button>
      </div>
    );
  }

  function handleDelete() {
    if (window.confirm("Delete this entry?")) {
      const updated = entries.filter(e => String(e.id) !== id);
      saveEntries(updated);
      navigate("/");
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded shadow">
      <div className="mb-2 text-gray-400 dark:text-gray-300">{entry.date}</div>
      <div className="text-lg whitespace-pre-line break-words mb-6 bg-pink-50 dark:bg-pink-900 p-6 rounded min-h-[140px] text-gray-800 dark:text-gray-100">
        {entry.text}
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          className="bg-red-200 hover:bg-red-300 px-4 py-2 rounded text-red-700"
        >
          Delete
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded text-blue-700"
        >
          Back
        </button>
      </div>
    </div>
  );
}