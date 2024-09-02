import { useEffect } from 'react'
import { CurrencyInfoCard } from './components/currencyCard.component'

function App() {
  useEffect(() => {
    const handleColorSchemeChange = (e) => {
      document.documentElement.classList.remove('dark')
      if (e.matches) {
        document.documentElement.classList.add('dark')
      }
    }

    const colorSchemeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    )
    handleColorSchemeChange(colorSchemeMediaQuery)

    colorSchemeMediaQuery.addEventListener('change', handleColorSchemeChange)
    return () => {
      colorSchemeMediaQuery.removeEventListener(
        'change',
        handleColorSchemeChange
      )
    }
  }, [])

  return (
    <main className="moveable h-screen w-screen overflow-hidden">
      <div className="container">
        <CurrencyInfoCard />
      </div>
    </main>
  )
}

export default App
