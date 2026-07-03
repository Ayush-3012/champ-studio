'use server'

import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/utils/prisma'
import { revalidatePath } from 'next/cache'

export async function saveTheme(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  const name = formData.get('name') as string
  const layoutType = formData.get('layoutType') as string
  const backgroundColor = formData.get('backgroundColor') as string
  const textColor = formData.get('textColor') as string
  const accentColor = formData.get('accentColor') as string
  const isDefault = formData.get('isDefault') === 'on'

  // If this new theme is marked as default, unset previous defaults for this user
  if (isDefault) {
    await prisma.theme.updateMany({
      where: { userId: user.id },
      data: { isDefault: false }
    })
  }

  // Create the new theme
  await prisma.theme.create({
    data: {
      userId: user.id,
      name,
      layoutType,
      backgroundColor,
      textColor,
      accentColor,
      isDefault
    }
  })

  // Refresh the UI caches so the new theme appears instantly
  revalidatePath('/themes')
  revalidatePath('/create')
}
