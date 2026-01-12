import { useEffect } from 'react'
import { useApp } from './hooks/use-app'
import Onboarding from './components/Onboarding'
import Dashboard from './components/Dashboard'

function App() {
  const { user } = useApp()

  useEffect(() => {
    // Sync theme to root element for global CSS variables
    document.documentElement.setAttribute('data-theme', user.theme)
  }, [user.theme])

  if (!user.onboardingComplete) {
    return <Onboarding />
  }

  return (
    <div 
      className="min-h-screen w-full transition-colors duration-500"
      data-theme={user.theme}
    >
        <Dashboard />
    </div>
  )
}

export default App
