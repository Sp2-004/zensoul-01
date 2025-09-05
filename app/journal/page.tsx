'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface JournalEntry {
  _id: string
  title: string
  content: string
  mood: string
  aiAnalysis: {
    sentiment: string
    keywords: string[]
    suggestions: string[]
    riskLevel: string
  }
  createdAt: string
}

export default function JournalPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [newEntry, setNewEntry] = useState('')
  const [title, setTitle] = useState('')
  const [mood, setMood] = useState('neutral')
  const [loading, setLoading] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false)

  useEffect(() => {
    if (session) {
      fetchEntries()
    }
  }, [session])

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/journal')
      const data = await response.json()
      setEntries(data.entries || [])
    } catch (error) {
      console.error('Failed to fetch entries:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEntry.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newEntry,
          title: title || undefined,
          mood,
        }),
      })

      const data = await response.json()
      
      if (data.needsSupport) {
        setShowSupportModal(true)
      }

      setNewEntry('')
      setTitle('')
      setMood('neutral')
      fetchEntries()
    } catch (error) {
      console.error('Failed to create entry:', error)
    } finally {
      setLoading(false)
    }
  }

  const getMoodColor = (mood: string) => {
    const colors = {
      'very-sad': 'bg-red-100 text-red-800',
      'sad': 'bg-orange-100 text-orange-800',
      'neutral': 'bg-gray-100 text-gray-800',
      'happy': 'bg-green-100 text-green-800',
      'very-happy': 'bg-emerald-100 text-emerald-800',
    }
    return colors[mood as keyof typeof colors] || colors.neutral
  }

  const getSentimentColor = (sentiment: string) => {
    const colors = {
      positive: 'text-green-600',
      neutral: 'text-gray-600',
      negative: 'text-orange-600',
      concerning: 'text-red-600',
    }
    return colors[sentiment as keyof typeof colors] || colors.neutral
  }

  if (!session) {
    router.push('/')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Your Journal
        </h1>

        {/* New Entry Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Entry title (optional)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div className="mb-4">
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="very-sad">Very Sad</option>
                <option value="sad">Sad</option>
                <option value="neutral">Neutral</option>
                <option value="happy">Happy</option>
                <option value="very-happy">Very Happy</option>
              </select>
            </div>

            <textarea
              placeholder="What's on your mind today?"
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
            />
            
            <button
              type="submit"
              disabled={loading || !newEntry.trim()}
              className="mt-4 px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Analyzing...' : 'Save Entry'}
            </button>
          </form>
        </div>

        {/* Entries List */}
        <div className="space-y-6">
          {entries.map((entry) => (
            <div key={entry._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {entry.title && (
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {entry.title}
                    </h3>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(entry.mood)}`}>
                    {entry.mood.replace('-', ' ')}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">
                {entry.content}
              </p>

              {entry.aiAnalysis && (
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className={`text-sm font-medium ${getSentimentColor(entry.aiAnalysis.sentiment)}`}>
                      Sentiment: {entry.aiAnalysis.sentiment}
                    </span>
                    <span className="text-sm text-gray-500">
                      Risk Level: {entry.aiAnalysis.riskLevel}
                    </span>
                  </div>
                  
                  {entry.aiAnalysis.keywords.length > 0 && (
                    <div className="mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Keywords: </span>
                      {entry.aiAnalysis.keywords.map((keyword, index) => (
                        <span key={index} className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs mr-2">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}

                  {entry.aiAnalysis.suggestions.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">AI Suggestions:</span>
                      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {entry.aiAnalysis.suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Modal */}
        {showSupportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                We're Here for You
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                I noticed you might be going through a difficult time. Would you like to connect with support resources or emergency contacts?
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setShowSupportModal(false)
                    router.push('/emergency')
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Emergency Contacts
                </button>
                <button
                  onClick={() => setShowSupportModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Not Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}