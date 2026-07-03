'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DashboardClient({ initialPins }: { initialPins: any[] }) {
  const [filterNiche, setFilterNiche] = useState('All')
  
  // Get unique niches for the dropdown filter dynamically from the user's pins
  const uniqueNiches = ['All', ...Array.from(new Set(initialPins.map(pin => pin.niche)))]
  
  const filteredPins = filterNiche === 'All' 
    ? initialPins 
    : initialPins.filter(pin => pin.niche === filterNiche)

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Your Pins</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Manage and download your AI-generated Pinterest content.</p>
        </div>
        
        {/* Niche Filter Dropdown */}
        {initialPins.length > 0 && (
          <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-2 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
            <span className="text-sm font-bold text-gray-500 dark:text-gray-400 pl-3">Filter:</span>
            <select 
              value={filterNiche} 
              onChange={(e) => setFilterNiche(e.target.value)}
              className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-semibold py-2 px-4 rounded-lg border-none focus:ring-2 focus:ring-red-500 outline-none cursor-pointer transition-colors"
            >
              {uniqueNiches.map(niche => (
                <option key={niche} value={niche}>{niche}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {initialPins.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-16 text-center shadow-sm flex flex-col items-center justify-center transition-colors">
          <div className="w-24 h-24 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">✨</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No pins yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md font-medium">You haven't generated any Pinterest content yet. Click the button below to create your first viral pin.</p>
          <Link 
            href="/create" 
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-xl font-bold shadow-lg transition transform hover:-translate-y-1"
          >
            Generate First Pin
          </Link>
        </div>
      ) : filteredPins.length === 0 ? (
          <div className="py-20 text-center">
             <p className="text-gray-500 dark:text-gray-400 font-bold text-xl">No pins found for "{filterNiche}".</p>
          </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPins.map((pin) => (
            <Link href={`/result/${pin.id}`} key={pin.id} className="group cursor-pointer">
              <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-300 border border-gray-100 dark:border-gray-800 flex flex-col h-full transform hover:-translate-y-1">
                
                {/* Thumbnail */}
                <div className="h-64 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/${pin.id}/400/600`} 
                    alt="Thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90"></div>
                  <div className="absolute bottom-5 left-5 right-5 z-10">
                     <p className="text-white font-extrabold line-clamp-2 leading-tight drop-shadow-md text-lg">{pin.title}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                      {pin.niche}
                    </span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed font-medium">
                      {pin.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
