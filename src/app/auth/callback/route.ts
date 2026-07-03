import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/utils/prisma'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // Where to send the user after logging in
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    
    // 1. Exchange the secure code for a session token
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // 2. Synchronize Supabase User with our Prisma Database!
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user && user.email) {
        const existingUser = await prisma.user.findUnique({ where: { email: user.email } })
        
        // If they are a brand new user, create their profile in Prisma
        if (!existingUser) {
          await prisma.user.create({
            data: {
              id: user.id, // IMPORTANT: We force Prisma to use the exact same ID as Supabase
              email: user.email,
              name: user.user_metadata?.full_name || 'New Creator',
            }
          })
        }
      }
      
      // 3. Send them successfully to the dashboard
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If something broke, send them back to login
  return NextResponse.redirect(`${origin}/login?error=true`)
}
