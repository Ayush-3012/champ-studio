import React from 'react'

export function ClassicTemplate({ 
  theme, 
  data 
}: { 
  theme: any, 
  data: { niche: string, title: string, description: string }
}) {
  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden font-sans rounded-2xl shadow-2xl p-12 text-center border"
      style={{ 
        backgroundColor: theme.backgroundColor, 
        color: theme.textColor,
        borderColor: `${theme.accentColor}20`,
        aspectRatio: '4/5'
      }}
    >
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ backgroundColor: theme.accentColor }}
      ></div>

      <div className="relative z-10 flex flex-col items-center">
        <div 
          className="px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm mb-10 border shadow-lg backdrop-blur-md"
          style={{ 
            color: theme.accentColor, 
            borderColor: `${theme.accentColor}40`,
            backgroundColor: `${theme.backgroundColor}90`
          }}
        >
          {data.niche}
        </div>

        <h1 className="text-5xl font-black leading-tight mb-8">
          {data.title}
        </h1>

        <div 
          className="w-24 h-2 rounded-full mb-8 shadow-[0_0_15px_currentColor]"
          style={{ backgroundColor: theme.accentColor, color: theme.accentColor }}
        ></div>

        <p className="text-xl font-medium leading-relaxed opacity-90 max-w-sm mx-auto">
          {data.description || "This is a placeholder description that explains the core concept in a very engaging way."}
        </p>
      </div>
    </div>
  )
}
