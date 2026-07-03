'use client'

import { useState } from 'react'
import { ThemeVisualizer } from '@/components/ThemeVisualizer'
import { saveTheme } from '@/actions/theme'
import { useFormStatus } from 'react-dom'
import { generateThemeColors } from '@/actions/generateTheme'

function SaveButton() {
  const { pending } = useFormStatus()
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-red-500 hover:bg-red-600 text-white font-extrabold py-4 rounded-xl shadow-lg transition disabled:opacity-50 mt-4"
    >
      {pending ? 'Saving Theme...' : 'Save Theme'}
    </button>
  )
}

const PRESETS = [
  { name: 'Cyberpunk Neon', layoutType: 'listicle', backgroundColor: '#0A0A0A', textColor: '#FFFFFF', accentColor: '#EF4444' },
  { name: 'Minimalist Light', layoutType: 'classic', backgroundColor: '#FFFFFF', textColor: '#111827', accentColor: '#3B82F6' },
  { name: 'Dusky Gold', layoutType: 'listicle', backgroundColor: '#1E293B', textColor: '#F8FAFC', accentColor: '#F59E0B' },
  { name: 'Ocean Vibe', layoutType: 'classic', backgroundColor: '#0F172A', textColor: '#E0F2FE', accentColor: '#06B6D4' },
]

export function ThemeBuilder({ savedThemes }: { savedThemes: any[] }) {
  const [layoutType, setLayoutType] = useState('listicle')
  const [backgroundColor, setBackgroundColor] = useState('#0A0A0A')
  const [textColor, setTextColor] = useState('#FFFFFF')
  const [accentColor, setAccentColor] = useState('#EF4444')
  
  // State for AI Generator
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [themeName, setThemeName] = useState('')

  const currentTheme = { layoutType, backgroundColor, textColor, accentColor }

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setLayoutType(preset.layoutType)
    setBackgroundColor(preset.backgroundColor)
    setTextColor(preset.textColor)
    setAccentColor(preset.accentColor)
    setThemeName(preset.name)
  }

  const handleMagicGenerate = async () => {
    if (!aiPrompt) return
    setIsGeneratingAI(true)
    try {
      const result = await generateThemeColors(aiPrompt)
      setBackgroundColor(result.backgroundColor)
      setTextColor(result.textColor)
      setAccentColor(result.accentColor)
      setThemeName(result.name)
    } catch (error) {
      alert("Failed to generate theme. Try a different prompt.")
    } finally {
      setIsGeneratingAI(false)
    }
  }

  return (
    <div className="flex flex-col xl:flex-row gap-12 mt-8">
      
      {/* Left Column: Theme Controls */}
      <div className="w-full xl:w-[450px] flex flex-col gap-8 flex-shrink-0">
        
        {/* Saved Themes Display */}
        {savedThemes.length > 0 && (
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="font-extrabold text-xl mb-4 text-gray-900 dark:text-white">Your Saved Themes</h3>
            <div className="flex flex-wrap gap-2">
               {savedThemes.map(t => (
                  <div key={t.id} className="px-4 py-2 text-sm font-bold rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {t.name} {t.isDefault && <span className="text-red-500 ml-1">★</span>}
                  </div>
               ))}
            </div>
          </div>
        )}

        {/* Quick Presets */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4">
          <h3 className="font-extrabold text-xl text-gray-900 dark:text-white">Quick Presets</h3>
          <div className="grid grid-cols-2 gap-3">
            {PRESETS.map(p => (
              <button
                key={p.name}
                type="button"
                onClick={() => applyPreset(p)}
                className="px-4 py-3 text-sm font-bold rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition shadow-sm"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Magic AI Generator */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px] rounded-3xl shadow-xl">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[calc(1.5rem-1px)] flex flex-col gap-4">
            <h3 className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
              ✨ Magic AI Generator
            </h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Describe your vibe, and AI will build the perfect palette.</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. A cozy coffee shop on a rainy day" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleMagicGenerate())}
              />
              <button 
                type="button"
                onClick={handleMagicGenerate}
                disabled={isGeneratingAI || !aiPrompt}
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 font-bold rounded-xl whitespace-nowrap disabled:opacity-50 transition"
              >
                {isGeneratingAI ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
        </div>

        {/* Builder Form */}
        <form action={saveTheme} className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl flex flex-col gap-6">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">Custom Details</h2>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Theme Name</label>
            <input 
              name="name" 
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              required 
              placeholder="e.g. Cyberpunk Neon" 
              className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-red-500/20 outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Layout Type</label>
            <select 
              name="layoutType" 
              value={layoutType} 
              onChange={e => setLayoutType(e.target.value)} 
              className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-red-500/20 outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer"
            >
              <option value="classic">Classic Minimalist</option>
              <option value="listicle">Numbered Listicle (Best for Tech)</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Background</label>
              <input type="color" name="backgroundColor" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)} className="w-full h-14 rounded-lg cursor-pointer border-0 p-0 bg-transparent" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Text</label>
              <input type="color" name="textColor" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-full h-14 rounded-lg cursor-pointer border-0 p-0 bg-transparent" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Accent</label>
              <input type="color" name="accentColor" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="w-full h-14 rounded-lg cursor-pointer border-0 p-0 bg-transparent" />
            </div>
          </div>

          <label className="flex items-center gap-3 font-bold text-sm text-gray-700 dark:text-gray-300 mt-2 cursor-pointer bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <input type="checkbox" name="isDefault" defaultChecked className="w-5 h-5 accent-red-500 cursor-pointer" />
            Set as Default Theme
          </label>

          <SaveButton />
        </form>
      </div>

      {/* Right Column: Live Visualizer */}
      <div className="flex-1 flex justify-center items-center bg-gray-100 dark:bg-gray-900/50 rounded-[3rem] p-4 border border-gray-200 dark:border-gray-800 overflow-hidden relative min-h-[700px]">
        {/* 
          We render the exact 1080x1350 resolution card, but scale it down to 40% 
          so it perfectly fits on the screen without text overflowing or breaking constraints! 
        */}
        <div 
          className="absolute origin-center"
          style={{
             width: '1080px',
             height: '1350px',
             transform: 'scale(0.40)',
             transition: 'all 0.3s ease-in-out'
          }}
        >
          <ThemeVisualizer theme={currentTheme} />
        </div>
      </div>
    </div>
  )
}
