'use client'

import { downloadPinImage } from '@/utils/downloadImage'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function ClientResultUI({ pin }: { pin: any }) {
  // Use a reliable tech-focused background pattern
  const bgImage = `https://picsum.photos/seed/${pin.id}/800/1200`

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center py-12 px-4 font-sans transition-colors duration-300">
      
      <div className="flex flex-col md:flex-row gap-12 w-full max-w-6xl items-center md:items-start justify-center mt-12">
        
        {/* Left Side: The Actual Pin Design */}
        <div className="flex flex-col items-center">
          <div 
            id="pin-container"
            className="w-[500px] h-[750px] bg-[#0A0A0A] relative overflow-hidden rounded-[2rem] shadow-2xl flex flex-col"
            style={{ 
              // Set a dark base for html-to-image consistency
              backgroundColor: '#0a0a0a'
            }}
          >
            {/* Background Image with heavy tech overlay */}
            <img 
              src={bgImage} 
              alt="Background" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
              crossOrigin="anonymous" 
            />
            
            {/* Gradient Top */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black/80 to-transparent z-10"></div>
            {/* Gradient Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black via-black/90 to-transparent z-10"></div>

            {/* Pin Content - Dark Tech Aesthetic */}
            <div className="relative z-20 flex flex-col h-full p-12">
              
              {/* Header: Niche & Glow */}
              <div className="mb-auto">
                <div className="inline-block px-4 py-1.5 bg-red-500/20 border border-red-500/30 text-red-400 font-bold tracking-[0.2em] text-xs uppercase rounded-full backdrop-blur-md">
                  {pin.niche}
                </div>
              </div>

              {/* Main Content */}
              <div className="mt-auto pb-6">
                <h1 className="text-5xl font-black text-white leading-[1.1] tracking-tight mb-6 drop-shadow-lg">
                  {pin.title}
                </h1>
                
                {/* Neon Accent Line */}
                <div className="w-24 h-1.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-8 shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
                
                <p className="text-gray-300 text-lg font-medium leading-relaxed drop-shadow-md">
                  {pin.description}
                </p>
              </div>

              {/* Call To Action Footer */}
              <div className="mt-8 bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-2xl shadow-[0_10px_30px_rgba(239,68,68,0.3)]">
                <p className="text-white text-xl font-extrabold text-center tracking-wide">
                  {pin.cta || 'Click to learn more!'}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Right Side: Actions and Meta */}
        <div className="flex flex-col gap-6 w-full max-w-md">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">Your Pin is Ready!</h2>
            <button 
              onClick={() => downloadPinImage('pin-container', 'pinterest-graphic.png')}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-extrabold py-4 px-8 rounded-xl shadow-lg shadow-red-500/30 transition transform hover:-translate-y-1 text-lg mb-4"
            >
              Download Image
            </button>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium text-center">
              The image will be captured exactly as shown and downloaded to your computer.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
            <h3 className="font-extrabold text-gray-900 dark:text-white mb-4">Copy for Pinterest:</h3>
            
            <div className="mb-4">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Suggested Board</label>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white font-medium border border-gray-200 dark:border-gray-700">
                {pin.suggestedBoard || `${pin.niche} Ideas`}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Description</label>
              <textarea 
                readOnly
                className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white font-medium h-32 resize-none border border-gray-200 dark:border-gray-700 outline-none"
                value={pin.description}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Hashtags</label>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-red-500 font-bold border border-gray-200 dark:border-gray-700">
                {pin.hashtags}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
