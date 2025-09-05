import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function analyzeJournalEntry(content: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
    Analyze this journal entry for mental health insights. Provide a JSON response with:
    1. sentiment: "positive", "neutral", "negative", or "concerning"
    2. keywords: array of key emotional words/themes
    3. suggestions: array of helpful suggestions (max 3)
    4. riskLevel: "low", "medium", or "high" based on distress indicators
    5. needsSupport: boolean if emergency support might be needed

    Journal entry: "${content}"

    Focus on identifying signs of distress, suicidal ideation, or need for professional help.
    Be supportive and encouraging in suggestions.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    try {
      return JSON.parse(text)
    } catch {
      // Fallback if JSON parsing fails
      return {
        sentiment: 'neutral',
        keywords: [],
        suggestions: ['Take time for self-care today'],
        riskLevel: 'low',
        needsSupport: false
      }
    }
  } catch (error) {
    console.error('AI analysis error:', error)
    return {
      sentiment: 'neutral',
      keywords: [],
      suggestions: ['Take time for self-care today'],
      riskLevel: 'low',
      needsSupport: false
    }
  }
}

export async function generateChatResponse(message: string, context?: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
    You are a compassionate mental health support assistant for ZenSoul, a mindfulness app.
    
    User message: "${message}"
    ${context ? `Context: ${context}` : ''}
    
    Respond with empathy and provide helpful guidance. If the user expresses:
    - Distress: Offer coping strategies and suggest journaling
    - Suicidal thoughts: Encourage seeking professional help and emergency contacts
    - Anxiety: Suggest breathing exercises or grounding techniques
    - General wellness: Provide positive affirmations and mindfulness tips
    
    Keep responses concise (2-3 sentences) and supportive. Never provide medical advice.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Chat AI error:', error)
    return "I'm here to support you. Would you like to try some breathing exercises or write in your journal?"
  }
}

export async function generateAffirmation(mood?: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
    Generate a personalized, uplifting affirmation for someone who might be feeling ${mood || 'neutral'}.
    Make it personal, positive, and empowering. Return only the affirmation text, no quotes or extra formatting.
    Keep it under 20 words.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text().trim()
  } catch (error) {
    console.error('Affirmation AI error:', error)
    const fallbacks = [
      "You are stronger than you know.",
      "This moment is temporary, your strength is permanent.",
      "You deserve peace and happiness.",
      "Every breath is a new beginning.",
      "You are worthy of love and care."
    ]
    return fallbacks[Math.floor(Math.random() * fallbacks.length)]
  }
}