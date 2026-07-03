'use server'

import OpenAI from 'openai'
import { prisma } from '@/utils/prisma'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

// Initialize OpenAI but point the URL to OpenRouter!
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
})

export async function generatePinterestContent(formData: FormData) {
  // Extract user inputs from the form
  const niche = formData.get('niche') as string
  const topic = formData.get('topic') as string

  // 1. Security Check: Ensure the user is logged in
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('You must be logged in to generate content.')
  }
  const finalUserId = user.id

  // 2. Call the AI Model via OpenRouter
  const completion = await openai.chat.completions.create({
    model: 'google/gemini-2.5-flash', // A fast, free model available on OpenRouter
    max_tokens: 1000, // Forces OpenRouter to only check credits for 1000 tokens instead of 65,000!
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `You are an expert Pinterest marketer. Generate highly engaging content for the given niche and topic.
        You MUST return EXACTLY this JSON structure:
        {
          "title": "String (max 60 chars)",
          "description": "String (max 500 chars)",
          "hashtags": "String (space separated, e.g. #decor #home)",
          "cta": "String (call to action)",
          "suggestedBoard": "String",
          "futureTopics": ["Idea 1", "Idea 2", "Idea 3"]
        }`
      },
      {
        role: 'user',
        content: `Niche: ${niche}\nTopic: ${topic}`
      }
    ]
  })

  // 3. Parse the JSON response
  const aiResponseText = completion.choices[0].message.content
  if (!aiResponseText) throw new Error('AI failed to return data.')
  
  const aiData = JSON.parse(aiResponseText)

  // 4. Save everything to our Prisma Database
  const newGeneration = await prisma.contentGeneration.create({
    data: {
      userId: finalUserId,
      niche,
      topic,
      title: aiData.title,
      description: aiData.description,
      hashtags: aiData.hashtags,
      cta: aiData.cta,
      suggestedBoard: aiData.suggestedBoard,
      futureTopics: aiData.futureTopics, // Prisma natively handles this array
    }
  })

  // 5. Send the user to the result page to see their creation
  redirect(`/result/${newGeneration.id}`)
}
