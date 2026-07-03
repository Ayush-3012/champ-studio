import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/utils/prisma'
import { redirect } from 'next/navigation'
import { ThemeBuilder } from './ThemeBuilder'

export default async function ThemesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch all themes the user has created
  const themes = await prisma.theme.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Theme Studio</h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">Design your brand identity. Build templates that match your style, and save them for instant generation.</p>

        <ThemeBuilder savedThemes={themes} />
      </div>
    </div>
  )
}
