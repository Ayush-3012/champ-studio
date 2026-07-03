'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import { createClient } from '@/utils/supabase/client'

export function GlobalNavbar({ user }: { user: any }) {
  const pathname = usePathname()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  // Hide the navbar completely on the login page for a cleaner auth flow
  if (pathname === '/login') return null

  return (
    <nav className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50 transition-colors duration-300">
      <Link href="/" className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tighter">
        Champ Studio AI
      </Link>
      
      <div className="flex items-center gap-4 md:gap-6">
        <ThemeToggle />
        
        {/* Landing Page */}
        {pathname === '/' && (
          user ? (
            <Link href="/dashboard" className="text-gray-800 dark:text-gray-200 font-bold hover:text-red-500 dark:hover:text-red-400 transition">
              Dashboard &rarr;
            </Link>
          ) : (
            <Link href="/login" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg transition border border-gray-100 dark:border-gray-700">
              Log In
            </Link>
          )
        )}

        {/* Dashboard */}
        {pathname === '/dashboard' && (
          <>
            <Link 
              href="/themes" 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-bold transition mr-4"
            >
              Theme Studio
            </Link>
            <button 
              onClick={handleSignOut} 
              className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 font-bold transition"
            >
              Sign Out
            </button>
            <Link 
              href="/create" 
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-full font-bold shadow-md shadow-red-500/20 transition transform hover:-translate-y-0.5"
            >
              + Create Pin
            </Link>
          </>
        )}

        {/* Create / Result Pages */}
        {(pathname === '/create' || pathname.startsWith('/result')) && (
          <Link href="/dashboard" className="text-gray-500 dark:text-gray-400 font-bold hover:text-gray-900 dark:hover:text-white flex items-center gap-2">
            &larr; Dashboard
          </Link>
        )}
      </div>
    </nav>
  )
}
