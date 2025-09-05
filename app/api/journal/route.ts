import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '@/lib/mongodb'
import JournalEntry from '@/lib/models/JournalEntry'
import { analyzeJournalEntry } from '@/lib/ai'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const entries = await JournalEntry.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(50)

    return NextResponse.json({ entries })
  } catch (error) {
    console.error('Get journal entries error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch entries' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { content, title, mood } = await request.json()

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    await dbConnect()

    // Analyze the journal entry with AI
    const aiAnalysis = await analyzeJournalEntry(content)

    const entry = await JournalEntry.create({
      userId: session.user.id,
      title: title || '',
      content,
      mood: mood || 'neutral',
      aiAnalysis,
    })

    return NextResponse.json({ 
      entry,
      needsSupport: aiAnalysis.needsSupport 
    }, { status: 201 })
  } catch (error) {
    console.error('Create journal entry error:', error)
    return NextResponse.json(
      { error: 'Failed to create entry' },
      { status: 500 }
    )
  }
}