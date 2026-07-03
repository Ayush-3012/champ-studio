import ClientLoginUI from './ClientLoginUI'
import { ThemeToggle } from '@/components/ThemeToggle'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-8 font-sans transition-colors duration-300">
      
      <div className="bg-white dark:bg-gray-900 p-10 rounded-[2rem] shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Log in to generate premium Pinterest content.</p>
        </div>
        
        {/* We use a Client Component here because logging in requires browser interactivity */}
        <ClientLoginUI />
      </div>
    </div>
  )
}
