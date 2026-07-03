import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/utils/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from './SignOutButton'
import { ThemeToggle } from '@/components/ThemeToggle'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const pins = await prisma.contentGeneration.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* The client component handles filtering and the grid */}
        <DashboardClient initialPins={pins} />
      </main>
    </div>
  )
}
