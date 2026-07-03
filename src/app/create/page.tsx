import { generatePinterestContent } from '@/actions/generate'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ThemeToggle } from '@/components/ThemeToggle'
import Link from 'next/link'
import { SubmitButton } from './SubmitButton'

export default async function CreatePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-8 font-sans transition-colors duration-300">
      
      <div className="bg-white dark:bg-gray-900 p-10 rounded-[2rem] shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-800 mt-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Create New Pin</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">Enter your niche and topic to generate a premium Pinterest graphic using AI.</p>

        <form action={generatePinterestContent} className="space-y-6">
          <div>
            <label htmlFor="niche" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Niche</label>
            <input 
              type="text" 
              name="niche" 
              id="niche" 
              required 
              className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-red-500/20 focus:border-red-500 outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
              placeholder="e.g. Home Decor, Fitness"
            />
          </div>

          <div>
            <label htmlFor="topic" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Specific Topic</label>
            <input 
              type="text" 
              name="topic" 
              id="topic" 
              required 
              className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-red-500/20 focus:border-red-500 outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
              placeholder="e.g. Minimalist living room ideas"
            />
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  )
}
