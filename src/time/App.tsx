import { useEffect, useState } from 'react'
import { Slider } from '../components/slider'

function App() {
  const [showArrows, setShowArrows] = useState(false)

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
    <button
      className="h-screen w-screen cursor-default"
      onMouseEnter={() => {
        setShowArrows(true)
      }}
      onMouseLeave={() => {
        setShowArrows(false)
      }}
    >
      <Slider showArrows={showArrows} />
    </button>
  )
}

export default App
