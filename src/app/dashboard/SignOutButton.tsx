'use client'

import { createClient } from '@/utils/supabase/client'

export default function SignOutButton() {
  const supabase = createClient()
  
  const handleSignOut = async () => {
    // 1. Tell Supabase to clear the secure cookie
    await supabase.auth.signOut()
    // 2. Hard redirect to the login page so our middleware updates
    window.location.href = '/login'
  }
  
  return (
    <button 
      onClick={handleSignOut} 
      className="text-gray-500 hover:text-red-500 font-bold transition"
    >
      Sign Out
    </button>
  )
}
