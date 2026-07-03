import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // This creates a Supabase client that can be safely used inside React Client Components
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
