'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'

export default function ClientLoginUI() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  
  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent, isSignUp: boolean) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    let result;
    if (isSignUp) {
      // Create a brand new user in Supabase
      result = await supabase.auth.signUp({
        email,
        password,
      })
      if (!result.error) {
        setMessage('Account created! You can now Log In.')
      }
    } else {
      // Log in existing user
      result = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (!result.error) {
        setMessage('Logging in...')
        // After logging in, sync the user to our Prisma Database!
        await fetch('/api/auth/sync', { method: 'POST' })
        // Hard redirect to dashboard to refresh all Server Components
        window.location.href = '/dashboard'
      }
    }
    
    if (result.error) {
      setMessage(result.error.message)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      {message && (
        <div className="p-4 bg-gray-900 text-white font-semibold rounded-xl text-sm text-center">
          {message}
        </div>
      )}
      
      <form className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-red-500/20 focus:border-red-500 outline-none transition bg-gray-50 dark:bg-gray-800"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-3 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-red-500/20 focus:border-red-500 outline-none transition bg-gray-50 dark:bg-gray-800"
            placeholder="••••••••"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            onClick={(e) => handleAuth(e, false)}
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-red-500/30 transition disabled:opacity-50"
          >
            Log In
          </button>
          <button 
            onClick={(e) => handleAuth(e, true)}
            disabled={loading}
            className="w-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-extrabold py-3.5 rounded-xl shadow-sm transition disabled:opacity-50"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}
