'use client'

import React from 'react'
import { ListicleTemplate } from './PinTemplates/ListicleTemplate'
import { ClassicTemplate } from './PinTemplates/ClassicTemplate'

export function ThemeVisualizer({ 
  theme, 
  dummyData 
}: { 
  theme: any, 
  dummyData?: any 
}) {
  const data = dummyData || {
    niche: "Coding Tips",
    title: "Unlock Your True Developer Potential",
    description: "Stop writing messy code! Follow these proven principles to instantly write cleaner, faster, and more scalable applications today."
  }

  // Route to the correct template based on layoutType
  if (theme.layoutType === 'listicle') {
    return <ListicleTemplate theme={theme} data={data} />
  }

  // Default fallback is classic
  return <ClassicTemplate theme={theme} data={data} />
}
