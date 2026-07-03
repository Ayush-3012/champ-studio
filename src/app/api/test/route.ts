import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { prisma } from '@/utils/prisma'

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
})

export async function GET() {
  try {
    // 1. Create or find a Dummy User (because our DB requires a User to exist!)
    let testUser = await prisma.user.findUnique({ where: { email: 'test@example.com' } })
    if (!testUser) {
      testUser = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Backend Tester'
        }
      })
    }

    // 2. Call OpenRouter AI
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.5-flash',
      max_tokens: 1000,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `You are an expert Pinterest marketer. Generate highly engaging content for the given niche and topic.
          You MUST return EXACTLY this JSON structure:
          {
            "title": "String",
            "description": "String",
            "hashtags": "String",
            "cta": "String",
            "suggestedBoard": "String",
            "futureTopics": ["Idea 1", "Idea 2"]
          }`
        },
        {
          role: 'user',
          content: `Niche: Fitness\nTopic: 5 Minute Home Workout`
        }
      ]
    })

    const aiResponseText = completion.choices[0].message.content
    if (!aiResponseText) throw new Error('AI failed to return data.')
    
    // Parse the strict JSON
    const aiData = JSON.parse(aiResponseText)

    // 3. Save it to Prisma DB
    const savedGeneration = await prisma.contentGeneration.create({
      data: {
        userId: testUser.id,
        niche: 'Fitness',
        topic: '5 Minute Home Workout',
        title: aiData.title,
        description: aiData.description,
        hashtags: aiData.hashtags,
        cta: aiData.cta,
        suggestedBoard: aiData.suggestedBoard,
        futureTopics: aiData.futureTopics,
      }
    })

    // Return the saved data so we can see it in the browser!
    return NextResponse.json({ 
      success: true, 
      message: "Backend is working perfectly!", 
      data: savedGeneration 
    })

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
