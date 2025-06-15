import React from "react";

const LOCAL_KEY = "zensoul_journal_entries";

function getEntries() {
  return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
}

export default function JournalStats() {
  const entries = getEntries();

  // Calculate stats
  const totalEntries = entries.length;
  const firstEntryDate = totalEntries > 0 ? entries[0].date : "—";
  const lastEntryDate = totalEntries > 0 ? entries[entries.length - 1].date : "—";
  const averageWords =
    totalEntries > 0
      ? Math.round(
          entries.reduce((sum, entry) => sum + entry.text.split(/\s+/).filter(Boolean).length, 0) / totalEntries
        )
      : 0;

  return (
    <div className="w-full max-w-xl mx-auto mt-12 p-8 bg-white dark:bg-gray-900 rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Journal Stats</h2>
      <div className="mb-4 text-lg text-gray-800 dark:text-gray-100">
        <span className="font-semibold">Total Entries:</span> {totalEntries}
      </div>
      <div className="mb-4 text-gray-800 dark:text-gray-100">
        <span className="font-semibold">First Entry:</span> {firstEntryDate}
      </div>
      <div className="mb-4 text-gray-800 dark:text-gray-100">
        <span className="font-semibold">Most Recent Entry:</span> {lastEntryDate}
      </div>
      <div className="mb-4 text-gray-800 dark:text-gray-100">
        <span className="font-semibold">Average Words per Entry:</span> {averageWords}
      </div>
    </div>
  );
}