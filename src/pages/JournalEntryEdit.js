import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const LOCAL_KEY = "zensoul_journal_entries";

function getEntries() {
  return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
}
function saveEntries(entries) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(entries));
}

export default function JournalEntryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const entries = getEntries();
  const entryIndex = entries.findIndex(entry => String(entry.id) === id);
  const entry = entries[entryIndex];

  const [text, setText] = useState(entry ? entry.text : "");

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

  function handleSave(e) {
    e.preventDefault();
    if (!text.trim()) {
      alert("Entry cannot be empty.");
      return;
    }
    const updatedEntries = [...entries];
    updatedEntries[entryIndex] = { ...entry, text };
    saveEntries(updatedEntries);
    navigate(`/journal/${id}`); // Or back to journal list if preferred
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded shadow">
      <h2 className="font-bold text-xl mb-4 text-gray-800 dark:text-gray-100">Edit Entry</h2>
      <form onSubmit={handleSave}>
        <textarea
          className="w-full rounded border p-2 mb-4 min-h-[140px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={text}
          onChange={e => setText(e.target.value)}
          rows={6}
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-200 hover:bg-green-300 px-4 py-2 rounded text-green-900"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate(`/journal/${id}`)}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-gray-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}