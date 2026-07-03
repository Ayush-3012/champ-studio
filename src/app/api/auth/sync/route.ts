import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/utils/prisma'

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user && user.email) {
    const existingUser = await prisma.user.findUnique({ where: { email: user.email } })
    
    // If they don't exist in Prisma yet, create them!
    if (!existingUser) {
      await prisma.user.create({
        data: {
          id: user.id, // Keep IDs synced perfectly
          email: user.email,
          name: 'New Creator',
        }
      })
    }
    return NextResponse.json({ success: true })
  }
  
  return NextResponse.json({ success: false }, { status: 401 })
}
