import React from 'react'

export function ListicleTemplate({ 
  theme, 
  data 
}: { 
  theme: any, 
  data: { niche: string, title: string, listItems?: { title: string, description: string }[] }
}) {
  const dummyItems = [
    { title: "Essential Tool 1", description: "Brief description of why this is important for your workflow." },
    { title: "Crucial Step 2", description: "How to implement this effectively in your daily routine." },
    { title: "Secret Hack 3", description: "The trick most beginners miss when starting out." },
    { title: "Pro Strategy 4", description: "Advanced concept simplified for maximum growth." },
    { title: "Final Rule 5", description: "The golden rule you must never break for success." },
  ]
  const items = data.listItems || dummyItems

  return (
    <div 
      className="w-full h-full flex flex-col relative overflow-hidden font-sans rounded-2xl shadow-2xl border"
      style={{ 
        backgroundColor: theme.backgroundColor, 
        color: theme.textColor,
        borderColor: `${theme.accentColor}20`,
        aspectRatio: '4/5'
      }}
    >
      {/* Background glow effects based on accent color */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ backgroundColor: theme.accentColor }}
      ></div>

      <div className="p-8 pb-4 relative z-10">
        <h2 
          className="text-lg md:text-xl font-extrabold tracking-[0.2em] uppercase mb-2 drop-shadow-md" 
          style={{ color: theme.accentColor }}
        >
          {data.niche}
        </h2>
        <h1 className="text-3xl md:text-5xl font-black leading-[1.1] drop-shadow-xl">
          {data.title}
        </h1>
        <div 
          className="w-16 h-1.5 rounded-full mt-6 shadow-[0_0_10px_currentColor]"
          style={{ backgroundColor: theme.accentColor, color: theme.accentColor }}
        ></div>
      </div>

      <div className="flex-1 flex flex-col justify-evenly px-8 pb-8 relative z-10 gap-3 mt-4">
        {items.map((item, i) => (
          <div 
            key={i} 
            className="flex items-center gap-5 p-4 rounded-xl border backdrop-blur-sm transition-all"
            style={{ 
              backgroundColor: `${theme.backgroundColor}80`,
              borderColor: `${theme.accentColor}30`,
              boxShadow: `0 8px 30px ${theme.accentColor}10`
            }}
          >
            {/* Number Badge */}
            <div 
              className="flex items-center justify-center w-12 h-12 rounded-xl font-black text-2xl shrink-0 shadow-lg"
              style={{ backgroundColor: theme.accentColor, color: theme.backgroundColor }}
            >
              {i + 1}
            </div>
            
            {/* Text Content */}
            <div className="flex-1">
              <h3 className="font-extrabold text-lg leading-tight mb-1">{item.title}</h3>
              <p className="opacity-80 text-sm leading-snug">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
