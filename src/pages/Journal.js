import React, { useState, useEffect, useRef } from "react";
import CalmCard from "../components/CalmCard";
import PastelButton from "../components/PastelButton";
import Affirmation from "../components/Affirmation";
import { useNavigate } from "react-router-dom";

const LOCAL_KEY = "zensoul_journal_entries";
const PASSWORD_KEY = "zensoul_journal_password";

function getEntries() {
  return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
}
function saveEntries(entries) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(entries));
}

function getPassword() {
  return localStorage.getItem(PASSWORD_KEY);
}
function setPassword(pass) {
  localStorage.setItem(PASSWORD_KEY, pass);
}

function BackgroundDecor() {
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
        alt=""
        className="fixed inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none z-0"
      />
      <div className="fixed inset-0 bg-gradient-to-b from-pink-100/20 via-white/10 to-blue-100/20 pointer-events-none z-0" />
    </>
  );
}

export default function Journal() {
  const [entries, setEntries] = useState(getEntries());
  const [input, setInput] = useState("");
  const [password, setPasswordState] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [locked, setLocked] = useState(!!getPassword());
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const entriesContainerRef = useRef(null);
  const navigate = useNavigate();

  function handleSetPassword() {
    if (password.length < 3) {
      alert("Password must be at least 3 characters.");
      return;
    }
    setPassword(password);
    setLocked(false);
    setPasswordState("");
  }
  function handleUnlock() {
    if (enteredPassword === getPassword()) {
      setLocked(false);
      setEnteredPassword("");
    } else {
      alert("Incorrect password.");
    }
  }
  function addEntry(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const newEntry = {
      id: Date.now() + Math.random(),
      text: input,
      date: new Date().toLocaleString(),
    };
    const newEntries = [...entries, newEntry];
    setEntries(newEntries);
    saveEntries(newEntries);
    setInput("");
    setTimeout(() => {
      if (entriesContainerRef.current) {
        entriesContainerRef.current.scrollTop =
          entriesContainerRef.current.scrollHeight;
      }
    }, 100);
    setSelectedId(newEntry.id);
  }
  function clearEntries() {
    if (window.confirm("Delete all entries?")) {
      setEntries([]);
      saveEntries([]);
      setSelectedId(null);
    }
  }
  function deleteEntry(id) {
    const newEntries = entries.filter(entry => entry.id !== id);
    setEntries(newEntries);
    saveEntries(newEntries);
    if (selectedId === id) {
      setSelectedId(null);
    }
  }

  // Deselect when clicking outside entries
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        entriesContainerRef.current &&
        !entriesContainerRef.current.contains(event.target)
      ) {
        setSelectedId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredEntries = entries.filter(
    entry =>
      entry.text.toLowerCase().includes(search.toLowerCase()) ||
      entry.date.toLowerCase().includes(search.toLowerCase())
  );

  if (!getPassword()) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center z-10">
        <BackgroundDecor />
        <CalmCard className="bg-white dark:bg-gray-900">
          <h2 className="text-lg font-bold mb-3 text-gray-800 dark:text-gray-100">
            Set a Password for Your Journal
          </h2>
          <input
            type="password"
            autoFocus
            placeholder="Create a password"
            value={password}
            onChange={e => setPasswordState(e.target.value)}
            className="rounded p-2 mb-4 border w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            aria-label="Create journal password"
          />
          <PastelButton onClick={handleSetPassword} aria-label="Set journal password">
            Set Password
          </PastelButton>
        </CalmCard>
      </div>
    );
  }

  if (locked) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center z-10">
        <BackgroundDecor />
        <CalmCard className="bg-white dark:bg-gray-900">
          <h2 className="text-lg font-bold mb-3 text-gray-800 dark:text-gray-100">
            Unlock Your Journal
          </h2>
          <input
            type="password"
            autoFocus
            placeholder="Enter your password"
            value={enteredPassword}
            onChange={e => setEnteredPassword(e.target.value)}
            className="rounded p-2 mb-4 border w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            aria-label="Journal password"
          />
          <PastelButton onClick={handleUnlock} aria-label="Unlock journal">
            Unlock
          </PastelButton>
        </CalmCard>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-8 z-10 w-full">
      <BackgroundDecor />
      <Affirmation />
      <form
        onSubmit={addEntry}
        className="w-full max-w-none mb-8 px-0 sm:px-8 md:px-16 lg:px-32"
      >
        <textarea
          placeholder="Write something..."
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full rounded p-4 border min-h-[140px] resize-y text-lg shadow bg-white/90 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100"
          rows={6}
          aria-label="New journal entry"
        />
        <div className="flex justify-end mt-2">
          <PastelButton type="submit" aria-label="Add entry">
            Add
          </PastelButton>
        </div>
      </form>
      <CalmCard className="w-full max-w-3xl bg-white dark:bg-gray-900">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Your Journal Entries</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col min-w-[220px] max-w-full" ref={entriesContainerRef}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-600 dark:text-gray-200">Entries</span>
              <PastelButton
                onClick={clearEntries}
                className="bg-red-200 hover:bg-red-300 text-red-800 px-3 py-1"
                aria-label="Clear all entries"
              >
                Clear All
              </PastelButton>
            </div>
            <input
              type="text"
              placeholder="Search your entries..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded border p-2 mb-4"
              aria-label="Search journal entries"
            />
            <div className="max-h-[350px] overflow-y-auto" tabIndex={0}>
              {filteredEntries.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400">No entries found.</p>
              )}
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className={`block bg-pink-50 dark:bg-pink-900 p-3 rounded mb-2 border border-pink-100 dark:border-pink-900 relative transition-shadow hover:bg-pink-100 dark:hover:bg-pink-800 ${
                    selectedId === entry.id ? "ring-2 ring-pink-300 dark:ring-pink-600 shadow-md" : ""
                  }`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  tabIndex={0}
                  onClick={() => setSelectedId(entry.id)}
                  aria-label={`Journal entry from ${entry.date}`}
                >
                  <div className="text-xs text-gray-400 dark:text-gray-300">{entry.date}</div>
                  <div className="whitespace-pre-line my-2 text-gray-800 dark:text-gray-100">{entry.text}</div>
                  {selectedId === entry.id && (
                    <div className="flex gap-2 mt-1">
                      <button
                        type="button"
                        onClick={e => {
                          e.preventDefault();
                          navigate(`/journal/edit/${entry.id}`);
                        }}
                        className="bg-yellow-200 hover:bg-yellow-300 text-yellow-900 px-3 py-1 rounded"
                        aria-label="Edit entry"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={e => {
                          e.preventDefault();
                          deleteEntry(entry.id);
                        }}
                        className="bg-red-200 hover:bg-red-300 text-red-800 px-3 py-1 rounded"
                        aria-label="Delete entry"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-2">
              <PastelButton
                onClick={() => {
                  setLocked(true);
                  setEnteredPassword("");
                }}
                className="bg-blue-200 hover:bg-blue-300 text-blue-800 px-3 py-1"
                aria-label="Lock journal"
              >
                Lock
              </PastelButton>
            </div>
          </div>
        </div>
      </CalmCard>
    </div>
  );
}
