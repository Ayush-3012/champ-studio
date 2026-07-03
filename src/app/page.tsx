import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { ThemeToggle } from '@/components/ThemeToggle'

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 font-sans selection:bg-red-200 selection:text-red-900">
      
      {/* Hero Section */}
      <main className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
        
        {/* Background glow effects for premium aesthetic */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-400/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-bold rounded-full text-sm tracking-wide mb-8 border border-red-100 dark:border-red-500/20 shadow-sm">
            🚀 The Ultimate Pinterest Growth Engine
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-8">
            Create Viral Pins in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Seconds.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            Stop wasting hours designing. Just type your niche and topic, and let AI generate stunning, high-converting Pinterest content instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/create" 
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-10 py-5 rounded-2xl font-extrabold text-lg shadow-xl shadow-red-500/30 transition transform hover:-translate-y-1"
            >
              Start Generating for Free
            </Link>
            {!user && (
              <Link 
                href="/login" 
                className="w-full sm:w-auto bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 px-10 py-5 rounded-2xl font-extrabold text-lg shadow-sm transition"
              >
                Log In
              </Link>
            )}
          </div>
        </div>

        {/* Mockup / Social Proof Section */}
        <div className="mt-24 relative z-10 w-full max-w-5xl mx-auto">
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-2">
            <div className="rounded-[1.5rem] overflow-hidden bg-gray-100 dark:bg-gray-950 aspect-video relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
              <p className="relative z-10 text-white/50 font-bold text-2xl tracking-widest uppercase">Champ Studio AI Dashboard</p>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
