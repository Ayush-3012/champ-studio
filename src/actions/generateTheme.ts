'use server'

import { google } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { z } from 'zod'

export async function generateThemeColors(prompt: string) {
  try {
    const result = await generateObject({
      model: google('gemini-2.5-pro'),
      schema: z.object({
        backgroundColor: z.string().describe('Hex color code for background, e.g. #0A0A0A'),
        textColor: z.string().describe('Hex color code for text, e.g. #FFFFFF. Must have high contrast with background.'),
        accentColor: z.string().describe('Hex color code for glowing accents and buttons, e.g. #EF4444. Should pop.'),
        name: z.string().describe('A catchy 2-3 word name for this theme (e.g. "Cyberpunk Neon", "Coffee Shop Warm")')
      }),
      prompt: `You are an expert UI/UX designer. The user wants a theme matching this vibe: "${prompt}". 
      Generate a harmonious 3-color palette (Background, Text, Accent) and a catchy name. Ensure high contrast between text and background. Return valid hex codes.`
    })

    return result.object
  } catch (error) {
    console.error("AI Generation Error:", error)
    throw new Error("Failed to generate theme. Please try again.")
  }
}
